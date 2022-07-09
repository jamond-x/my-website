### 防抖

阻止连续操作，只执行最后一次。

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
```



### 节流

阻止连续操作，一定时间内执行一次

```js
function throttle(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
```



### 深拷贝

```js
function deepClone(obj) {
  if (!obj || typeof obj != "object") {
    throw new Error("参数无效");
  }

  let target = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      target[key] = deepClone(obj[key]);
    } else {
      target[key] = obj[key];
    }
  }
  return target;
}
```



### Promise.all

```js
function definePromiseAll(promises){
    let store = [...promises]
    let result = []
    return new Promise((rs, rj) => {
        store.forEach((el, index) => {
            Promise.resolve(el).then(res => {
                result.push(res)
                if(result.length === store.length){
                    rs(result)
                }
            })
            .catch(err => {
                rj(err)
            })
        })
    })    
}
```



### Promise 并发

```js
// JS 实现一个带并发限制的异步调度器 Scheduler

// 题目描述
// JS 实现一个带并发限制的异步调度器 Scheduler
// 保证同时运行的任务最多有两个

class scheduler {
  constructor(tasks) {
    this.tasks = tasks;
    this.count = 0;
    this.max = 2;
  }

  start() {
    for (let i = 0; i < this.max && this.tasks.length != 0; i++) {
      this.request(this.tasks.shift());
      this.count++;
    }
  }

  add(task){
    this.tasks.push(task)
  }

  request(task) {
    task()
      .then((res) => {
        this.count--;
        if (this.count < this.max && this.tasks.length > 0) {
          this.request(this.tasks.shift());
          this.count++;
        }
        console.log(res);
      })
      .catch((err) => {
        this.count--;
        if (this.count < this.max && this.tasks.length > 0) {
          this.request(this.tasks.shift());
          this.count++;
        }
        console.log(err);
      });
  }
}






class Scheduler {
  constructor() {
    this._max = 2;
    this.queue = [];
    this.runCount = 0;
  }

  add(task) {
    this.queue.push(task);
  }

  start() {
    for (let i = 0; i < this._max; i++) {
      this.request();
    }
  }

