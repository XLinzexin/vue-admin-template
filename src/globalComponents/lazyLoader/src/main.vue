<template>
  <div>
    <el-scrollbar ref="scroller" v-if="!appScroll" wrapStyle="height:100%;overflow-x:hidden;" viewStyle="height:100%;" style="height:100%;">
      <slot />
      <div class="loader">
        <div v-if="allLoaded">
          没有更多了
        </div>
        <div class="click-more iconfont icon-xiala" v-else-if="!loading&&!hasScroll" @click="getNextPage">
        </div>
        <div class="loadEffect" v-else>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </el-scrollbar>
    <div v-else>
      <slot />
      <div class="loader">
        <div v-if="allLoaded">
          没有更多了
        </div>
        <div class="click-more iconfont icon-xiala" v-else-if="!loading&&!hasScroll" @click="getNextPage">
        </div>
        <div class="loadEffect" v-else>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tmg-lazy-loader',
  props: {
    srollerId: {
      type: String,
      default: null
    },
    appScroll: {
      type: Boolean,
      default: false
    },
    requestUrl: {
      type: String,
      default: null
    },
    requestParams: {
      type: Object,
      default () {
        return {}
      }
    },
    autoLoad: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      allLoaded: false,
      params: {},
      hasScroll: false
    }
  },
  methods: {
    init () {
      this.params = this.requestParams
      this.loading = false
      this.allLoaded = false
      this.getNextPage()
    },
    async getNextPage () {
      if (this.loading) return
      this.loading = true
      const params = Object.assign({
        num: 10
      }, this.params)
      const res = await this.$axios.get(this.requestUrl, { params })
      let list
      if (Object.prototype.toString.call(res.data) === '[object Array]') {
        list = res.data
      } else {
        list = res.data.lists || []
      }
      this.$emit('render', list)
      this.params.page++
      if (list.length < params.num) {
        this.allLoaded = true
      }
      this.loading = false
    }
  },
  watch: {
    requestParams (newVal, oldVal) {
      this.init()
    }
  },
  created () {
    if (this.autoLoad) this.init()
  },
  mounted () {
    const _this = this
    const scrollFunc = function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight + 20
      if (CONDITION && !_this.allLoaded) {
        _this.hasScroll = true
        _this.getNextPage()
      }
    }
    let wrap
    const setScroll = () => {
      wrap = this.appScroll ? window.appScroller ? window.appScroller.$refs.wrap : null : this.$refs.scroller.$refs.wrap
      if (wrap) {
        wrap.onscroll = scrollFunc
      } else {
        setTimeout(setScroll, 100)
      }
    }
    setScroll()
  },
  beforeDestroy () {
    if (this.srollerId && document.getElementById(this.srollerId)) {
      document.getElementById(this.srollerId).onscroll = null
    }
    if (this.appScroll) {
      if (window.appScroller) {
        const wrap = window.appScroller.$refs.wrap
        wrap.onscroll = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroller{
  overflow-y:scroll;
  overflow-x: visible;
}
.loader{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.loadEffect{
    width: 20px;
    height: 20px;
    position: relative;
    margin: 0 auto;
    margin-top:20px;
}
.loadEffect span{
    display: inline-block;
    width: 3.2px;
    height: 3.2px;
    border-radius: 50%;
    background: rgb(121, 112, 112);
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
}
@-webkit-keyframes load{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0.2;
    }
}
.loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-1.6px;
    -webkit-animation-delay:0.13s;
}
.loadEffect span:nth-child(2){
    left: 2.8px;
    top: 2.8px;
    -webkit-animation-delay:0.26s;
}
.loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -1.6px;
    -webkit-animation-delay:0.39s;
}
.loadEffect span:nth-child(4){
    top: 2.8px;
    right:2.8px;
    -webkit-animation-delay:0.52s;
}
.loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-1.6px;
    -webkit-animation-delay:0.65s;
}
.loadEffect span:nth-child(6){
    right: 2.8px;
    bottom:2.8px;
    -webkit-animation-delay:0.78s;
}
.loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -1.6px;
    -webkit-animation-delay:0.91s;
}
.loadEffect span:nth-child(8){
    bottom: 2.8px;
    left: 2.8px;
    -webkit-animation-delay:1.04s;
}
.click-more{
  cursor: pointer;
}
</style>
