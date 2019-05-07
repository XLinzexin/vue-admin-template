import { delToken, setUserInfo } from '@/utils'
// import Cookies from 'js-cookie'
import axios from '@/utils/axios'

const user = {
  state: {
    name: '',
    avatar: ''
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },

  actions: {
    // 获取用户信息
    async getUserInfo ({ commit }) {
      const res = await axios.get('/user')
      const userInfo = res.data
      setUserInfo(userInfo)
      if (!userInfo.name) {
        throw new Error({ message: 'userInfo is empty' })
      } else {
        commit('SET_NAME', userInfo.name)
        commit('SET_AVATAR', userInfo.head_img_url)
        return userInfo
      }
    },
    // 前端 登出
    fedLogOut ({ commit }) {
      return new Promise(resolve => {
        delToken()
        resolve()
      })
    }
  }
}

export default user
