class utils { 
  constructor() { 
    gettype:Object.prototype.toString
  }
  isObj (obj) { 
    return this.gettype.call(obj)
  }
}
const a = new utils()
a.isObj({})