  request() {
    if (this.runCount >= this._max || !this.queue || !this.queue.length) return;

    this.runCount++;

    this.queue
      .shift()()
      .then(() => {
        this.runCount--;
        this.request();
      });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  //   scheduler.add(() => timeout(time));
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

// addTask(2000, "1");
// addTask(1000, "2");
// addTask(3000, "3");
// addTask(2000, "4");

addTask(2000, "1");
addTask(2000, "2");
addTask(2000, "3");
addTask(2000, "4");

scheduler.start();

// 2  第一秒
// 1  第二秒
// 3  第四秒
// 4  第四秒
```



### Promise.race

```js
function definePromiseRace(tasks) {
  return new Promise((rs, rj) => {
    tasks.forEach((task) => {
      task()
        .then((res) => {
          rs(res);
        })
        .catch((err) => {
          rj(err);
        });
    });
  });
}
```





### Promise.allSettle

```js
function definePromiseAllSettle(tasks) {
  let res = [];
  return new Promise((rs) => {
    tasks.forEach((task) => {
      task()
        .then((r) => {
          res.push(r);
          if (res.length === tasks.length) {
            rs(res);
          }
        })
        .catch((err) => {
          res.push(err);
          if (res.length === tasks.length) {
            rs(res);
          }
        });
    });
  });
}
```



### 数组扁平化

```js
let arr = [1, 2, [4, [5], 6], [7, 8, 9], [[12], [[[10]], [11]]]];

const flat = (arr) => {     // 思路和深拷贝一样 递归遍历
  let res = [];
  for (let val of arr) {
    if (Array.isArray(val)) {
      res.push(...flat(val)); // 很关键 一定要 ...flat(val)  而不是直接 flat(val)
    } else {
      res.push(val);
    }
  }
  return res;
};
console.log(flat(arr));
// 输出 [ 1, 2, 4,  5,  6, 7, 8, 9, 12, 10,11]
```



### 数组去重

// 利用set元素不可重复的属性去重

```js
let arr = [1,1,1,2,3,4,4,4,5,6,7,7,8]

let set = new Set(arr)

let newArr = [...set]
```

// 利用filter、indexof

```js
let arr = [1,1,1,2,3,4,4,4,5,6,7,7,8]

let newArr = arr.filter((el, index) => arr.indexof(el) === index)
```



### 实现new

- 创建空对象
- 将对象指向构造函数的的prototype
- 绑定this
- 返回该对象

```js
function createNew(constructor) {
  return function (...args) {
    let obj = Object.create(constructor.prototype);

    let res = constructor.apply(obj, args);

    if (typeof res === "object" || typeof res === "function") {  // 如果软有对象有返回值（非原始值）
      return res;                                                // 则返回它
    }

    return obj;  // 原又构造函数没有返回值 则直接返回obj
  };
}

function Student(name) {
  this.name = name;
}

const con = createNew(Student);
let obj = con("xxq")
```



### 继承 

https://juejin.cn/post/6844903477819211784



### Instanceof

```js
const newInstanceof = (obj, aimType) => {
  if (typeof obj != "object") {
    throw new Error("参数必须是对象类型变量");
  }

  let proto = obj.__proto__;
  while (proto != null) {
    if (proto === aimType.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }

  return false;
};


function definInstanceof(left, right) {
  if (!left || typeof left != "object") return;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    console.log(proto);
    if (!proto) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

let obj = [];

console.log(definInstanceof(obj, Array));
```



### 手写apply

```js
Function.prototype.myApply = function (obj, args) {
  obj = typeof obj === "object" ? obj : window;   // 先判断obj是否为对象如果不是那么用window绑定this

  if (!args) {  // 如果第二个参数为空
    args = [];  // 用一个空数组代替
  }

  if (!Array.isArray(args)) {   // 如果参数不是数字抛出错误
    throw new Error("参数必须是数组类型");
  }

  let sy = Symbol();   // 定义一个唯一的Symbol类型的变量

  obj[sy] = this;     // 让obj唯一的一个属性值等于调用这个方法的函数
  // 因为myApply是Function原型的函数 一个函数相当于构造函数Function的实例对象，所以this指向调用函数
  let res = obj[sy](...args); // 调用该函数并传入参数

  delete obj[sy];    // 删除该属性

  return res;        // 返回调用结果
};
```



### 手写call

```js
Function.prototype.myCall = function (obj) {
  obj = typeof obj === "object" ? obj : window; // 判断obj

  let params = [...arguments];   // 将所有参数给到一个数字之中

  params = params.slice(1);     // 去掉第一个参数，因为第一个参数是obj

  let sy = Symbol();       // 定义一个唯一的Symbol

  obj[sy] = this;         // 将该属性指向调用本方法的函数（对象，构造函数Function的实例）

  let res = obj[sy](...params);  // 调用函数

  delete obj[sy];       // 删除属性

  return res;           // 返回结果
};
```



### 手写bind

```js
Function.prototype.myBind = function (obj) {
  obj = typeof obj === "object" ? obj : window;  // 判断是否为object

  let params = [...arguments];    // 拿到所有参数

  params = params.slice(1);      // 去掉第一个参数

  let sy = Symbol();            // 定义一个唯一的symbol

  obj[sy] = this;              // 将该对象的唯一属性指向调用本方法的函数

  return () => {              // 返回一个函数
    let res = obj[sy](...params);    // 这个函数里调用方法
    delete obj[sy];         // 删除属性
    return res;               // 返回结果
  };
};
```



### 观察者模式

```js
class Subject {  // 主题类
  constructor() {
    this.observerList = [];   // 观察者列表
  }

  // 添加订阅
  addObserver(observer) {        // 将订阅者存入列表
    this.observerList.push(observer);
  }

  // 通知订阅者
  notify(data) {
    this.observerList.forEach((ob) => {   // 逐个通知观察者
      ob.update(data);
    });
  }
}

class Observer {         // 观察者
  constructor(name) {
    this.name = name;
  }

  update(data) {         // 当被通知有新消息时的回调函数 用于处理最新的消息
    console.log(this.name + ":收到更新消息啦！" + "  最新消息：" + data);
  }
}

let sub = new Subject();
let ob1 = new Observer("小李");
let ob2 = new Observer("小唐");
let ob3 = new Observer("小张");

sub.addObserver(ob1);
sub.addObserver(ob2);
sub.addObserver(ob3);

sub.notify("数据发生了变化------");
```



### 发布订阅

```js
class Subject {
  constructor() {
    this.event = {};   // 事件对象  收集所有的事件
  }

  // 订阅
  subscribe(event, observer) {  // 这里也可替换成传入一个回调函数
    if (this.event[event]) {     // 如果该事件已存在(已有人订阅过)
      this.event[event].push(observer);   // 将观察者记录进相应的事件列表
    } else {
      this.event[event] = [observer];     // 初始化一个新的事件列表并将观察者放入
    }
  }

  unsubscribe(event, observer) {     // 将对应的事件属性里的观察者移除
    this.event[event].splice(this.event[event].indexOf(observer), 1);
  }

  // 更新数据
  notify(event, data) {
    this.event[event].forEach((ob) => {   // 逐个的发送数据
      ob.update(data);
    });
  }

  unsubscribeAll(event){
    //
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {   // 更新回调
    console.log(this.name + ": " + data);
  }
}

let sub = new Subject();

let ob1 = new Observer("小李");

let ob2 = new Observer("小唐");

let ob3 = new Observer("小张");

sub.subscribe("eventOne", ob1);
sub.subscribe("eventOne", ob2);
sub.subscribe("eventOne", ob3);

sub.notify("eventOne", "eventOne的更新数据！");

sub.unsubscribe("eventOne", ob1);

setTimeout(() => {
  sub.notify("eventOne", "eventOne 再次更新数据！");
}, 2000);
```

