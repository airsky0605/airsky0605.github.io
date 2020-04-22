class utils { 
  constructor(gettype) { 
    this.gettype = Object.prototype.toString
  }
  isObj (obj) {
    return this.gettype.call(obj) = '[object Object]'
  }
}
var a = new utils()

function* yanketang () { 
  yield '盐'
  yield '课'
  yield '堂'
}
// yanketang()
// console.log(yanketang().next().value)
// console.log(yanketang().next().value)
// console.log(yanketang().next().value)

// const _arr = ['c','a','l','l']
// Array.prototype._foreach = function (fn) { 
//   for (var i = 0; i < this.length; i++) { 
//     fn.call(this,this[i],i,this)
//   }
// }
// Array.prototype._foreach = function (fn) { 
//   console.log(this)
//   for (var i = 0; i < this.length; i++) { 
//     fn.apply(this,[this[i],i,this])
//   }
// }
// _arr._foreach(function (val,i,arr) {
//   console.log(val,i,arr)
// })

function decoratorBefore(fn, beforeFn) {
  return function() {
      var ret = beforeFn.apply(this, arguments);
      
      // 在前一个函数中判断，不需要执行当前函数
      if (ret !== false) {
          fn.apply(this, arguments);
      }
  };
}


// function skill() {
//   console.log('skill');
// }

// function skillMusic() {
//   console.log('music');
// }

// function skillRun() {
//   console.log('run');
// }

// var skillDecorator = decoratorBefore(skill, skillMusic);
// // skillDecorator = decoratorBefore(skillDecorator, skillRun);

// skillDecorator();

let i = 0
function next () {
  let _fn = stack[i]
  i++
  if (typeof _fn === 'function') {
    _fn()
   }
}
function fn1(){ 
  console.log('output 1')
  next()
}
function fn2 () { 
  setTimeout(() => {
    console.log('output 2')
    next()
  }, 1000);
}
function fn3(){ 
  console.log('output 3')
  next()
}
const stack = [fn1,fn2,fn3]
// next()
function next () {
  let _fn = stack[i]
  i++
  if (typeof _fn === 'function') {
    _fn()
   }
}
const promiseAction = (data) => {
  return new Promise((res,rej) => {
    res(data)
  })
}

const api1 = () => {
  return promiseAction(1)
}
const api2 = () => {
  return promiseAction(2)
}
const api3 = () => {
  return promiseAction(3)
}
const stack2 = [api1, api2, api3]
stack2.forEach(item => { 
  item().then(res => { 
    console.log(res)
  })
})


