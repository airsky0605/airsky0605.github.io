# 前言

require.context其实是一个非常实用的api,但是3-4年过去了，却依旧还有很多人不知道如何使用。    
而这个api主要为我们做什么样的事情？它可以**帮助我们动态的加载我们想要的文件，非常灵活强大(也可递归目录)**。可以做到import做不到的事情。暂且先不刨析源码。直接用项目例子简单聊聊如何使用。

# 正文

基于模块化的编程思想，我们一般会把项目的router和一些directive划分成多个不同的模块，在一个index.js中一个个引入，再统一暴露，但是这样就会带来一个问题，随着模块越来越多，你引入的东西也会变得越来越大，换而言之，就是代码是有用的，但是重复的东西做得太多(好像，前端很大时候都是在做一些重复的工作)。

举一个优化的例子:
原本的代码:   
![](http://cdnpic.ezoonet.com/asc/file/20200327/9bf146230118a7b6f57219a46ad01b83.png)
优化后的代码:
```
const asyncRotuer = () => {
  const errorObject = {
    path: '*',
    name: 'error',
    component: () => import('@v/error/error')
  }
  const routerModule = require.context('./module', false, /\.js$/)
  const arr = routerModule.keys().map(routerModule);
  (arr || []).forEach((route) => {
    direcroutetive = route.__esModule && route.default ? route.default : route
    asyncRoutes.push(route)
  })
  asyncRoutes.push(errorObject)
}

```
事实上我觉得更优雅的方式应该是这样:

```
import Vue from 'vue'
Vue.use(Vue => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach(directive => {
      directive = directive.__esModule && directive.default ? directive.default : directive
      Object.keys(directive).forEach(key => {
        Vue.directive(key, directive[key])
      })
    })
  })(require.context('../directive', false, /\.js$/))
})
```

我们以第二种方式来解析一下用法:
可以看到最关键的就是这句**require.context('../directive', false, /\.js$/)**
引用一下官方原本的话:   
![](http://cdnpic.ezoonet.com/asc/file/20200327/b0f0d1d9cfb6f8fe3c68f8614f50f5f6.png)

# 土话解释环节

我们通过require.context这个api可以得到带有三个属性的一个函数，我们先需要用到的是那个它的keys来进行一层遍历得到对应的module数组。拿到这个数组之后其实大家也都明白可以做什么了。你可以再这里判断是否要进行注册，插入等你所想做的一些事情。
