<template>
  <div>
    <vue-ueditor-wrap
      v-model="msg"
      :config="config" />
  </div>
</template>
<script>
import { addXiumi } from './editor'
addXiumi()
export default {
  data () {
    return {
      msg: '',
      config: {
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: 'http://192.168.1.109/ueditor/php/controller.php',
        toolbars: [[
          'fullscreen', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'insertvideo', '|'
        ]],
        minFrameWidth: 1000,
        initialFrameWidth: 800,
        initialFrameHeight: 2000,
        elementPathEnabled: false
      }
    }
  },
  async created () {
  }
}
</script>
