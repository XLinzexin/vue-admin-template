<template>
  <div>
    <vue-ueditor-wrap
      v-if="show"
      v-model="msg"
      :config="config" />
  </div>
</template>
<script>
import { addXiumi, addMinProgram } from './editor'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      msg: '',
      config: {
        UEDITOR_HOME_URL: window.UEDITOR_HOME_URL,
        serverUrl: window.serverUrl,
        toolbars: [[
          'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', '|', 'xiumi-connect', 'minprogram'
        ]],
        minFrameWidth: 1000,
        initialFrameWidth: 480,
        initialFrameHeight: 696,
        elementPathEnabled: false,
        autoHeightEnabled: false
      },
      show: false
    }
  },
  watch: {
    msg () {
      this.$emit('change', this.msg)
    }
  },
  async created () {
    await addXiumi()
    // await addMinProgram()
    this.msg = this.value
    this.show = true
  }
}
</script>
