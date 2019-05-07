import dataController from './src/main'

/* istanbul ignore next */
dataController.install = function (Vue) {
  Vue.component(dataController.name, dataController)
}

export default dataController
