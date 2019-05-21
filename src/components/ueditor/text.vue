<template>
  <div>
    <vue-ueditor-wrap
      v-model="msg"
      :config="config" />
  </div>
</template>
<script>
import { } from './editor'
export default {
  data () {
    return {
      msg: '',
      config: {
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: '/UEditor/php/controller.php',
        toolbars: [['undo', 'redo', 'emotion', 'link', 'unlink']],
        minFrameWidth: 320,
        initialFrameWidth: 320,
        initialFrameHeight: 140,
        elementPathEnabled: false
      }
    }
  },
  async created () {
  }
}
</script>
