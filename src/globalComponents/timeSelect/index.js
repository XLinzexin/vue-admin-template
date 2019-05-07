import timeSelect from './src/main'

/* istanbul ignore next */
timeSelect.install = function (Vue) {
  Vue.component(timeSelect.name, timeSelect)
}

export default timeSelect
