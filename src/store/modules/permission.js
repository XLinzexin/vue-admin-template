import { asyncRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    INIT_ROUTERS: (state, routers) => {
      state.routers = state.routers.concat(routers)
    }
  },
  actions: {
    initRouters ({ commit }, data) {
      constantRouterMap = data.constantRouterMap
      asyncRouterMap = data.asyncRouterMap
      commit('INIT_ROUTERS', constantRouterMap)
    },
    async generateRoutes ({ commit }) {
      commit('SET_ROUTERS', asyncRouterMap)
      return true
    }
  }
}

export default permission
