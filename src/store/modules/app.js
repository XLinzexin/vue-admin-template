import localStorage from '@/utils/localStorage'
import style from '@/userDefineStyle/defaultStyle'
import { userDefineStyle } from '@/userDefineStyle'
import axios from '@/utils/axios'
const app = {
  state: {
    sidebar: {
      opened: localStorage.get('sidebarStatus')
        ? !!+localStorage.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    size: localStorage.get('size') || 'medium',
    style
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        localStorage.set('sidebarStatus', 1)
      } else {
        localStorage.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      localStorage.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    SET_SIZE: (state, size) => {
      state.size = size
      localStorage.set('size', size)
    },
    SET_STYLE: (state, style) => {
      state.style = style
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    setSize ({ commit }, size) {
      commit('SET_SIZE', size)
    },
    setStyle ({ commit }, style) {
      // const sty = {
      //   'theme': { 'primaryColor': '#1EC07A', 'successColor': '#67c23a', 'infoColor': '#909399', 'warningColor': '#e6a23c', 'dangerColor': '#f56c6c' },
      //   'body': { 'backgroundImage': '', 'backgroundColor': '' },
      //   'headerBar': { 'color': '#ffffff', 'activeColor': '#1CB6F7', 'backgroundColor': '#010B1E' },
      //   'navBar': { 'color': '#ffffff', 'activeColor': '#1CB6F7', 'backgroundColor': '#010B1E', 'logo': 'https:\/\/wechatifydiag790.blob.core.chinacloudapi.cn\/bootdiagnostics-wechatify-cc96dee1-f1fb-4bcb-8700-d5b9009f7067\/2019-03-06\/qVIvXnOTDThqrQfNOgqgu647YxwLUcm4GfmdF63X.png' },
      //   'content': { 'backgroundColor': '#f2f2f2', 'backgroundImage': '', 'backgroundColorDeep': '#f2f2f2' },
      //   'fontSize': { 'title': '44px', 'h1': '36px', 'h2': '28px', 'text': '14px' },
      //   'button': { 'big': { 'radius': '4px', 'height': '44px', 'horizonPadding': '8px' }, 'medium': { 'radius': '4px', 'height': '44px', 'horizonPadding': '8px' }, 'small': { 'radius': '4px', 'height': '44px', 'horizonPadding': '8px' } },
      //   'logo': 'https:\/\/wechatifydiag790.blob.core.chinacloudapi.cn\/bootdiagnostics-wechatify-cc96dee1-f1fb-4bcb-8700-d5b9009f7067\/2019-03-06\/qVIvXnOTDThqrQfNOgqgu647YxwLUcm4GfmdF63X.png'
      // }
      commit('SET_STYLE', style)
    },
    async getStyle () {
      const res = await axios.get('/ui')
      userDefineStyle(res.data, this)
      return true
    }
  }
}

export default app
