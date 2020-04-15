class utils { 
  constructor(gettype) { 
    this.gettype:Object.prototype.toString
  }
  isObj (obj) {
    console.log(this.gettype)
  }
}
var a = new utils()
a.isObj({})