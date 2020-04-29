# JavaScript 中除了开发者自己可以实现的对象之外，还存在一类特殊的对象，这些对象由于内置了特殊的方法，所以无法有开发者自己实现，以下是一览
1. Function Object => [[call]]
2. Array => [[length]]
3. String => [[StringData]]
4. Arguments => [[ParameterMap]]
5. Integer-Indexed => [[ArrayLength]]
6. Module Namespace => [[IsExtensible]] [[PreventExtensions]]
7. Immutable Prototype => [[SetPrototypeOf]]


# JavaScript对象
- 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
- 对象有状态：对象具有状态，同一对象可能处于不同状态之下。
- 对象具有行为：即对象的状态，可能因为它的行为产生变迁。

1. 一般而言，各种语言的对象唯一标识性都是用内存地址来体现的， 对象具有唯一标识的内存地址，所以具有唯一的标识。
```javascript
    var o1 = { a: 1 };
    var o2 = { a: 1 };
    console.log(o1 == o2); // false
```

2.  在 JavaScript 中，将状态和行为统一抽象为“属性”

***对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力***

- 我们可以使用内置函数 Object.getOwnPropertyDescripter 来查看JavaScript 对象的两类属性（数据属性和访问器属性）
>- writable：决定属性能否被赋值。
>- enumerable：决定 for in 能否枚举该属性。
>- configurable：决定该属性能否被删除或者改变特征值。
```javascript
    var o = { a: 1 };
    o.b = 2;
    //a和b皆为数据属性
    Object.getOwnPropertyDescriptor(o,"a") // {value: 1, writable: true, enumerable: true, configurable: true}
    Object.getOwnPropertyDescriptor(o,"b") // {value: 2, writable: true, enumerable: true, configurable: true}
```
-如果我们要想改变属性的特征，或者定义访问器属性，我们可以使用 Object.defineProperty
```javascript
    var o = { a: 1 };
    Object.defineProperty(o, "b", {value: 2, writable: false, enumerable: false, configurable: true});
    //a和b都是数据属性，但特征值变化了
    Object.getOwnPropertyDescriptor(o,"a"); // {value: 1, writable: true, enumerable: true, configurable: true}
    Object.getOwnPropertyDescriptor(o,"b"); // {value: 2, writable: false, enumerable: false, configurable: true}
    o.b = 3;
    console.log(o.b); // 2
```

- 在创建对象时，也可以使用 get 和 set 关键字来创建访问器属性
```javascript
    var o = { get a() { return 1 } };
    console.log(o.a); // 1
```
所以在使用`o.a`的时候其实就是在调用a的get方法
访问器属性跟数据属性不同，每次访问属性都会执行 getter 或者 setter 函数。这里我们的 getter 函数返回了 1，所以 o.a 每次都得到 1。


# JavaScript 的原型
- 如果所有对象都有私有字段[[prototype]]，就是对象的原型；
- 读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。

ES6 以来，JavaScript 提供了一系列内置函数，以便更为直接地访问操纵原型。三个方法分别为：
- Object.create 根据指定的原型创建新对象，原型可以是 null；
- Object.getPrototypeOf 获得一个对象的原型；
- Object.setPrototypeOf 设置一个对象的原型。

面的代码展示了用原型来抽象猫和虎的例子：
```javascript
var cat = {
    say(){
        console.log("meow~");
    },
    jump(){
        console.log("jump");
    }
}

var tiger = Object.create(cat,  {
    say:{
        writable:true,
        configurable:true,
        enumerable:true,
        value:function(){
            console.log("roar!");
        }
    }
})


var anotherCat = Object.create(cat);

anotherCat.say();

var anotherTiger = Object.create(tiger);

anotherTiger.say();
```

- 所有具有内置 class 属性的对象，一共有十种:
```javascript
    var o = new Object;
    var n = new Number;
    var s = new String;
    var b = new Boolean;
    var d = new Date;
    var arg = function(){ return arguments }();
    var r = new RegExp;
    var f = new Function;
    var arr = new Array;
    var e = new Error;
    console.log([o, n, s, b, d, arg, r, f, arr, e].map(v => Object.prototype.toString.call(v))); 
```

# ES6 中的类
```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
```
类的继承
```javascript
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

# 函数对象和构造器对象
对于用户使用 function 语法或者 Function 构造器创建的对象来说，[[call]]和[[construct]]行为总是相似的，它们执行同一段代码。
```javascript
function f(){
    return 1;
}
var v = f(); //把f作为函数调用
var o = new f(); //把f作为构造器调用
```
我们大致可以认为，它们[[construct]]的执行过程如下：
- 以 Object.protoype 为原型创建一个新对象；
- 以新对象为 this，执行函数的[[call]]；
- 如果[[call]]的返回值是对象，那么，返回这个对象，否则返回第一步创建的新对象。