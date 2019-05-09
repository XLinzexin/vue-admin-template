import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
// 或者在 main.js 里将它注册为全局组件
window.UEDITOR_HOME_URL = '/UEditor/'

// 修改register的按钮无法隐藏的bug
const toolbarsStyle = document.createElement('style')
toolbarsStyle.setAttribute('id', 'toolbarsStyle')
document.head.appendChild(toolbarsStyle)
const registerButtonList = []
const ueditorMixin = {
  created () {
    let styleText = ''
    if (this.config && this.config.toolbars && this.config.toolbars[0]) {
      registerButtonList.forEach(item => {
        if (this.config.toolbars[0].indexOf(item) < 0) {
          styleText += `div.edui-box.edui-for-${item}{display:none !important;}`
        }
      })
    }
    toolbarsStyle.innerText = styleText
  }
}
VueUeditorWrap.mixins = [ueditorMixin]
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
async function registerButton ({ name, register }) {
  if (registerButtonList.indexOf(name) < 0) {
    registerButtonList.push(name)
  }
  await checkRegister()
  register()
}

// 初始化富文本编辑器
async function initUEditor () {
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
  new Vue({ render: h => h(VueUeditorWrap, { props: {
    config: { UEDITOR_HOME_URL: '/UEditor/',
      serverUrl: '',
      toolbars: [[
      ]] }
  } }) }).$mount(`#${editorId}`)
}
initUEditor()

// 检查UE对象是否注入到环境中
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

async function changeUEAjax () {
  await checkRegister()
  const { UE } = window
  const { Editor, ajax } = UE
  const EditorGetOpt = Editor.getOpt
  Editor.getOpt = function (key) {
    if (key === 'serverUrl') {
      return ''
    } else {
      return EditorGetOpt(key)
    }
  }
  const { request } = ajax
  UE.ajax.request = function (url, opts) {
    console.log(url, opts)
    const {onsuccess} = opts
    request(url, opts)
  }
}
changeUEAjax()
// 添加秀米插件
export const addXiumi = async () => {
  await new Promise((resolve) => {
    registerButton({ name: 'xiumi-connect',
      register () {
        const linkTag = 'xiumiStyle'
        if (!document.getElementById(linkTag)) {
          const link = document.createElement('link')
          link.setAttribute('rel', 'stylesheet')
          link.setAttribute('href', 'http://xiumi.us/connect/ue/v5/xiumi-ue-v5.css')
          link.setAttribute('id', linkTag)
          document.head.appendChild(link)
        } else {
          resolve()
          return
        }
        const { UE } = window
        UE.registerUI('dialog', function (editor, uiName) {
          var btn = new UE.ui.Button({
            name: 'xiumi-connect',
            title: '秀米',
            editor,
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
        resolve()
      } })
  })
}

export const addMinProgram = async () => {
}
