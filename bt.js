/**
 * @author brandon fang (Q:1206144309)
 * @dateTime 2017-02-28T17:08:18+0800
 * @desc JSON数据模型DMO动态渲染,支持List
 * @return   {[type]}
 */
window.onload = function(){
  
  (function(W){
    var bt = (function(){

      var fn = function(){
        return fn.prototype.init();
      };
      // 定义规则 
      fn.prototype.config = {
        rule : [
          {each : /<each(.*)>([^</each>].*)([\w\W/m/r]*)<\/each>/g},
        ],
      }
      // 初始化
      fn.prototype.init = function(){
        this.config.body = W.innerHTML.trim();
        this.body = this.config.body;
        this.attr = [];
        this.render_html = '';
        this.run();
        return this;
      };
      // attr初始
      fn.prototype.set_attr = function(value){
        var _attrs = value[1].split(/\s/).filter_attr();
        _attrs.forEach(function(c,i){
          var _attr_value = c.split('=');
          this.attr[ _attr_value[0] ] =  _attr_value[1];
        }.bind(this));
        this.attr['html'] = value[2].trim();
        //log(this.attr)
      };
      // start
      fn.prototype.run = function(){
        this.config.rule.forEach(function(c,i){
          for(var key in c){ 
            // 单个规则实体
            var rule_info = eval( 'this.config.rule[i].' + key);
            // 返回匹配的规则实体
            var rule_match = this.body.match(rule_info);
            // 将Body拆分成Group Match
            rule_match.forEach(function(c,i){
              if(key === 'each'){
                // 取Math单个Data
                var _exp_each_match = c.match(/<each(.*)>([\w\W]*)<\/each>/);
                this.set_attr(_exp_each_match);
                this.render(this.attr);
              }
            }.bind(this))
          }
        }.bind(this))
      };
      // clear 原始Dom
      fn.prototype.remove_dom = function(attr){
        var _dom = __.byId(attr.id);
        W.removeChild(_dom);
      };
      // 渲染json数据
      fn.prototype.render_json = function(attr,item_data){
        var _html = attr.html;
        var _exp_html_match = _html.match(/{([^}])([\w\d]*)}/g);
        if(_exp_html_match != null){
          _exp_html_match.forEach(function(c,i){
            var _c = c.replace('{','').replace('}','');
            var _info_data = eval('item_data.' + _c);
            _html = _html.replace(new RegExp(c,'gim'),_info_data);
          })
          log(_html);
        return _html;
        }
      };
      // 页面渲染
      fn.prototype.render = function(attr){
        this.render_html = '';
        var _parent_box = __.byId(attr.to);
        var _list = eval(attr.data);
        _list.forEach(function(c,i){
          //this.render_html += attr.html;
          this.render_html += this.render_json(attr,c);
        }.bind(this));  
        _parent_box.innerHTML = this.render_html;
        this.remove_dom(this.attr);
      };
      return new fn();
    })();
    window.bt = bt;
  })(document.body || window.body)
}