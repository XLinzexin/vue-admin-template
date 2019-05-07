<template>
  <div class="tmg-select-button"
       :id="text?'tmg-select-button':''"
       :class="[text?'isText':'isSelect']"
       :style="{width:text?'100px':'auto'}">
    <el-date-picker
      id="tmg-date-picker"
      slot="appendfix"
      ref="datePicker"
      v-model="range"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changeTime"
    ></el-date-picker>
    <el-select class="shadow" :value="value" :placeholder="placeholder" @change="changeOption">
      <el-button slot="prefix" v-if="loading&&text" type="primary" style="width:100%">{{loadingText}}</el-button>
      <el-button slot="prefix" v-if="!loading&&text" style="width:100%">{{text}}</el-button>
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  name: 'tmg-time-select',
  props: {
    text: {
      type: String,
      default: ''
    },
    loadingText: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    default: {
      type: [Number, String],
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    format: String
  },
  data () {
    return {
      value: this.default || '',
      range: '',
      loading: false
    }
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        if (Object.prototype.toString.call(oldVal) === '[object Null]') return
        let startTime, endTime
        endTime = null
        if (typeof newVal === 'number' && newVal > 0) {
          const nowDay = new Date()
          nowDay.setHours(0)
          nowDay.setMinutes(0)
          nowDay.setSeconds(0)
          startTime = nowDay.getTime() - 86400000 * (newVal - 1)
          this.selectTime({ startTime, endTime })
        } else if (newVal === 'all') {
          this.selectTime({ startTime: null, endTime })
        }
        if (this.text) {
          this.value = ''
        }
      },
      immediate: true
    }
  },
  computed: {
    selectOptions () {
      const optionsMap = {
        all: '全部时间',
        range: '任意范围'
      }
      const result = []
      for (let item of this.options) {
        if (optionsMap[item]) {
          result.push({
            label: optionsMap[item],
            value: item
          })
        } else if ((typeof item === 'number') & (item > 1)) {
          result.push({
            label: `最近${item}天`,
            value: item
          })
        } else if (item === 1) {
          result.push({
            label: `今天`,
            value: item
          })
        }
      }
      return result
    }
  },
  methods: {
    init () {
      this.value = this.default || ''
    },
    changeOption (value) {
      if (value === 'range') {
        this.$refs.datePicker.handleFocus()
      } else {
        this.value = value
      }
    },
    changeTime (e) {
      let startTime = new Date(e[0])
      let endTime = new Date(e[1])
      let time = {
        startTime: startTime.getTime(),
        endTime: endTime.getTime()
      }
      this.selectTime(time)
      this.value = `${this.getTime(startTime)} ~ ${this.getTime(
        endTime
      )}`
    },
    selectTime (times) {
      if (this.text && this.loadingText) {
        this.loading = true
      }
      if (this.format) {
        times.startTime && (times.startTime = Moment(times.startTime).format(this.format))
        times.endTime && (times.endTime = Moment(times.endTime).format(this.format))
      }
      this.$emit('selectTime', times, this.complete)
    },
    complete () {
      this.loading = false
    },
    getTime (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  },
  created () {
    // this.init()
  }
}
</script>

<style lang="less">
.tmg-select-button {
  display: inline-block;
  position: relative;
  &.isText{
    .el-select{
      box-shadow: none;
    }
  }
  &.isSelect{
  box-shadow: 0px 2px 7px 0px rgba(25, 25, 25, 0.2);
  border-radius: 4px;
    .el-button--default.el-button--small{
      box-shadow: none;
    }
    .el-select{
      box-shadow: none;
    }
  }
  .el-input__inner,
  .el-input__icon {
    height: 32px;
    line-height: 32px;
    border-color: transparent;
  }
  .el-input__prefix{
    width: 100%;
  }
  .el-range-editor.el-input__inner {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
  }
}
#tmg-date-picker {

}
#tmg-select-button {
  .el-select .el-input__inner {
    display: none;
  }
  .el-input__prefix {
    position: relative;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
