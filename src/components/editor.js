import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
// 或者在 main.js 里将它注册为全局组件
window.UEDITOR_HOME_URL = '/UEditor/'

Vue.component('vue-ueditor-wrap', VueUeditorWrap)

// 初始化富文本编辑器
function initUEditor () {
  const editorWrapper = document.createElement('div')
  const editor = document.createElement('div')
  editorWrapper.appendChild(editor)
  const editorId = 'editorId'
  editorWrapper.setAttribute('style', 'display:none;')
  editor.setAttribute('id', 'editorId')
  document.body.appendChild(editorWrapper)
  setTimeout(() => {
    document.body.removeChild(editorWrapper)
  }, 2000)
  new Vue({ render: h => h(VueUeditorWrap) }).$mount(`#${editorId}`)
}
initUEditor()

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export const checkRegister = async () => {
  if (window.UE && window.UE.registerUI) {
    return true
  } else {
    await timeout(100)
    const res = await checkRegister()
    return res
  }
}

export const addXiumi = async () => {
  const linkTag = 'xiumiStyle'
  if (!document.getElementById(linkTag)) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', 'http://xiumi.us/connect/ue/v5/xiumi-ue-v5.css')
    link.setAttribute('id', linkTag)
    document.head.appendChild(link)
  }
  await checkRegister()
  const UE = window.UE
  window.UE.registerUI('dialog', function (editor, uiName) {
    console.log(editor)
    var btn = new UE.ui.Button({
      name: 'xiumi-connect',
      title: '秀米',
      onclick: function () {
        var dialog = new UE.ui.Dialog({
          iframeUrl: '/UEditor/xiumi-ue-dialog-v5.html',
          editor: editor,
          name: 'xiumi-connect',
          title: '秀米图文消息助手',
          cssRules: 'width: ' + (window.innerWidth - 60) + 'px;' + 'height: ' + (window.innerHeight - 60) + 'px;'
        })
        dialog.render()
        dialog.open()
      }
    })
    return btn
  })
}

export const addMinProgram = async () => {
  await checkRegister()
  const UE = window.UE
  window.UE.registerUI('dialog', function (editor, uiName) {
    var btn = new UE.ui.Button({
      name: 'xiumi-connect',
      title: '秀米',
      onclick: function () {
        var dialog = new UE.ui.Dialog({
          iframeUrl: '/UEditor/xiumi-ue-dialog-v5.html',
          editor: editor,
          name: 'xiumi-connect',
          title: '秀米图文消息助手',
          cssRules: 'width: ' + (window.innerWidth - 60) + 'px;' + 'height: ' + (window.innerHeight - 60) + 'px;'
        })
        dialog.render()
        dialog.open()
      }
    })
    return btn
  })
}
