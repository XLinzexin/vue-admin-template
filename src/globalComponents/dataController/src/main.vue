<template>
  <div>
    <div padding="0">
      <div class="tmg-data-controller-header">
        <div class="title">
          <tmg-title-with-help v-bind="{
            title,
            content:titleContent
          }" v-if="titleContent"/>
          <span class="text" v-else>{{title}}</span>
        </div>

        <div class="actions-bar">
          <template v-for="(item, index) in actions">
            <tmg-search-input v-if="item.type==='searchInput'" :placeholder="item.placeholder" @click="search" clearable :key="item.target" class="margin-left" />
            <tmg-time-select v-else-if="item.type==='timeSelect'" @selectTime="selectTime" :format="item.format" :options="item.options" default="all" :key="item.target" class="margin-left" />
            <el-select v-else-if="item.type==='select'" :value="item.value" :placeholder="item.placeholder" @change="changeOption($event,item.target,index)" :key="item.target" class="margin-left shadow">
              <el-option
                v-for="it in item.options"
                :key="it.text"
                :label="it.text"
                :value="it.value">
              </el-option>
            </el-select>
          </template>
          <el-button  v-if="column.length" @click="dialogVisible = true" class="icon-button boxShadow margin-left">
            <i class="iconfont icon-shezhi"></i>
          </el-button>
          <el-button v-if="downloadUrl" class="icon-button boxShadow" @click="downloadHandle">
            <i class="iconfont icon-xiazai"></i>
          </el-button>
        </div>
      </div>
      <slot></slot>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="params.page"
        :page-count="pageCount">
      </el-pagination>
    </div>
      <el-dialog
        v-if="column.length"
        title="设置"
        :visible.sync="dialogVisible"
        width="60%">
        <el-checkbox-group v-model="checkColumn">
          <el-checkbox v-for="item in column" :label="item.text" :value="item.text" :key="item.prop">{{item.text}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeColumn">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { downloadFile } from '@/utils'
export default {
  name: 'tmg-data-controller',
  props: {
    requestMethod: {
      type: String,
      default: 'get'
    },
    title: {
      type: String,
      default: ''
    },
    titleContent: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default () {
        return []
      }
    },
    column: {
      type: Array,
      default () {
        return []
      }
    },
    requestParams: {
      type: Object,
      default () {
        return {
        }
      }
    },
    downloadUrl: {
      type: String,
      default: ''
    },
    downloadMode: {
      type: String,
      default: 'email' // 'email','file'
    },
    requestUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      params: {},
      dialogVisible: false,
      checkColumn: [],
      total: 0,
      pageCount: 1
    }
  },
  watch: {
    dialogVisible (value) {
      if (value) {
        this.initCheckColumn()
      }
    },
    checkColumn () {
      const column = this.column
      this.column.forEach(item => {
        item.visible = this.checkColumn.includes(item.text)
      })
      this.$emit('update:column', column)
    },
    requestParams (newVal, oldVal) {

    }
  },
  methods: {
    initCheckColumn () {
      this.checkColumn = this.column.filter(item => item.visible).map(item => item.text)
    },
    changeColumn () {
      this.dialogVisible = false
    },
    getActionsTarget (type) {
      for (let item of this.actions) {
        if (item.type === type) { return item.target }
      }
    },
    search (val) {
      const target = this.getActionsTarget('searchInput')
      this.params[target] = val
      this.initData()
    },
    selectTime (val) {
      const target = this.getActionsTarget('timeSelect')
      const timeTarget = target.split('/')
      this.params[timeTarget[0]] = val.startTime
      this.params[timeTarget[1]] = val.endTime
      this.initData()
    },
    changeOption (e, target, index) {
      this.actions[index].value = e
      this.params[target] = e
      this.initData()
    },
    initData (obj) {
      this.params.page = 1
      this.getData(obj)
    },
    async getData (obj = { notify: false }) {
      let loading = this.$loading()
      let res
      if (this.requestMethod.toLowerCase() === 'get') {
        res = await this.$axios.get(this.requestUrl, { params: this.params })
      } else if (this.requestMethod.toLowerCase() === 'post') {
        res = await this.$axios.post(this.requestUrl, this.params)
      }
      // this.total = res.data.total
      const totalPage = res.data.total_page
      if (totalPage < this.params.page && totalPage) {
        this.params.page = totalPage
        this.getData(obj)
        return
      }
      this.pageCount = totalPage
      this.$emit('render', res.data)
      loading.close()
      if (obj && obj.notify) {
        this.$notify({
          title: obj.message || 'Success',
          type: obj.type || 'success'
        })
      }
    },
    changePage (e) {
      this.params.page = e
      this.getData()
    },
    async downloadHandle () {
      if (this.downloadMode === 'email') {
        let loading = this.$loading()
        let res = await this.$axios.prevent().post(this.downloadUrl, this.params)
        loading.close()
        if (res.errcode === 0) {
          this.$message.success('下载请求发送成功！请稍后到邮箱查看下载结果')
        }
      } else if (this.downloadMode === 'file') {
        console.log(this.downloadUrl)
        downloadFile(this.downloadUrl.replace(window.TmgCdnInfo.file, window.TmgCdnInfo.img), 'file')
      }
    }
  },
  created () {
    this.params = this.requestParams
    // console.log(this.requestParams)
    // console.log(JSON.parse(JSON.stringify(this.params)))
    // console.log(JSON.parse(JSON.stringify(this.requestParams)))
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.margin-left{
  margin-left: 13px
}
.tmg-data-controller-header{
  position: relative;
  z-index: 2;
  .title{
    height: 67px;
    padding-left: 26px;
    line-height: 67px;
    font-size: 16px;
    .text{
      font-weight: bold
    }
  }
  .actions-bar{
    position: absolute;
    right: 26px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    .setting{

    }
  }
}
.pagination{
  text-align: center;
  padding: 34px 0 37px 0;
}
</style>
