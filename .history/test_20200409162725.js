class utils { 
  constructor(gettype) { 
    this.gettype = Object.prototype.toString
  }
  isObj (obj) {
    console.log(this.gettype.call(obj))
  }
}
var a = new utils()
a.isObj({})