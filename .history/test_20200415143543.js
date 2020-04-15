class utils { 
  constructor(gettype) { 
    this.gettype = Object.prototype.toString
  }
  isObj (obj) {
    return this.gettype.call(obj) = '[object Object]'
  }
}
var a = new utils()

var c = {
  c:1111
}
console.log(JSON.parse(c))