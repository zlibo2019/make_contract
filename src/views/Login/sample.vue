<template>
  <div class="excel" >
    <el-dialog
      :visible.sync="centerDialogVisible"
      :title="titleName"
      :close-on-click-modal="false"
      :before-close="beforePausClose"
      width="1040px"
    >
      <div style="min-height: 550px;padding: 0 20px">
        <div class="excel-header">
          <el-select v-show="templateShow" v-model="value" placeholder="请选择导入的模板" @change="changeTemplate($event)">
            <el-option
              v-for="item in options"
              :key="item.template_table_name"
              :label="item.template_description"
              :value="item.template_table_name"/>
          </el-select>
          <el-button :disabled="selectPower" class="diybut" @click="btnClick">选择Excel文件</el-button>
          <el-button :disabled="exportBtn" class="diybut" @click="exportExcel">下载模板</el-button>
          <el-checkbox v-show="checkBoxMutiplian" v-model="picSubmitShow">将图片保存到系统中</el-checkbox>
          <div style="margin: 0 auto;display: inline-block;float: right">
            <el-button :disabled="exportPower" class="diybut" @click="saveDataBase">导入</el-button>
            <el-button :disabled="canclePower" class="diybut" @click="cancleTemplate">关闭</el-button>
          </div>
        </div>
        <div v-show="errorPromptShow" class="error-prompt" style="max-height: 100px;overflow-y: auto">
          <p v-for="(item, index) in errorList" :key="index" style="color: red;height: 20px;line-height: 14px;margin: 0">
            {{ item }}
          </p>
        </div>
        <!--        手动编写的滚动条-->
        <div v-show="progressDebugShow" style="width: 100%;height: 20px;background: #4FA6E0;position: relative;border-radius: 5px;line-height: 20px;margin-bottom: 20px;overflow: hidden">
          <div class="slider" style=" position:absolute;left: 10px;top: 1px;">
            <div style="width: 10px;height: 10px;line-height: 10px;border-radius: 5px;background: white;display: inline-block" />
            <div style="width: 10px;height: 10px;line-height: 10px;border-radius: 5px;background: white;display: inline-block" />
            <div style="width: 10px;height: 10px;line-height: 10px;border-radius: 5px;background: white;display: inline-block" />
          </div>
        </div>
        <div>
          <p v-show="resultShow" style="height: 30px;line-height: 30px;margin-top: 10px">
            <span>成功：{{ successCount }}条</span>
            <span style="margin: 0 20px">失败：{{ failCount }}条</span>
            <el-button v-show="failCount !== 0" type="text" @click="exportFailData">下载导入失败数据</el-button>
          </p>
        </div>
        <!--       表格-->
        <div
          v-loading="loading"
          style="width:100%;overflow-x: auto;min-height: 425px"
          element-loading-text="保存中，请稍等"
          element-loading-spinner="el-icon-loading">
          <table
            border="1px solid gray"
            style="border-collapse: collapse;width: 960px"
          >
            <!--显示数据库查出来的标题-->
            <tr style="text-align: center;height: 30px;line-height: 0;width: 1000px;background: #F4F4F4">
              <td v-for="(item ,index) in arr" :key="index" style=" height: 40px;">
                <div class="tableWidth" style="min-width: 100px;white-space:nowrap;">
                  <span v-show="templateAllData[index].attribute_not_null" style="color: red">*</span>{{ item }}
                  <input v-show="picSubmitShow" ref="mutiCheck" :value="item" v-model="checked" type="checkbox" style="margin-left: 10px;display: inline-block;position: relative;top: 3px">
                </div>
              </td>
            </tr>
            <!--从excel中获取的标题-->
            <tr style="height: 40px;overflow: hidden;line-height: 0">
              <td v-for="(item ,index) in arr" :key="index" style="width: 30px;white-space:nowrap;">
                <select v-model="changeList[item]" :value="item" class="selectedList" @change="changeListValue(index)">
                  <option v-for="(item1, index1) in arr1" :key="index1" :value="item1" >
                    {{ item1 }}
                  </option>
                </select>
              </td>
            </tr>
            <!--excel中获取的具体数据展示-->
            <tr v-for="(item, index) in tableData" :key="index">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;">
                <div :title="item[item1]" style="width: 150px;white-space:nowrap;overflow: hidden;line-height: 2;height: 20px">
                  {{ item[item1] }}
                </div>
              </td>
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>
            <tr v-show="tableShow" class="tableShow">
              <td v-for="(item1, index1) in arr" :key="index1" style="height: 34px;" />
            </tr>

          </table>
        </div>
        <p style="text-align: center;line-height: 50px;margin-bottom: 0">(预览数据)</p>
      </div>
    </el-dialog>
    <input
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      class="input-file"
      type="file"
      @change="exportData"
    >
    <el-button
      :type="buttonType"
      :disabled="disabled"
      :icon="buttonIcon"
      :size="buttonSize"
      @click="getAllTemplateData">
      {{ titleName }}
    </el-button>
    <el-dialog
      :visible.sync="centerDialogVisibleTwo"
      title="导入结果"
      width="40%"
      center>
      <p style="text-align: center">成功条数：{{ successCount }}</p>
      <p style="text-align: center">失败条数：{{ failCount }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleTwo = false">关闭</el-button>
        <el-button v-show="exportFale" type="primary" @click="exportFailData">导出失败数据</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getTemplate, getTemplateHeader, saveExcel, uploadPicToQn, getFailData } from '@/api/excel'
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false // 是否有禁用权限
    },
    titleName: {
      type: String,
      default: '批量导入商品信息' //  传入不同的标题
    },
    actionName: {
      type: String,
      default: 'commodity' // commodity商品,commodity_specification商品规格,sales_team,销售组 customer_department 客户单位 customer客户   根据不同使用传入不同的数据
    },
    buttonType: {
      type: String,
      default: '' // 控制Button的类型
    },
    buttonIcon: {
      type: String,
      default: '' // 控制Button中的图标 (仅支持element-ui中自带图标)
    },
    buttonSize: {
      type: String,
      default: '' // 控制Button的尺寸
    }
  },
  data() {
    return {
      arr: [], // 放从数据库获取的标题
      arr1: [], // 导入的excel中的标题
      tableData: [], // 用于循环展示的值
      copyTableData: [], // 用于保存最初的json数据。以便进行数据更换
      changeList: {}, // 动态绑定下拉框的值
      submitLastValue: [], // 最终提交的值
      centerDialogVisible: false, // 对话框1显示
      centerDialogVisibleTwo: false, // 对话框2显示
      options: [], // 模板列表
      value: '', // 选择的模板值
      templateAllData: [],
      checked: [], // 用于图片转换的输入框列表
      debugCount: 0,
      copyTableDataTwo: [], // 用于下拉框切换时的数据展示
      picSubmitShow: false, // 是否显示图片转换输入框
      template: [],
      oneArr: 0, // 用于在图片转换时判断是否转换完成
      twoArr: 0, // 用于在图片转换时判断是否转换完成
      count: 0,
      loading: false, // 加载图标
      successCount: 0, // 成功条数
      failCount: 0, // 失败条数
      exportBtn: true, // 导入按钮权限
      exportFale: true, // 用于判断是否导出失败数据
      templateShow: true,
      checkBoxMutiplian: false,
      progressTimer: '',
      errorList: [], // 前端校验错误提示
      progress: 0, // 进度条百分比
      progressDebugShow: false, // 滚动条是否显示
      errorPromptShow: false, // 校验失败提示是否显示
      resultShow: false, // 控制导入结果显示
      selectPower: false, // 选择模板权限
      exportPower: false, // 导入按钮权限
      canclePower: false, // 关闭按钮权限
      iconClickPower: 0, // 控制点击对话框关闭图标是否执行
      tableShow: true // 显示空表格
    }
  },
  computed: {
    ...mapGetters([
      'business_group_id'
    ])
  },
  watch: {
    debugCount: function(newV, oldV) {
      // if (newV === this.submitLastValue.length * this.checked.length) {
      //   this.saveResult()
      // }
    },
    twoArr: function(newV, oldV) {
      if (this.checked.length > 0) {
        setTimeout(this.PicTransfer, 100)
      }
    },
    tableData: function(newV, oldV) {
      // if (this.tableData.length > 0) {
      //   this.tableShow = false
      // } else {
      //   this.tableShow = true
      // }
    }
  },
  beforeDestroy() {
    clearInterval(this.progressTimer)
  },
  methods: {
    getAllTemplateData: function() {
      this.arr1 = []
      this.arr = []
      this.value = ''
      this.tableData = []
      this.copyTableDataTwo = []
      this.copyTableData = []
      this.centerDialogVisible = true
      this.progressDebugShow = false
      this.resultShow = false
      this.count = 0
      this.oneArr = 0
      this.twoArr = 0
      this.checked = []
      this.picSubmitShow = false
      this.getDefaultArr()
    },
    // 获取数据库模板数据
    getDefaultArr: function() {
      let group_id = ''
      if (this.actionName === 'commodity') {
        group_id = this.business_group_id
      }
      getTemplate(group_id, this.actionName)
        .then(res => {
          this.options = res.data
          if (this.options.length === 1) {
            this.value = this.options[0].template_table_name
            this.templateShow = false
            this.changeTemplate(this.value)
          }
        })
        .catch(() => {})
    },
    // 点击对话框的X图标事件
    beforePausClose() {
      if (this.iconClickPower === 1) {
        return
      } else {
        this.centerDialogVisible = false
      }
    },
    // 取消
    cancleTemplate: function() {
      this.value = ''
      this.arr = []
      this.arr1 = []
      this.value = ''
      this.tableData = []
      this.centerDialogVisible = false
      this.centerDialogVisibleTwo = false
      this.exportBtn = true
      clearInterval(this.progressTimer)
      document.querySelector('.input-file').value = ''
    },
    // 切换模板时
    changeTemplate: function(data) {
      if (data !== '') {
        this.arr = []
        getTemplateHeader(data)
          .then(res => {
            this.templateAllData = res.data.data
            this.checkBoxMutiplian = res.data.need_save_pictures
            this.template = []
            const obj = {}
            res.data.data.forEach((item, index) => {
              obj[item.attribute_name] = ''
              this.arr.push(item.attribute_name)
            })
            this.template.push(obj)
            this.exportBtn = false
            // 动态添加changeList的值
            for (let i = 0; i < this.arr.length; i++) {
              this.changeList[this.arr[i]] = this.arr[i]
            }
          })
          .catch(() => {})
      }
    },
    // 图片转换 将有src属性并且为img的值时，将src中的值改变为后台传过来的值
    PicTransfer: function() {
      const a = this.submitLastValue[this.twoArr][this.checked[this.oneArr]]
      if (typeof a === 'string' && a.indexOf('<img') > -1 && a.indexOf('src') > -1) {
        const arrimg = []
        // 截取出相应的src属性值
        a.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
          arrimg.push(capture)
        })
        uploadPicToQn(arrimg)
          .then(res => {
            for (let h = 0; h < arrimg.length; h++) {
              // this.tableData[j][this.checked[i]] = this.tableData[j][this.checked[i]].replace(arrimg[h], res.data[h].pic_name)
              this.submitLastValue[this.twoArr][this.checked[this.oneArr]] = this.submitLastValue[this.twoArr][this.checked[this.oneArr]].replace(arrimg[h], res.data[h].pic_name)
              this.count += 1
            }
            this.debugCount += 1
            if (this.oneArr === this.checked.length - 1 && this.twoArr === this.submitLastValue.length - 1) { // 判断src的值是否转换完成
              this.saveResult()
            } else if (this.twoArr < this.submitLastValue.length - 1) {
              this.twoArr += 1
            } else {
              this.oneArr += 1
              this.twoArr = 0
            }
          })
          .catch(() => {
            if (this.oneArr === this.checked.length - 1 && this.twoArr === this.submitLastValue.length - 1) {
              this.saveResult()
            } else if (this.twoArr < this.submitLastValue.length - 1) {
              this.twoArr += 1
            } else {
              this.oneArr += 1
              this.twoArr = 0
            }
          })
      } else {
        this.debugCount += 1
        if (this.oneArr === this.checked.length - 1 && this.twoArr === this.submitLastValue.length - 1) {
          this.saveResult()
        } else if (this.twoArr < this.submitLastValue.length - 1) {
          this.twoArr += 1
        } else {
          this.oneArr += 1
          this.twoArr = 0
        }
      }
      // this.debugCount = 0
      // for (let i = 0; i < this.checked.length; i++) {
      //   for (let j = 0; j < this.submitLastValue.length; j++) {
      //     const a = this.submitLastValue[j][this.checked[i]]
      //     if (typeof a === 'string' && a.indexOf('<img') > -1 && a.indexOf('src') > -1) {
      //       const arrimg = []
      //       // 截取出相应的src属性值
      //       a.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
      //         arrimg.push(capture)
      //       })
      //       uploadPicToQn(arrimg)
      //         .then(res => {
      //           for (let h = 0; h < arrimg.length; h++) {
      //             // this.tableData[j][this.checked[i]] = this.tableData[j][this.checked[i]].replace(arrimg[h], res.data[h].pic_name)
      //             this.submitLastValue[j][this.checked[i]] = this.submitLastValue[j][this.checked[i]].replace(arrimg[h], res.data[h].pic_name)
      //           }
      //           this.debugCount += 1
      //           // this.resultData()
      //         })
      //         .catch(() => {})
      //     } else {
      //       this.debugCount += 1
      //     }
      //   }
      // }
    },
    btnClick() {
      if (this.value) {
        this.progressDebugShow = false
        clearInterval(this.progressTimer)
        this.resultShow = false
        document.querySelector('.input-file').click()
      } else {
        this.$message.warning('请先选择模板')
      }
    },
    // 导入本地文件后取值
    exportData(event) {
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      const f = event.currentTarget.files[0]
      document.querySelector('.input-file').value = ''
      // 用FileReader来读取
      const reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = ''
        let wb = '' // 读取完成的数据
        let outdata = [] // 你需要的数据
        const reader = new FileReader()
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          that.arr1 = []
          that.tableData = []
          that.copyTableDataTwo = []
          that.copyTableData = []
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // 获取excel表格中的所有标题
          for (let i = 0; i < outdata.length; i++) {
            for (const j in outdata[i]) {
              let num = 0
              for (let k = 0; k < that.arr1.length; k++) {
                if (that.arr1[k] === j) {
                  num += 1
                }
              }
              if (num === 0) {
                that.arr1.push(j)
              }
            }
          }
          that.arr1.unshift(' ')
          // 字段不存在或者没有值时，则将它的值设置为空
          for (let i = 0; i < outdata.length; i++) {
            for (let j = 0; j < that.arr.length; j++) {
              if (!outdata[i][that.arr[j]] && outdata[i][that.arr[j]] !== 0) {
                outdata[i][that.arr[j]] = ''
              }
            }
          }
          // that.arr1 = []
          // for (const i in outdata[0]) {
          //   that.arr1.push(i)
          // }
          // console.log(outdata[0])
          // console.log(that.arr1)
          for (let i = 0; i < 10 && i < outdata.length; i++) {
            const changeValue = JSON.stringify(outdata[i])
            that.tableData.push(JSON.parse(changeValue))
            that.copyTableData.push(JSON.parse(changeValue))
          }
          // that.tableData = outdata
          // 由于数组和对象是引用类型，在赋值时候会将地址也一起赋值，当改变一个值得时候会将另外一个值也改变，所以先转为字符串再转回来（基本类型只会传值不会传地址）
          // that.copyTableData = JSON.stringify(outdata)
          that.copyTableDataTwo = JSON.stringify(outdata)
          // that.copyTableData = JSON.parse(that.copyTableData)
          that.copyTableDataTwo = JSON.parse(that.copyTableDataTwo)
          // 如果少于10行的补空格显示十行
          $('.tableShow').removeClass('hideTr')
          if (outdata.length < 10) {
            for (let i = 0; i < outdata.length; i++) {
              $('.tableShow').eq(i).addClass('hideTr')
            }
          } else {
            $('.tableShow').addClass('hideTr')
          }
          that.resultData()
          that.centerDialogVisible = true
          // 自定义方法向父组件传递数据
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    },
    // 下拉框的值改变后改变对应的值
    changeListValue(index) {
      // console.log(index) // 下标
      // console.log(this.arr[index])
      // console.log(this.changeList[this.arr[index]]) // 下拉框改变后的值
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i][this.arr[index]] = this.copyTableData[i][this.changeList[this.arr[index]]]
      }
      // console.log(this.tableData)
      this.resultData()
    },
    resultData() {
      this.submitLastValue = []
      for (let i = 0; i < this.tableData.length; i++) {
        const list = {}
        for (let j = 0; j < this.arr.length; j++) {
          if (!this.tableData[i][this.arr[j]]) {
            list[this.arr[j]] = ''
          } else {
            list[this.arr[j]] = this.tableData[i][this.arr[j]]
          }
        }
        this.submitLastValue.push(list)
      }
    },
    // 设置进度条定时器
    setTimerProgress() {
      const that = this
      clearInterval(that.progressTimer)
      that.progress = 0
      that.progressTimer = setInterval(function() {
        if (that.progress === 960) {
          that.progress = 0
        } else {
          that.progress += 3
          $('.slider').css('left', that.progress + 'px')
        }
      }, 20)
    },
    // 保存到数据库中
    saveDataBase() {
      this.selectPower = true
      this.canclePower = true
      this.exportPower = true
      this.loading = true
      this.iconClickPower = 1
      this.submitLastValue = []
      this.resultShow = false
      this.progressDebugShow = false
      clearInterval(this.progressTimer)
      for (let j = 0; j < this.copyTableDataTwo.length; j++) {
        const obj = {}
        for (let i = 0; i < this.arr.length; i++) {
          if (this.copyTableDataTwo[j][this.changeList[this.arr[i]]] || this.copyTableDataTwo[j][this.changeList[this.arr[i]]] === 0) {
            obj[this.arr[i]] = this.copyTableDataTwo[j][this.changeList[this.arr[i]]]
          } else {
            obj[this.arr[i]] = ''
          }
        }
        this.submitLastValue.push(obj)
      }
      if (this.checked.length && this.checked.length !== 0) {
        this.PicTransfer()
      } else {
        this.saveResult()
      }
    },
    // 校验上传数据
    saveResult: function() {
      // 上传数据校验
      if (this.submitLastValue.length === 0) {
        this.$message.warning('当前暂无数据')
        this.loading = false
        this.iconClickPower = 0
        this.selectPower = false
        this.canclePower = false
        this.exportPower = false
        return
      }
      this.errorList = []
      for (let i = 0; i < this.templateAllData.length; i++) {
        for (let j = 0; j < this.submitLastValue.length; j++) {
          if (this.templateAllData[i].attribute_not_null === true && !this.submitLastValue[j][this.templateAllData[i].attribute_name] && this.submitLastValue[j][this.templateAllData[i].attribute_name] !== 0) {
            // this.$message.error(this.templateAllData[i].attribute_name + '不能为空')
            // this.loading = false
            // return
            this.errorList.push(this.templateAllData[i].attribute_name + '不能为空')
          }
          if ((this.templateAllData[i].attribute_not_null === 'true' || this.templateAllData[i].attribute_not_null === true) && this.templateAllData[i].attribute_type === 'int4' && (!(/(^[0-9]\d*$)/.test(this.submitLastValue[j][this.templateAllData[i].attribute_name])))) {
            // 判断长度 this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().length > this.templateAllData[i].attribute_length
            // this.$message.error(this.templateAllData[i].attribute_name + '传输类型应为整形')
            // this.loading = false
            // return
            this.errorList.push(this.templateAllData[i].attribute_name + '传输类型应为整形')
          }
          if (this.templateAllData[i].attribute_type === 'numeric' && this.submitLastValue[j][this.templateAllData[i].attribute_name] && typeof this.submitLastValue[j][this.templateAllData[i].attribute_name] !== 'number') {
            // this.$message.error(this.templateAllData[i].attribute_name + '传输类型为数字')
            // this.loading = false
            // return
            this.errorList.push(this.templateAllData[i].attribute_name + '传输类型为数字')
          }
          if (this.templateAllData[i].attribute_type === 'date' && this.submitLastValue[j][this.templateAllData[i].attribute_name]) {
            this.submitLastValue[j][this.templateAllData[i].attribute_name] = this.submitLastValue[j][this.templateAllData[i].attribute_name].toString()
            this.submitLastValue[j][this.templateAllData[i].attribute_name] = this.submitLastValue[j][this.templateAllData[i].attribute_name].replace('年', '-')
            this.submitLastValue[j][this.templateAllData[i].attribute_name] = this.submitLastValue[j][this.templateAllData[i].attribute_name].replace('月', '-')
            this.submitLastValue[j][this.templateAllData[i].attribute_name] = this.submitLastValue[j][this.templateAllData[i].attribute_name].replace('日', '')
            if (isNaN(Date.parse(this.submitLastValue[j][this.templateAllData[i].attribute_name]))) {
              // this.$message.error(this.templateAllData[i].attribute_name + '格式有误')
              // this.loading = false
              // return
              this.errorList.push(this.templateAllData[i].attribute_name + '格式有误')
            }
          }
          if (this.templateAllData[i].attribute_type === 'bool') {
            if (this.submitLastValue[j][this.templateAllData[i].attribute_name] === '是' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === 't' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === 'true' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === 'yes' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === '1') {
              this.submitLastValue[j][this.templateAllData[i].attribute_name] = true
              continue
            }
            if (this.submitLastValue[j][this.templateAllData[i].attribute_name] === '否' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === 'f' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === 'false' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === 'no' ||
              this.submitLastValue[j][this.templateAllData[i].attribute_name].toString().toLowerCase() === '0') {
              this.submitLastValue[j][this.templateAllData[i].attribute_name] = false
              continue
            }
            if (this.submitLastValue[j][this.templateAllData[i].attribute_name] === '') {
              continue
            }
            // this.$message.error(this.templateAllData[i].attribute_name + '传输类型为布尔值')
            // this.loading = false
            // return
            this.errorList.push(this.templateAllData[i].attribute_name + '传输类型为布尔值')
          }
        }
      }
      if (this.errorList.length === 0) {
        this.progressDebugShow = true
        this.setTimerProgress()
        saveExcel(this.value, this.submitLastValue)
          .then(res => {
            this.successCount = parseInt(res.data.success)
            this.failCount = parseInt(res.data.fail)
            this.loading = false
            this.iconClickPower = 0
            this.selectPower = false
            this.canclePower = false
            this.exportPower = false
            // this.tableData = []
            // this.arr1 = []
            // this.arr = []
            // this.copyTableData = []
            // this.copyTableDataTwo = []
            // this.centerDialogVisible = false
            // this.centerDialogVisibleTwo = true
            this.resultShow = true
            clearInterval(this.progressTimer)
            this.progressDebugShow = false
            if (parseInt(this.failCount) === 0) {
              this.exportFale = false
            } else {
              this.exportFale = true
            }
            this.$emit('refleshParent') // 导入完成时在父组件刷新页面
          })
          .catch(() => {
            this.$message({
              message: '上传失败',
              type: 'error',
              duration: 2 * 1000
            })
            this.loading = false
            this.iconClickPower = 0
            clearInterval(this.progressTimer)
            this.progressDebugShow = false
          })
      } else {
        // 数组去重
        const saveArr = []
        for (let i = 0; i < this.errorList.length; i++) {
          let num = 0
          for (let j = 0; j < i; j++) {
            if (this.errorList[j] === this.errorList[i]) {
              num = 1
              break
            }
          }
          if (num === 0) {
            saveArr.push(this.errorList[i])
          }
        }
        this.errorList = saveArr
        this.errorPromptShow = true
        this.loading = false
        this.iconClickPower = 0
        this.selectPower = false
        this.canclePower = false
        this.exportPower = false
      }
    },
    // 获取保存失败的数据
    exportFailData: function() {
      getFailData(this.value)
        .then(res => {
          this.JSONToExcelConvertor(res.data, '未导入成功的数据')
          // this.value = ''
        }).catch()
    },
    // 导出数据到excel
    exportExcel() {
      let titleExcel = ''
      // 获取表格标题
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].template_table_name === this.value) {
          titleExcel = this.options[i].template_description
        }
      }
      // this.tableToExcel(this.template)
      this.JSONToExcelConvertor(this.template, titleExcel)
      // this.exportPathMethod(this.template)
      // this.JSONToExcelConvertor(this.submitLastValue, 'report', this.arr, ['id'])
    },
    exportPathMethod(data) {
      // 要导出的json数据
      var jsonData = []
      // for (var i = 0; i < data.length; i++) {
      //   jsonData.push({
      //     index: i + 1,
      //     title: data[i].title,
      //     url: data[i].url,
      //     createTime: data[i].createTime
      //   })
      // }

      // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `序号,标题,地址,时间\n`
      // 增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < jsonData.length; i++) {
        for (const item in jsonData[i]) {
          str += `${jsonData[i][item] + '\t'},`
        }
        str += '\n'
      }

      // encodeURIComponent解决中文乱码
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
      // 通过创建a标签实现
      var link = document.createElement('a')
      link.href = uri
      // 对下载的文件命名
      link.download = 'json数据表.xls'
      document.body.appendChild(link)
      link.click()
    },
    // 只转出excel标题
    JSONToExcelConvertor(JSONData, FileName, title, filter) {
      if (!JSONData) { return }
      var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData
      var excel = '<table>'
      var row = '<tr>'

      if (title) {
        for (const i in title) {
          row += "<th align='center'>" + title[i] + '</th>'
        }
      } else {
        for (const i in arrData[0]) {
          let num = 0
          for (let j = 0; j < this.templateAllData.length; j++) {
            if (i === this.templateAllData[j].attribute_name && this.templateAllData[j].attribute_not_null === true) {
              num += 1
            }
          }
          if (num === 0) {
            row += "<th align='center'>" + '</span>' + i + '</th>'
          } else {
            // 导出时必填的有*号 row += "<th align='center'><span style='color: red'>" + '*' + '</span>' + i + '</th>'
            row += "<th align='center'> " + i + '</th>'
          }
        }
      }
      excel += row + '</tr>'
      // 如果有需要过滤的项则过滤
      for (var i = 0; i < arrData.length; i++) {
        let row = '<tr>'
        for (var index in arrData[i]) {
          if (filter) {
            if (filter.indexOf(index) === -1) {
              var value = arrData[i][index] == null ? '' : arrData[i][index]
              row += '<td>' + value + '</td>'
            }
          } else {
            const value = arrData[i][index] == null ? '' : arrData[i][index]
            row += "<td align='center'>" + value + '</td>'
          }
        }
        excel += row + '</tr>'
      }
      excel += '</table>'

      var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'
      excelFile += '; charset=UTF-8">'
      excelFile += '<head>'
      excelFile += '<!--[if gte mso 9]>'
      excelFile += '<xml>'
      excelFile += '<x:ExcelWorkbook>'
      excelFile += '<x:ExcelWorksheets>'
      excelFile += '<x:ExcelWorksheet>'
      excelFile += '<x:Name>'
      excelFile += '{worksheet}'
      excelFile += '</x:Name>'
      excelFile += '<x:WorksheetOptions>'
      excelFile += '<x:DisplayGridlines/>'
      excelFile += '</x:WorksheetOptions>'
      excelFile += '</x:ExcelWorksheet>'
      excelFile += '</x:ExcelWorksheets>'
      excelFile += '</x:ExcelWorkbook>'
      excelFile += '</xml>'
      excelFile += '<![endif]-->'
      excelFile += '</head>'
      excelFile += '<body>'
      excelFile += excel
      excelFile += '</body>'
      excelFile += '</html>'
      var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = FileName + '.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    // 转出标题和数据
    tableToExcel: function(jsonData) {
      // 列标题
      let str = '<tr>'
      for (let i = 0; i < this.arr.length; i++) {
        str += `<td>${this.arr[i] + '\t'}</td>`
      }
      str += '</tr>'
      // 循环遍历，每行加入tr标签，每个单元格加td标签
      for (let i = 0; i < jsonData.length; i++) {
        str += '<tr>'
        for (const item in jsonData[i]) {
          // 增加\t为了不让表格显示科学计数法或者其他格式
          str += `<td>${jsonData[i][item] + '\t'}</td>`
        }
        str += '</tr>'
      }
      // Worksheet名
      const worksheet = 'Sheet1'

      // 下载的表格模板数据
      const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`
// 下载模板
      window.location.href = 'data:application/vnd.ms-excel;base64,' + this.base64(template)
    },
    base64: function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
  }
}
</script>

<style scoped>
  .excel{
    display: inline-block;
    /*position: relative;*/
    /*right: 90px;*/
  }
  .input-file {
    display: none;
  }
  .selectedList{
    display: block;
    width: 100%;
    height: 34px;
    padding: 0px 0;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .diybut{
    display: inline-block;
    width: 135px;
    height: 40px;
  }
  .error-prompt{
    margin: 15px 0;
  }
  .correct-prompt{
    margin: 15px 0;
  }
  .hideTr{
    display: none;
  }
  tr:nth-child(odd) {
    background: #F4F4F4;
  }

</style>
<style>
  .excel .el-dialog__header{
    padding: 20px 20px 10px 40px;
  }
</style>