import Vue from 'vue'
import dataController from './dataController'
import image from './image'
import lazyLoader from './lazyLoader'
import timeSelect from './timeSelect'

const components = [
  dataController,
  image,
  lazyLoader,
  timeSelect
]

components.forEach(component => {
  Vue.component(component.name, component)
})
