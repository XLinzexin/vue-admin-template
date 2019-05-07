import lazyLoader from './src/main'

/* istanbul ignore next */
lazyLoader.install = function (Vue) {
  Vue.component(lazyLoader.name, lazyLoader)
}

export default lazyLoader
