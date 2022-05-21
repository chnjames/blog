# Vue项目

## Vue页面禁止选择、右键、复制、F12页面审查元素

```javascript
created(){
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function('event.returnValue=false')
      // 禁用选择
      document.onselectstart = new Function('event.returnValue=false')
      //禁止f12
      document.οnkeydοwn = new Function('event.returnValue=false')
    })
 
    // 上面的禁止f12那段代码没有生效，但是加了下面这段就能生效。
    document.onkeydown = function (e) {
      if (e && e.keyCode === 123) {
        e.returnValue = false
        // e.keyCode = 0   //去掉也可以的，倘若要写，则需要setter 以及 getter配合使用，不配合，会报错
        return false
      }
    }
  }
```



> 如果想让所有页面禁用，就在app.vue设置。
>
> 以上代码只针对PC页面端，手机端访问页面还是可以选择、复制。