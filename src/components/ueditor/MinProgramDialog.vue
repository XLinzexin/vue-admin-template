<template>
  <el-dialog
    id="minProgramDialog"
    title="插入小程序"
    width="50%"
    @close="close"
    :visible.sync="visible">
      <el-form :model="form"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="minProgram-form">
        <el-form-item label="跳转方式">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">卡片跳转</el-radio>
            <el-radio :label="2">文字跳转</el-radio>
            <el-radio :label="3">图片跳转</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="appid" prop="appid">
          <el-input v-model="form.appid"
                    placeholder="小程序的AppID"/>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="form.path"
                    placeholder="小程序要打开的路径"/>
        </el-form-item>
        <el-form-item label="标题" prop="title" v-if="form.type===1">
          <el-input v-model="form.title"
                    placeholder="小程序卡片的标题，不超过35个字"/>
        </el-form-item>
        <el-form-item label="文本内容" prop="text" v-if="form.type===2">
          <el-input v-model="form.text"
                    placeholder="文本内容"/>
        </el-form-item>
        <el-form-item label="图片" prop="imageUrl" v-if="form.type!==2">
          <el-upload
            class="upload-image"
            action="123"
            :before-upload="beforeUpload"
            :show-file-list="false">
            <tmg-image v-if="form.imageUrl" :src="form.imageUrl" class="imageUrl" @load="loadImage"/>
            <i v-else class="el-icon-plus upload-image-icon"></i>
          </el-upload>
          <div class="tips" v-if="form.type!==2">图片必须为1080*864像素</div>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      form: {
        type: 1,
        appid: '',
        path: '',
        title: '',
        text: '',
        imageUrl: ''
      },
      rules: {
        appid: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, min: 1, max: 35, message: '此项不能为空输入长度不能超过35个字符', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '此项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show (config) {
      const { callback } = config
      this.visible = true
      this.callback = callback
    },
    close () {
      this.visible = false
      this.$refs.ruleForm.clearValidate()
    },
    confirm () {
      this.$refs.ruleForm.validate((valid, detail) => {
        switch (this.form.type) {
          case 1:
            delete detail.text
            break
          case 2:
            delete detail.title
            delete detail.imageUrl
            break
          case 3:
            delete detail.title
            delete detail.text
            break
        }
        if (!Object.keys(detail).length) {
          if (this.form.type !== 2 && !this.legalImage) {
            this.$message.error('图片必须为1080*864像素')
            return
          }
          this.callback(JSON.parse(JSON.stringify(this.form)))
          this.$refs.ruleForm.resetFields()
          this.close()
        }
      })
    },
    beforeUpload (file) {
      const baseSize = 1024 * 1000
      const num = 2
      const fileType = file.name.split('.').splice(-1)[0]
      const allType = ['jpg', 'jpeg', 'png']
      if (!allType.includes(fileType)) {
        this.$message.warning('请上传正确jpg/png/jpeg图片')
      } else if (file.size > num * baseSize) {
        this.$message.warning(`请上传${num}M以内的照片`)
      } else {
        const name = file.name
        let fd = new FormData()
        fd.append('image', file, name)
        this.$axios.post('/upload/image', fd).then(res => {
          this.form.imageUrl = res.data.path
        })
      }
      return false
    },
    loadImage (e) {
      const { naturalWidth, naturalHeight } = e.path[0]
      if (!(this.legalImage = (naturalWidth === 1080 && naturalHeight === 864))) {
        this.$message.error('图片必须为1080*864像素')
      }
    }
  },
  mounted () {
    console.log(this.$options.template)
  }
}
</script>
<style lang="less">
#minProgramDialog{
  .upload-image .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-image .el-upload:hover {
    border-color: #409EFF;
  }
  .upload-image-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .imageUrl {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tips{
    font-size: 13px;
    color:#999;
  }
}
</style>
