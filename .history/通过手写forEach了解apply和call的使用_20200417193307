demo前 先通过MDN了解一下call和apply

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数

先看看 foreach的介绍

forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数
<font style="color:red">forEach() 对于空数组是不会执行回调函数的</font>

cb的三个参数分别为:
currentValue:当前元素,必须
index:当前元素索引
arr:可选。当前元素所属的数组对象

```
const _arr = ['c','a','l','l']
Array.prototype._foreach = function (fn) { 
  for (var i = 0; i < this.length; i++) { 
    fn.call(this,this[i],i,this)
  }
}
Array.prototype._foreach = function (fn) { 
  console.log(this)
  for (var i = 0; i < this.length; i++) { 
    fn.apply(this,[this[i],i,this])
  }
}
_arr._foreach(function (val,i,arr) {
  console.log(val,i,arr)
})
// 输出
// c 0 [ 'c', 'a', 'l', 'l' ]
// a 1 [ 'c', 'a', 'l', 'l' ]
// l 2 [ 'c', 'a', 'l', 'l' ]
// l 3 [ 'c', 'a', 'l', 'l' ]
```
