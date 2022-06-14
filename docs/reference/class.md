# Class基本语法和继承

## 简介

```javascript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return `(${this.x},${this.y})`
	}
}
```

### constructor 方法

`constructor()` 方法是类的默认方法，通过`new` 命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显示定义，一个空的`constructor()`方法会被默认添加。`constructor()`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

类必须使用`new` 调用，否则会报错。

### 注意点

- 严格模式

  类和模块的内部，默认就是严格模式。只要你写的代码在类或模块之中，就是严格模式。

- 不存在提升

  类不存在变量提升。

- `name`属性

  由于本质上，`ES6`的类只是`ES5`的构造函数的一层包装，所以函数的需要特性都被`class`继承，包括`name`属性。

- `Generator`方法

  如果某个方法之前加上星号（`*`），就表示该方法是一个`Generator`函数。

- `this`的指向

  类的方法内部如果含有`this`，他默认指向类的实例。

## 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用。

父类的静态方法，可以被子类继承。

静态方法也是可以从`super`对象上调用的。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}
Bar.classMethod() // "hello, too"
```

## 实例属性的新写法

实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层。此时，不需要再实例属性前面加上`this`。

```javascript
class IncreasingCounter {
  _count = 0;
  increment() {
    this._count++;
  }
}
```

## Class的继承

`Class`可以通过`extends`关键字实现继承，让子类继承父类的属性和方法。

```javascript
class Point {
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
}
```

`ES6`规定，子类必须在`constructor()`方法中调用`super()`。因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用`super()`方法，子类就得不到自己的`this`对象。