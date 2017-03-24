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
              {each : /<each([^/>]*)>([\s\S]*?)<\/each>/g}
        ],
      }
      // 初始化
      fn.prototype.init = function(){
        //log('init');
        this.config.body = W.innerHTML.trim();
        this.body = this.config.body;
        this.attr = [];
        this.render_html = '';
        this.last_update_id = null;
        this.run();
        return this;
      };
      // attr初始
      fn.prototype.set_attr = function(value){
        //log('set attr');
        var self = this;
        // 将Each的DOM分批打入临时数组队列
        var _attrs = value[1].split(/\s/).filter_attr();
        _attrs.forEach(function(c,i){
          var _attr_value = c.split('=');
          if(_attr_value[0] == 'id'){
            self.attr.push({ id : _attr_value[1] });
            return false;
          }
        });
        var last_node = this.attr[ this.attr.length - 1];
        // 以each以ID为索引，将关联数据以次注入
        _attrs.forEach(function(c,i){
          var _attr_value = c.split('=');
          eval('last_node.' + _attr_value[0] + '=_attr_value[1]');
        }.bind(this));
        last_node.html = value[2].trim();
        
        var _json = eval(last_node.data);
        _json.pushListener = function(){
          this.last_update_id = last_node.id;
          //log(this.last_update_id)
        }.bind(this);
        return last_node;
      };
      // start
      fn.prototype.run = function(){
        //log('run');
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
                var _exp_each_match = c.match(/<each([^/>]*)>([\s\S]*?)<\/each>/);
                var attr = this.set_attr(_exp_each_match);
                this.render(attr);
              }
            }.bind(this))
          }
        }.bind(this))
      };
      // clear 原始Dom
      fn.prototype.remove_dom = function(attr){
        var _dom = __.byId(attr.id);
        if(_dom){
          W.removeChild(_dom);
        }
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
          //log(_html);
        return _html;
        }
      };
      // 页面渲染
      fn.prototype.render = function(attr){
        //log('render');
        this.render_html = '';
        var _parent_box = __.byId(attr.to);
        var _list = eval(attr.data);
        //log(attr);
        _list.forEach(function(c,i){
          this.render_html += this.render_json(attr,c);
        }.bind(this));  
        _parent_box.innerHTML = this.render_html;
        this.remove_dom(this.attr);
      };
      // 动态更新数据
      fn.prototype.update = function(){
        //log('data update');
        //this.render({data:"json2",html:"<li>{name}</li>",id:"list2",to:"box2"});
        log(this.attr)
        this.attr.forEach(function(c,i){
          if(c.id == this.last_update_id){
            this.render(c);
            return;
          }
        }.bind(this))
      };
      return new fn();
    })();
    window.bt = bt;
  })(document.body || window.body)
}

// listen array push
Array.prototype._push  = Array.prototype.push;
Array.prototype.push = function(v){
  this._push(v);
  if(typeof this.pushListener == 'function')this.pushListener.call(this,v);
}