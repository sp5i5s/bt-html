/**
 * @author brandon fang (Q:1206144309)
 * @dateTime 2017-02-28T17:32:10+0800
 * @desc 自建工具类
 * @return   {[type]}
 */
function log(val){
	console.log(val);
}
// Globle
Array.prototype.filter_attr = function(){
  var array = [];
  this.forEach(function(c,i){
    if(c.replace(/\s\S/g,'') != ''){
      c = c.replace(/\"/g,'');
      array.push(c);
    }
  });
  return array;
};

(function(){
  var __ = (function(){

    var fn = function(){
      return fn.prototype.init();
    };
    fn.prototype = {
      init : function(){
        return this;
      },
      // 将当前时间戳 转换成日期
      getLocalTime : function(_nS){
        return new Date(parseInt(_nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      },
      // 将DIV滚动条移到最后
      getScrollBottom : function($info){
        $info.scrollTop( $info.height());
      },
      // 字符串空验证
      check_string : function(_str){
        if (_str.trim().replace(/(^s*)|(s*$)/g, "").length ==0){
            return false;
        }
        return true;
      },
      // 过滤Ojbect中的重复数据 
      filter : function(_target){
        var result = [];
        result.push(_target.shift());
        for(var i = 0;i<_target.length;i++){
            if(result.length > i && result[i].id != _target[i].id){
                result.push(_target[i]);
            }
        }
        return result;
      },
      // 通过Message提醒
      msg : function(_text,_func){
        layer.closeAll();
        layer.open({content: _text,btn: ['确定'],yes :_func});
      },
      // AJAX
      ajax : function(_args,_func){
        _args.data.__hash__ = $('[name="__hash__"]').attr('content');
        $.ajax({
            type: _args.type || "POST",
            url: _args.url,
            data: _args.data,
            success:function(data){
                _func(data);
            }
        });
      },
      // 关闭所有window，依赖layer
      closeAll : function(){
        layer.closeAll();
      },
      // 根据id获取Dom
      byId : function(_id){
        return document.getElementById(_id);
      },
      // add Event
      event : function(_event_type,fn){
        
      },
      create_dom : function(_id){
        
      }
    }
    return new fn();
  })();
  window.__ = __;
})()