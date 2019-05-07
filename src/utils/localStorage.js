const localStorage = {
  // 存
  set (key, val) {
    if (Object.prototype.toString.call(val) !== '[object Undefined]') {
      window.localStorage.setItem(key, JSON.stringify(val))
    }
  },
  // 取
  get (key) {
    let str = window.localStorage.getItem(key)
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  },
  // 删
  del (key) {
    window.localStorage.removeItem(key)
  }
}

export default localStorage
