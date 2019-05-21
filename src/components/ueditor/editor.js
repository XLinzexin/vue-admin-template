import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import config from './editor.config.json'
import MinprogramDialog from './MinProgramDialog.vue'
// 或者在 main.js 里将它注册为全局组件
window.UEDITOR_HOME_URL = '/UEditor/'
// window.UEDITOR_HOME_URL = 'https://wechatifydiag790.blob.core.chinacloudapi.cn/bootdiagnostics-wechatify-cc96dee1-f1fb-4bcb-8700-d5b9009f7067/UEditor/

const serverUrl = window.serverUrl = `${process.env.NODE_ENV === 'development' ? 'https://crm-dev.wechatify.net' : window.location.origin}/api/upload/ueditor`

const requestHeaders = {
  get Authorization () {
    return `Bearer token`
  }
}
// 修改register的按钮无法隐藏的bug
const toolbarsStyle = document.createElement('style')
toolbarsStyle.setAttribute('id', 'toolbarsStyle')
document.head.appendChild(toolbarsStyle)
const registerButtonList = []
const ueditorMixin = {
  created () {
    let styleText = '.edui-default .edui-editor-toolbarbox{position:relative !important;}.edui-editor div[style*="height: 103px"]{display:none;}'
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
    config: { UEDITOR_HOME_URL: window.UEDITOR_HOME_URL,
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
    if (!hasChangeAjax) {
      await changeUEAjax()
    }
    return true
  } else {
    await timeout(100)
    const res = await checkRegister()
    return res
  }
}
// 修改ueditor的请求，实现前后端分离
let hasChangeAjax = false
async function changeUEAjax () {
  const { UE } = window
  const { Editor, ajax } = UE
  const EditorGetOpt = Editor.prototype.getOpt
  Editor.prototype.getOpt = function (key) {
    if (!this.hasAssginOption) {
      this.options = Object.assign(this.options, config)
      this.hasAssginOption = true
      this.options.headers = requestHeaders
    }
    if (key === 'serverUrl') {
      return serverUrl
    } else {
      // console.log(this,key)
      return EditorGetOpt.bind(this)(key)
    }
  }

  // Editor.prototype.getActionUrl = function (action) {
  //   return action
  // }
  const { request } = ajax
  UE.ajax.request = function (url, opts) {
    const configList = [`${serverUrl}?action=config`,
      `${serverUrl}?action=image`,
      `${serverUrl}?action=scrawl`,
      `${serverUrl}?action=imageManager`]

    const { onsuccess } = opts
    if (configList.includes(url.split('&&')[0])) {
      onsuccess({})
    } else {
      request(url, opts)
    }
  }
  hasChangeAjax = true
}
// 添加秀米插件
export const addXiumi = async () => {
  await new Promise((resolve) => {
    registerButton({ name: 'xiumi-connect',
      register () {
        const linkTag = 'xiumiStyle'
        if (!document.getElementById(linkTag)) {
          const link = document.createElement('link')
          link.setAttribute('rel', 'stylesheet')
          link.setAttribute('href', 'https://xiumi.us/connect/ue/v5/xiumi-ue-v5.css')
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
              // process.env.NODE_ENV==="development"
              var dialog = new UE.ui.Dialog({
                iframeUrl: `${window.UEDITOR_HOME_URL}xiumi-ue-dialog-v5.html`,
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
  await new Promise((resolve) => {
    const minprogram = 'minprogram'
    registerButton({ name: minprogram,
      register () {
        const style = document.createElement('style')
        style.innerText = `.edui-button.edui-for-${minprogram} .edui-button-wrap .edui-button-body .edui-icon{
          // background-image: url(${1}) !important;
          background-size: contain;
        }`
        document.head.appendChild(style)
        const minprogramDom = document.createElement('div')
        minprogramDom.setAttribute('id', minprogram)
        document.body.appendChild(minprogramDom)
        const MinprogramDialogVue = new Vue({
          render: h => h(MinprogramDialog)
        }).$mount(`#${minprogram}`)
        const { UE } = window
        UE.registerUI(minprogram, function (editor, uiName) {
          const { domUtils } = UE.dom
          console.log(editor)
          // domUtils.on(editor.body,'click',function(e){
          // });
          var btn = new UE.ui.Button({
            name: minprogram,
            title: '添加小程序',
            editor,
            onclick: function () {
              MinprogramDialogVue.$children[0].show({
                callback: data => {
                  const range = editor.selection.getRange()
                  const a = range.document.createElement('a')
                  const { appid, path, title, text, imageUrl } = data
                  domUtils.setAttributes(a, {
                    'data-miniprogram-appid': appid,
                    'data-miniprogram-path': path,
                    'data-miniprogram-title': title
                  })
                  a.innerText = text
                  range.insertNode(a).selectNode(a)
                }
              })
            }
          })
          return btn
        })
        resolve()
      } })
  })
}
