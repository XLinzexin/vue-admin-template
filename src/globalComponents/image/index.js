import image from './src/main'

/* istanbul ignore next */
image.install = function (Vue) {
  Vue.component(image.name, image)
}

export default image
