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
yanketang()
// console.log(yanketang().next().value)
// console.log(yanketang().next().value)
// console.log(yanketang().next().value)

const _arr = ['c','a','l','l']
// Array.prototype._foreach = function (fn) { 
//   for (var i = 0; i < this.length; i++) { 
//     fn.call(this,this[i],i,this)
//   }
// }
Array.prototype._foreach = function (fn) { 
  console.log(this)
  for (var i = 0; i < this.length; i++) { 
    fn.apply(this,[this[i],i,this])
  }
}
_arr._foreach(function (val,i,arr) {
  // console.log(val,i,arr)
})