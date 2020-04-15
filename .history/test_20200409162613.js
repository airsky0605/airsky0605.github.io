class utils { 
  constructor() { 
    this.gettype:Object.prototype.toString
  }
  isObj (obj) {
    console.log(this.gettype)
  }
}
var a = new utils()
a.isObj({})