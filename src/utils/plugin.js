import Vue from 'vue'
import axios from './axios'
import localStorage from './localStorage'
import { elementInstall } from './element'

const axiosPlugins = {
  install: function (Vue, name = '$axios') {
    Object.defineProperty(Vue.prototype, name, { value: axios, enumerable: true })
  }
}
Vue.use(axiosPlugins)

const localStoragePlugins = {
  install: function (Vue, name = '$localStorage') {
    Object.defineProperty(Vue.prototype, name, { value: localStorage, enumerable: true })
  }
}
Vue.use(localStoragePlugins)
elementInstall(Vue)
