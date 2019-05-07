
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import Popper from 'element-ui/src/utils/vue-popper'
function deepClone (obj) {
  var objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
const copyPopper = deepClone(Popper)
delete copyPopper.props.appendToBody
const copyPopperDataFun = copyPopper.data
copyPopper.data = function () {
  const data = copyPopperDataFun()
  data.appendToBody = false
  return data
}

const ElSelectMenu = ElementUI.Select.components.ElSelectMenu
ElSelectMenu.mixins[0] = copyPopper
const dataFun = ElSelectMenu.data
ElSelectMenu.props.appendToBody.default = false
delete ElSelectMenu.props.appendToBody
ElSelectMenu.data = function () {
  const data = dataFun()
  data.appendToBody = false
  return data
}
const DropdownMenu = ElementUI.DropdownMenu
DropdownMenu.mixins[0] = copyPopper

locale.use(lang)
export const elementInstall = function (Vue) {
  Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
  Vue.component(CollapseTransition.name, CollapseTransition)

  Vue.prototype.$notify = ElementUI.Notification
  Vue.prototype.$loading = (obj = { lock: true }) => ElementUI.Loading.service(obj)
  Vue.prototype.$confirm = ElementUI.MessageBox.confirm
  Vue.prototype.$message = ElementUI.Message
  Vue.prototype.$alert = ElementUI.MessageBox.alert
}

export const Loading = ElementUI.Loading

export const MessageBox = ElementUI.MessageBox
