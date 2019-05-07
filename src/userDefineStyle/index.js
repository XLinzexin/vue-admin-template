import { defineElementStyle } from './elementStyle'
import { createMainStyle } from './mainStyle'

export const userDefineStyle = function (styleObj, store) {
  defineElementStyle(styleObj.theme)
  createMainStyle(styleObj.theme)
  store.dispatch('setStyle', styleObj)
}
