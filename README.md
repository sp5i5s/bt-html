## BT-HTML是什么?

作者自写的一个轻量级的微型HTML模板引擎，通过该引擎可快速实现JSON数据的动态绑定并支持Update单向绑定。
这是非常初级的版本，意在学习引擎的实现原理。

## 功能特色
* 没有任何第三方依赖
* 实用于DOM的循环动态渲染
* 单页面支持多个Each操作
* 文件大小在5K

## 实例 1
##### 说明
如果没有动态更新数据，则不需要任何脚本来控制触发。
```javascript
##### 定义容器
<div class="panel">
   <div id="box"></div>
</div>
##### 定义引擎模板
<each id="list" data="json" to="box">
        <li>序号：{id}
        <br>姓名：{name}
        <br>年龄：{sex}
        <br>日期：<a href="#{id}">{date}</a>
        </li>
</each>
```
## 实例 2
##### 说明
页面中需要动态控制插入或删除数据，需要加入bt.update()方法即可。
```javascript
##### 定义容器
<div class="panel">
   <div id="box"></div>
</div>
###### 定义引擎模板
<each id="list" data="json" to="box">
        <li>序号：{id}
        <br>姓名：{name}
        <br>年龄：{sex}
        <br>日期：<a href="#{id}">{date}</a>
        </li>
</each>
###### 动态新增
<input type="button" value="新增产品" onclick="add();">
<script type="text/javascript">
  function add(){
    json.push({id : 5,name:"张憨",sex:24,date : '2017-10-13'});
    bt.update();
  }
</script>
```
