
## 基于vue的全局异常捕获

当你的业务代码高度耦合且整个项目的代码量也有点大的时候，你在调试的时候很难说会遇到一些报错比较难以抓到，也有可能是线上的代码，此时没有办法直接debug，就只能通过日志的形式来进行捕获。

### 实现范例(基于fetch的请求，axios的自行修改一下下)

```
const http = async function (url, data, type = 'post') {
  const preUrl = 'http://localhost:5001'
  const _url = preUrl + url
  let requestConfig = {
    credentials: 'include',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'force-cache',
    withCredentials: false,
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(_url, requestConfig)
    return response
  } catch (error) {
    throw new Error(error)
  }
}
export const h5log = (obj) => http('/h5logs', obj)

```

### in main.js (切记为防止服务器压力和无用数据，请在生产环境才执行)

```
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = (error, vm, info) => {
    console.log(error, vm.$route, info)
    let obj = {
      domain: document.domain,
      text: error.toString(),
      date: Date.now(),
      url: vm.$route.fullpath, // 此处可以得到是哪个组件的报错
      info // 表示是哪个hook触发的 组件才需要
    }
    errorHandler.h5log(obj)
  }
}
```
###### 事实上Vue.config.errorHandler可以捕捉到大部分的错误,文档原话：
1. 从 2.2.0 起，这个钩子也会捕获组件生命周期钩子里的错误。同样的，当这个钩子是 undefined 时，被捕获的错误会通过 console.error 输出而避免应用崩溃
2. 从 2.4.0 起，这个钩子也会捕获 Vue 自定义事件处理函数内部的错误了
3. 从 2.6.0 起，这个钩子也会捕获 v-on DOM 监听器内部抛出的错误。另外，如果任何被覆盖的钩子或处理函数返回一个 Promise 链 (例如 async 函数)，则来自其 Promise 链的错误也会被处理。

可以看到这边事实上是可以捕捉到Promise的错误，但往往这种错误一般我们在开发环境就可以处理掉。这种情况的场景一般如下:

```
async created () {
    const error = new Error('test error');
    error.code = -1;
    throw error;
}
```

但往往弄成这种形式一般就要改动相当大的代码 故引发了下面的实现方式


### in service.js(封装request的模块)

#### 此处举例axios 在响应器的处理 (切记为防止服务器压力和无用数据，请在生产环境才执行)
##### 响应器

```
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      // 错误信息
      。。。 //  your codes
      let obj = {
        domain: document.domain,
        text: res.msg.toString(),
        date: Date.now(),
        url: response.request.responseURL // 记录是某个api导致的问题。如果是vue的钩子函数就不需要传递这个参数
      }
      errorHandler.h5log(obj)
      return Promise.reject(new Error(res.msg || '请求出错'))
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(new Error(error))
  }
)
```
##### 事实上个人觉得在响应器的catch 应该也需要加一块  这个看个人的需求

