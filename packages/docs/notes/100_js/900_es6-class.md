# es6-class
## 声明class
```js
class Animal {
  // 静态属性
  static symbol = 'animal'
  // 静态方法
  static say() {
    console.log('say')
  }

  constructor(name) {
    // 实例属性
    this.name = name
    this.skills = ['sleep']
    // 如果返回一个基础类型
    // new的实例为: Cat { hobbies: [ 'eat' ], name: 'orange', skills: [ 'sleep' ] }
    // return 123
    // 如果返回一个实例
    // new的实例为: { name: 'joker' }
    // return {
    //   name: 'joker'
    // }
  }

  // 实例属性
  hobbies = ['eat']
  // 公共方法
  speak() {
    console.log('hi')
  }
}
// 公共属性
Animal.prototype.newHobbies = ['play']

class Cat extends Animal {}
const cat = new Cat('orange')
const cat2 = new Cat('snow')
// output: animal
console.log(Cat.symbol)
// output: say
Cat.say()
// output: Cat { hobbies: [ 'eat' ], name: 'orange', skills: [ 'sleep' ] }
console.log(cat)
// output: false
console.log(cat.hobbies === cat2.hobbies)
// output: true
console.log(cat.speak === cat2.speak)
// output: true
console.log(cat.newHobbies === cat2.newHobbies)
// output: hi
cat.speak()
```
## 通过babel转换为es5
<!-- eslint-skip -->
```js
function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 继承(实例和公共)的(属性和方法)
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
  // 继承静态属性和方法
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

var Animal = /*#__PURE__*/ (function () {
  function Animal(name) {
    _classCallCheck(this, Animal);
    // 实例属性
    _defineProperty(this, "hobbies", ["eat"]);
    // 实例属性
    this.name = name;
    this.skills = ["sleep"];
  }
  _createClass(
    Animal,
    // 公共方法
    [
      {
        key: "speak",
        value:
          function speak() {
            console.log("hi");
          },
      },
    ],
    // 静态方法
    [
      {
        key: "say",
        value:
          function say() {
            console.log("say");
          },
      },
    ]
  );
  return Animal;
})();
// 静态属性
_defineProperty(Animal, "symbol", "animal");
// 公有属性
Animal.prototype.newHobbies = ["play"];
var Cat = /*#__PURE__*/ (function (_Animal) {
  // 继承
  _inherits(Cat, _Animal);
  var _super = _createSuper(Cat);
  function Cat(name) {
    _classCallCheck(this, Cat);
    return _super.call(this, name);
  }
  return _createClass(Cat);
})(Animal);
var cat = new Cat("orange");
var cat2 = new Cat("snow");
// animal
console.log(Cat.symbol);
// say
Cat.say();
// Cat { hobbies: [ 'eat' ], name: 'orange', skills: [ 'sleep' ] }
console.log(cat);
// false
console.log(cat.hobbies === cat2.hobbies);
// true
console.log(cat.speak === cat2.speak);
// true
console.log(cat.newHobbies === cat2.newHobbies);
// hi
cat.speak();
```
