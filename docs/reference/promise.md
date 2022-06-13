# Promise 对象

## 含义

异步编程的一种解决方案。简单来说，就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

从语法上来说，`Promise` 是一个对象，从它可以获取异步操作的消息。

`Promise` 对象有以下两个特点：

- 对象的状态不受外界影响。`Promise` 对象代表一个异步操作，有三种状态：`pending`进行中、`fulfilled`已完成和`rejected`已失败。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 一旦状态改变，就不会再变，任何时候都可以得到折耳结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

## 基本用法

ES6规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```javascript
const promise = new Promise((resolve, reject) => {
	// ... some code
    if (/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
})
```

## Promise.prototype.then()

`Promise` 实例具有 `then`方法，也就是说，`then`方法是定义在原型对象 `Promose.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。

## Promise.prototype.catch()

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

## Promise.prototype.finally()

`finally()`方法用于指定不管`Promise`对象最后的状态如何，都会执行的操作。

```javascript
promise
.then(result => {...})
.catch(error => {...})
.finally(() => {...})
```

## Promise.all()

```
const p = Promise.all([p1, p2, p3])
```

总结：全部子实例成功才成功，一个子实例失败就失败。

## Promise.race()

```javascript
const p = Promise.all([p1, p2, p3])
```

总结：`race`是赛跑机制，看最先子实例是成功还是失败。

## Promise.allSettled()

```javascript
const p = Promise.all([p1, p2, p3])
```

总结：所有子实例执行完成，无论成功或失败。

## Promise.any()

```javascript
const p = Promise.all([p1, p2, p3])
```

总结：有一个子实例成功就成功，全部子实例失败才失败。