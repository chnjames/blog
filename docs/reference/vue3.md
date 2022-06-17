# Vue3 新特性及使用经验总结

## Fragments（碎片、片段）

作为`Vue@3.x`的新特性之一，允许一个`Vue`组件可以有多个根节点。

```vue
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

## Composition API

### setup

`setup`函数是`Composition API（组合API）`的入口。

`setup`执行时机是在`beforeCreate`之前执行。

在`setup`函数中定义的变量和方法最后都是需要`return`出去的，不然无法在模板中使用。

在`setup`里面是不会用到`this`的。

`setup`中接收的`props`是响应式的，当传入新的`props`时，会及时被更新。由于是响应式的，所以`不可以使用ES6解构`，解构会消除它的响应式的。`setup`接收的`context`中提供了最常用的四个属性：`attrs`、`slot`和`emit`，分别对应`Vue@2.x`中的`Sattr`属性、`slot`插槽、`$emit`发射事件和`expose`暴露标记。并且这四个属性都是自动同步最新的值，所以我们每次使用拿到的都是最新值。

> `expose`：在传统的写法中，可以在父组件中，通过`ref`实例的方式去访问子组件的内容，但在`<script setup>`中，`setup`相当于一个闭包，除了内部的`template`模板，都无法访问内部的数据和方法。如果需要对外暴露`setup`中的数据和方法，需要使用此属性。

```vue
<template>
   <h1>App</h1>
   <h2>{{ age }}</h2>
</template>
<script>
import { defineComponent, ref } from "vue"
export default defineComponent({
  name: 'App',
  props: {
    name: String
  },
  setup(props, context) {
    let age = ref(18)
    function say() {
      console.log(`我${age.value}`)
    }
    //返回一个对象
    return {
      age,
      say
    }
  }
})
</script>
```



如果上面这种`return`的写法不喜欢的话，可以用新的语法糖`<script setup>`，`<script setup>`就相当于在编译运行时把代码放到`setup`函数中运行，然后把导出的变量定义到上下文中，并包含在返回的对象中。

在`<script setup>`中，引入的组件可以直接使用，无需再通过`components`进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，也就无需再写`name`属性。

#### 使用`props`

通过`defineProps`指定当前`props`类型，获得上下文的`props`对象。

#### 使用`emits`

使用`defineEmits`定义当前组件含有的事件，并通过返回的上下文去执行`emit`。

#### 使用`slots`和`attrs`

在`<script setup>`中使用`slots`和`attrs`，分别使用`useSlots`和`useAttrs`帮助函数。

#### 使用`expose`

使用`defineExpose`暴露需要对外的数据和方法。``

```vue
<template>
   <Child />
</template>
<script setup>
import Child from './Child.vue'
import { ref, defineEmits, defineExpose, defineProps, useSlots, useAttrs } from 'vue'
    
let age = ref(18)
const props = defineProps({
  name: String
})
const emits = defineEmits(['add', 'delete')
const slots = useSlots()
const attrs = useAttrs()
defineExpose({
    age,
    say
})
const say = () => {
  console.log(`我${age.value}`)
}
</script>
```

> 从`Vue@2.6.x`开始，Vue 为具名和范围插槽引入了一个全新的语法，即`v-slot` 指令。目的就是想统一 `slot` 和 `scope-slot` 语法，使代码更加规范和清晰。在 `vue@3.x`中，只能使用`v-slot`。

### `reactive`、`ref`与`toRefs`

在`vue@3.x`使用`reactive`和`ref`来进行响应式数据定义。

#### `ref`

使用`ref`定义的变量变成了对象，并且还是`RefImpl`的实例对象。所以在修改的时候要用`.value`去修改，因为内部是按照`get`和`set`去修改页面的。但是在`template`中就不用自己手动添加`.value`，因为`vue@.x`在检测到是`ref`对象，就自动添加了`.value`。如果用`ref`定义对象，则不再是`RefImpl`实例对象，变成了`Proxy`实例对象，因为在`vue@3.x`底层，如果是对象，就变成`Proxy`实例对象，对于基本数据类型就按照`Object.defineProperty`里面的`get`和`set`进行数据劫持然后进行响应式，但是如果是对象类型的话，是用`Proxy`，就相当于，`ref`中是对象，自动会调用`reactive`。

#### `reactive`

`reactive`只能定义对象类型的响应式数据，把`Object`转换为`Proxy`，进行一个深层次的响应式，也可以进行数组的响应式。

#### `ref`与`reactive`的区别

- `ref`用来定义`基本数据类型`，也可以定义对象或数组，知识内部自动调用了`reactive`来转换。
- `ref`通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
- `ref`定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`。
- `reactive`用来定义：`对象或数组类型数据`。
- `reactive`通过使用`Proxy`来实现响应式（数据代理），并通过`Reflect`操作源代码内部的数据。
- `reactive`定义的数据：操作和读取数据均不需要`.value`。

#### `toRefs`

`toRefs`用于将一个`reactive`对象转化为属性全部为`ref`对象的普通对象。

```vue
<template>
  <p>第 {{ year }} 年</p>
  <p>姓名： {{ nickname }}</p>
  <p>年龄： {{ age }}</p>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue"
const year = ref(0)
/**
 * reactive、ref定义和修改对象的区别
 */
// 使用reactive定义对象
const user = reactive({
  nickname: "xiaofan",
  age: 26,
  gender: "女"
})
const {nickname, age} = toRefs(user)
setTimeout(() => {
  user.gender = "男"
}, 1000)
// 使用ref定义对象
const person = ref({
  personName: "James",
  personAge: 27,
  personGender: "男"
})
const {personName, personAge} = toRefs(user.value)
setTimeout(() => {
  person.value.personGender = "女"
}, 1000)

</script>
```



## 生命周期钩子

![vue3生命周期](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206171610524.svg)

![vue2与vue3生命周期对比](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206171613257.png)

在某个组件被`<keep-alive>`标签包裹时，第一次显示该组件，会触发`setup()`和`onActivated`。在第二次显示该组件时，由于从缓存中调取的，所以不会再次触发`setup()`，只会触发`onActivated`。

在切换为其他组件时由于`<keep-alive>`包裹缓存，所以不会触发`onBeforeUnmount`和`onUnmounted`而触发了`onDeactivated`。

`onRenderTracked`它会跟踪页面上所有响应式变量和方法的状态。只要页面由`update`的情况，它就会跟踪，然后生成一个`event`对象，我们通过`event`对象来查找程序的问题所在。

`inRenderTriggered`他不会跟踪每一个值，而是给你变量值的信息，并且信值和旧值都会给你明确的展示出来。生成的`event`对象其中包含`key`（哪边变量发生了变化）、`newValue`（更新后变量的值）、`oldValue`（更新前变量的值）和`target`（目前页面中的响应变量和函数）。

`onErrorCaptured`它会捕获子孙组件的异常报错，可以在这个函数中自定义处理错误信息。如果`onErrorCaptured`钩子自身抛出了一个错误，那么这个新的错误和原本捕获到的错误都会发送给全局的`config.errorHandle`。
