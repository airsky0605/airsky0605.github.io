今天正好看到有一个朋友在问一个js队列的问题就想到了之前的一种处理方式.

顺便也梳理下知识点:

js的eventLoop机制:
宏任务(macro-task)：包括整体代码script，setTimeout，setInterval   
微任务(micro-task)：Promise.then(非new Promise)，process.nextTick(node中)


事件的执行顺序，是先执行宏任务，然后执行微任务，这个是基础，任务可以有同步任务和异步任务，同步的进入主线程，异步的进入Event Table并注册函数，异步事件完成后，会将cb放入Event Queue中(宏任务和微任务是不同的Event Queue)，同步任务执行完成后，会从Event Queue中读取事件放入主线程执行，cb中可能还会包含不同的任务，因此会循环执行上述操作.

<font color="red">注意： setTimeOut并不是直接的把你的回掉函数放进上述的异步队列中去，而是在定时器的时间到了之后，把cb放到执行异步队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面。这也就解释了为什么setTimeOut为什么不能精准的执行的问题了。setTimeOut执行需要满足两个条件：   
1.主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回掉函数   
2.这个回掉函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行 
</font>

理想情况下的js函数执行都是都是有序调用。如下。

```
function fn1(){ 
  console.log('output 1')
}
function fn2(){ 
  console.log('output 2')
}
function fn3(){ 
  console.log('output 3')
}
const stack = [fn1,fn2,fn3]
stack.forEach(item => { 
  item()
})
// 输出 output 1 output 2 output 3
```

但是正常的业务 肯定是不会给你这么舒服的调用方式。中间我们肯定会夹杂有一些api请求异步操作，这种时候可能就是这种效果

```
function fn1(){ 
  console.log('output 1')
}
function fn2 () { 
  setTimeout(() => {
    console.log('output 2')
  }, 1000);
}
function fn3(){ 
  console.log('output 3')
}
const stack = [fn1,fn2,fn3]
stack.forEach(item => { 
  item()
})
// 输出 output 1 output 3 output 2(延迟出来)

```
远远达不到理想的 输出123的效果，这个时候我们就得对这种函数进行一种改变。

我们假设本身是在一个栈里面，当前仅当每个当前函数执行结束的时候的就去调用下一个。那么我们定义一个next函数。   
每次通过next函数去获取下一个要执行的函数，每调用一次index自增1，这样就可以每次都会执行到下一步。   
代码如下

```
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
next()

```
当然这样的改动可能会对你当前代码的逻辑多多少少有点变动，但我想 应该变化不大。


还有一种是最典型的 就是基于promise去做的了

就比如我们的http请求 我们就可以用await去执行一系列的顺序

也有新的语法糖  promise.allSettled promise.all promise.race 可以达到你的队列要求

```
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
stack2.forEach(async item => { 
  console.log(await item())
})

```



