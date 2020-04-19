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