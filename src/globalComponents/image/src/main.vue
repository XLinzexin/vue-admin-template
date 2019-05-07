<template>
  <img v-bind="$attrs" :src="resultSrc" @error="imageError" @load="imageLoad" :width="width" :height="height" :fail="visible?'':src">
</template>

<script>
export default {
  name: 'tmg-image',
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    }
  },
  data: function () {
    return {
      visible: true
    }
  },
  watch: {
    src () {
      this.visible = true
    }
  },
  computed: {
    resultSrc () {
      const { visible, height, width } = this
      const defaultImage = 'http://site.gz.wechatify.net/bootdiagnostics-wechatify-cc96dee1-f1fb-4bcb-8700-d5b9009f7067/common/default.png'
      if (!visible) return defaultImage
      return `${this.src.replace('http://testDomain.com', 'http://cdnDomain.com')}?basic=${height ? height + 'h_' : ''}${width ? width + 'w_' : ''}2e`
    }
  },
  methods: {
    imageError (e) {
      this.visible = false
      this.$emit('error', e)
    },
    imageLoad (e) {
      this.$emit('load', e)
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
</style>
