<template>
  <div>
    <div class="all-page-left">
      <div class="page-top">
        <div>
          <el-button @click="downUserTemplateClick()">下载档案模板</el-button>
          <el-button @click="downContractTemplateClick()">下载合同模板</el-button>
        </div>

        <div style="padding-top: 20px;">
          <el-upload
            class="upload-demo"
            ref="uploadUpUserTemplate"
            :http-request="httpRequestUpUserTemplate"
            :before-upload="beforeFileUploadUpUser"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
          >
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <el-button slot="trigger" size="small" type="primary">选择档案模板</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUploadUpUserTemplate"
            >上传档案模板</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
          </el-upload>
        </div>

        <div style="padding-top: 20px;">
          <el-upload
            class="upload-demo"
            ref="uploadUpContractTemplate"
            :http-request="httpRequestUpContractTemplate"
            :before-upload="beforeFileUploadUpContractTemplate"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
          >
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <el-button slot="trigger" size="small" type="primary">选择合同模板</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUploadUpContractTemplate"
            >上传合同模板</el-button>
            <div slot="tip" class="el-upload__tip">只能上传docx文件</div>
          </el-upload>
        </div>

        <div style="padding-top: 20px;">
          <el-upload
            class="upload-demo"
            ref="uploadUpUser"
            :http-request="httpRequestUpUser"
            :before-upload="beforeFileUploadUpUser"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
          >
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <el-button slot="trigger" size="small" type="primary">选择档案文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUploadUpUser"
            >导入档案文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
          </el-upload>
        </div>

        <!-- <div style="padding-top: 20px;">
          导入人员
          <input
            id="upload"
            type="file"
            @change="importXlsx(this)"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>-->
      </div>

      <div class="page-top">
        <el-button type="button" style="width:120px" @click="saveClick">保存照片</el-button>
        <el-button type="button" style="width:120px" @click="queryUserClick">查询</el-button>
        <el-button type="button" style="width:120px" @click="bulkMakeContract()">生成合同</el-button>
      </div>

      <div class="page-top">
        <el-table @selection-change="changeBox" :data="tableData">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="contractNo" label="合同编号" width="95"></el-table-column>
          <el-table-column prop="userId" label="身份证" width="95"></el-table-column>
          <el-table-column prop="userName" label="姓名" width="70"></el-table-column>
          <el-table-column prop="userAddress" label="地址" width="150"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="all-page-midle">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="all-page-middle">
          <el-tab-pane name="first" label="拍身份证">
            <div class="bottom-left">
              <img :src="avatar1" class="img-avatar" />
              <div>
                <input
                  style="margin-top: 280px"
                  type="file"
                  name="avatar"
                  id="uppic"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  @change="changeImage1($event)"
                  ref="avatarInput"
                  class="uppic"
                />
              </div>
              <img :src="avatar2" class="img-avatar" style="margin-top: 40px;" />
              <div>
                <input
                  type="file"
                  name="avatar"
                  id="uppic"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  @change="changeImage2($event)"
                  ref="avatarInput"
                  class="uppic"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second" label="拍合同">
            <div class="bottom-right">
              <img :src="avatar3" class="img-avatar" style="height: 650px; width: 500px" />
              <div>
                <input
                  type="file"
                  name="avatar"
                  id="uppic"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  @change="changeImage3($event)"
                  ref="avatarInput"
                  class="uppic"
                  style="margin-top:680px"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="all-page-right">
      <div class="page-top" style="padding-bottom: 100px;padding-top: 13px;">
        <el-select
          v-model="device"
          placeholder="请选择设备"
          size="medium"
          style="width:270px;"
          @change="ChangeDevice"
        >
          <el-option v-for="item in arrDevice" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="button" @click="CaptureBase64()">拍照</el-button>
      </div>
      <div class="ocx"></div>
    </div>
  </div>
</template>


<script>
import { domAppend } from "@/utils/load_ocx.js"; //我的动态创建元素的方法放于的文件夹
import { commonAxios, deleteAxios, putAxios } from "../../utils/axios.js";
import Base from "@/api/base";

var CO = require("co");
export default {
  name: "login",
  data() {
    return {
      upTemplate: { name: "赵李波" },
      radio: 1,
      activeName: "first",
      checkBoxData: [], //多选框选择的值
      avatar1: require("../../../static/img/sfz1.jpg"),
      avatar2: require("../../../static/img/sfz2.jpg"),
      avatar3: null,
      avatar1Used: false,
      device: "",
      arrDevice: [],
      tableData: [],
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ]
    };
  },
  methods: {
    beforeFileUploadUpContractTemplate(file) {
      let extName = file.name.split(".")[1];
      if (extName !== "docx") {
        // const isLt2M = file.size / 1024 / 1024 < 50;
        this.$message({
          message: "只能上传docx文件",
          type: "warning"
        });
        return false;
      }
    },

    beforeFileUploadUpUser(file) {
      let extName = file.name.split(".")[1];
      if (extName !== "xlsx") {
        // const isLt2M = file.size / 1024 / 1024 < 50;
        this.$message({
          message: "只能上传xlsx文件",
          type: "warning"
        });
        return false;
      }
    },

    // 转换base64格式
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    httpRequestUpContractTemplate(options) {
      // alert("aaaaaaaaaaaaaaaaa");
      let self = this;
      // this.fileName = options.file.name;
      // this.id = options.data.id;
      this.getBase64(options.file).then(res => {
        let fileData = res.split(",")[1];
        let params = { base64_1: fileData };
        self
          .saveContractTemplate(params)
          .then(res => {
            this.$message({
              type: "success",
              message: "上传成功!"
            });
            // this.templetManage();
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    httpRequestUpUserTemplate(options) {
      // alert("aaaaaaaaaaaaaaaaa");
      let self = this;
      // this.fileName = options.file.name;
      // this.id = options.data.id;
      this.getBase64(options.file).then(res => {
        let fileData = res.split(",")[1];
        let params = { base64_1: fileData };
        self
          .saveUserTemplate(params)
          .then(res => {
            this.$message({
              type: "success",
              message: "上传成功!"
            });
            // this.templetManage();
          })
          .catch(error => {
            console.log(error);
          });
      });
    },

    httpRequestUpUser(options) {
      // alert('bbbbbbbbbbbbbbbbbbb');
      let self = this;
      // this.fileName = options.file.name;
      // this.id = options.data.id;

      // let fileData = res.split(",")[1];
      // let params = { base64_1: fileData };
      self
        .importXlsx(options.file)
        .then(res => {
          this.$message({
            type: "success",
            message: "上传成功!"
          });
          // this.templetManage();
        })
        .catch(error => {
          console.log(error);
        });
    },
    uploadTemplateContractUrl() {
      return `${Base.server}/saveContractTemplate`;
    },
    uploadUserUrl() {
      return `${Base.server}/upXlsxData`;
    },
    submitUploadUpContractTemplate() {
      this.$refs.uploadUpContractTemplate.submit();
    },
    submitUploadUpUserTemplate() {
      this.$refs.uploadUpUserTemplate.submit();
    },
    submitUploadUpUser() {
      // alert("aaaaaaaaaaaaaaaaaaaaa");
      this.$refs.uploadUpUser.submit();
    },
    upTemplate(obj) {
      let self = this;
      var binary = "";
      let f = event.currentTarget.files[0];
      var reader = new FileReader();
      var wb;
      reader.onload = () => {
        var bytes = new Uint8Array(reader.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        var XLSX = require("xlsx");

        wb = XLSX.read(binary, {
          type: "binary"
        });

        // alert(wb);

        let params = {
          base64_1: wb
        };
        this.saveContractTemplate(params).then(res => {
          // console.log(JSON.stringify(res));
          if (res.data.code == 600) {
            alert("保存成功!");
          } else {
            alert(res.data.msg);
          }
        });
      };
      reader.readAsBinaryString(f);
    },

    changeMakePhoto(index) {
      if (index === 1) {
        this.activeName = "first";
      } else if (index === 2) {
        this.activeName = "second";
      }
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeBox(val) {
      this.checkBoxData = val;
    },

    downTemplate(name) {
      var downloadElement = document.createElement("a");
      downloadElement.href = `${Base.server}/public/docx/${name}`;
      // alert(downloadElement.href);
      // downloadElement.download = "b.docx"; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
    },

    downUserTemplateClick() {
      this.downTemplate("template_user.xlsx");
    },

    downContractTemplateClick() {
      this.downTemplate("template_contract.docx");
    },

    changeImage1(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.avatar1 = this.result;
      };
    },

    changeImage2(e) {
      var file = e.target.files[0];

      // console.log("file" + file);
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      // console.log(JSON.stringify(reader));
      reader.onload = function(e) {
        let base64 = this.result;
        that.avatar2 = base64;
      };
    },

    changeImage3(e) {
      var file = e.target.files[0];

      console.log("file" + file);
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      console.log(JSON.stringify(reader));
      reader.onload = function(e) {
        let base64 = this.result;
        that.avatar3 = base64;
      };
    },

    makeDocx(params) {
      return commonAxios("post", `${Base.server}/makeDocx`, params);
    },
    upXlsxData(params) {
      return commonAxios("post", `${Base.server}/upXlsxData`, params);
    },
    queryUser(params) {
      return commonAxios("post", `${Base.server}/queryUser`, params);
    },
    saveUserPhoto(params) {
      return commonAxios("post", `${Base.server}/saveUserPhoto`, params);
    },
    saveContractTemplate(params) {
      return commonAxios("post", `${Base.server}/saveContractTemplate`, params);
    },
    saveUserTemplate(params) {
      return commonAxios("post", `${Base.server}/saveUserTemplate`, params);
    },
    importXlsx(file) {
      let _this = this;
      // let inputDOM = this.$refs.avatarInput;
      // 通过DOM取文件数据
      //  this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      // var f = this.file;

      let f = file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }

          // 解析字段配置
          let arrField = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]]); //outdata就是你想要的东西

          let arrData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          let arrUser = new Array();
          for (let i = 0; i < arrData.length; i++) {
            let curUser = arrData[i];
            let user = {};

            for (let j = 0; j < arrField.length; j++) {
              let curTableField = arrField[j].数据库字段名.replace(
                /^\s*|\s*$/g,
                ""
              ); // 去除两边空格
              let curXlsxField = arrField[j].档案导入字段名.replace(
                /^\s*|\s*$/g,
                ""
              ); // 去除两边空格
              user[curTableField] = curUser[curXlsxField];
            }
            arrUser.push(user);
          }
          let params = { arrData: arrUser };
          _this.upXlsxData(params).then(res => {
            console.log(JSON.stringify(res));
            if (res.data.code == 600) {
              _this.tableData = arrUser;
              alert("导入成功");
            } else {
              alert("导入失败:" + res.data.msg);
            }
          });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    queryUserClick() {
      let self = this;
      let params = {};
      this.queryUser(params).then(res => {
        console.log(JSON.stringify(res));
        if (res.data.code == 600) {
          self.tableData = res.data.data;
        } else {
        }
      });
    },

    saveClick() {
      let self = this;
      if (self.checkBoxData.length === 0) {
        alert("请选择人员!");
        return;
      }

      let base64_1, base64_2, base64_3;
      if (this.activeName === "first") {
        base64_1 = this.avatar1;
        base64_2 = this.avatar2;
        if (null === base64_1 || null === base64_2) {
          alert("请拍照或导入照片");
          return;
        }
        base64_3 = null;
      } else {
        base64_1 = null;
        base64_2 = null;
        base64_3 = this.avatar3;
        if (null === base64_3) {
          alert("请拍照或导入照片");
          return;
        }
      }
      let params = {
        userId: this.checkBoxData[0].userId,
        base64_1: base64_1,
        base64_2: base64_2,
        base64_3: base64_3
      };
      // alert(this.checkBoxData[0].userId);
      console.log(JSON.stringify(this.tableData));
      this.saveUserPhoto(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.data.code == 600) {
          alert("保存成功");
        } else {
          alert("保存失败");
        }
      });
    },

    bulkMakeContract() {
      let self = this;
      for (let i = 0; i < self.checkBoxData.length; i++) {
        let curUser = self.checkBoxData[i];
        let params = curUser;
        self.makeDocx(params).then(res => {
          if (res.data.code == 600) {
            let filePath = res.data.data;
            self.downloadFile(filePath);
          } else {
            alert("照片不存在!");
          }
        });
      }
    },

    downloadFile(url) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(() => {
        iframe.remove();
      }, 10 * 1000);
    },

    // makeContract(user) {
    //   let self = this;
    //   let params = user;

    //   return new Promise(function(resolve, reject) {
    //     self.makeDocx(params).then(res => {
    //       // console.log(JSON.stringify(res));

    //       if (res.data.code == 600) {
    //         let filePath = res.data.data;
    //         resolve(res.data);
    //       } else {
    //         reject(res.data);
    //       }
    //     });
    //   });

    //   console.log("aaaaaaaaaaaaaaaa");
    // },

    showImageBase64(strBase64) {
      let zp = "data:image/jpeg;base64," + strBase64;
      if (this.activeName === "first") {
        if (this.avatar1Used) {
          this.avatar2 = zp;
          // document.getElementById("avatarId2").src = zp;
          this.avatar1Used = false;
        } else {
          this.avatar1 = zp;
          // document.getElementById("avatarId1").src = zp;
          this.avatar1Used = true;
        }
      } else {
        this.avatar3 = zp;
      }
    },

    CaptureBase64() {
      var files = this.Capture();
      var strs = new Array(); //定义一数组
      strs = files.split(";"); //字符分割
      for (let i = 0; i < strs.length; i++) {
        var strBase64 = CamSDKOCX.EncodeBase64(strs[i]);
        //显示到窗口
        this.showImageBase64(strBase64);
      }
    },

    Capture() {
      try {
        let newFile = "c://temp/sfz.jpg";
        var files = CamSDKOCX.CaptureImage(newFile);
        return newFile;
      } catch (error) {
        alert(error);
      }
    },

    CaptureShow() {
      try {
        var files = this.Capture();
        var arrFile = new Array(); //定义一数组
        arrFile = files.split(";"); //字符分割

        var arrFileShow = new Array();
        console.log("zzzzzzzzzzzzzzzzzzzzz" + arrFile.length);

        for (let i = 0; i < arrFile.length; i++) {
          console.log("11111111111111111");
          var cropType = 0; //document.getElementById("autocrop").value;
          console.log("bbbbbbbbbbb");
          if (cropType == "2") {
            console.log("ccccccc");
            arrFileShow = arrFile[i].split(".");
            CamSDKOCX.ShowImage(
              arrFileShow[0] + "_" + i + "." + arrFileShow[1]
            );
          } else {
            console.log("ddddddddddddddd");
            CamSDKOCX.ShowImage(arrFile[i]);
          }
        }
      } catch (error) {
        console.log("capshow" + error);
      }
    },

    InitCamOCX() {
      try {
        var ret = CamSDKOCX.InitCameraLib();
        if (ret !== undefined && ret != null) {
          if (ret === 263) {
            console.log("ocx初始化成功，但是没有授权");
          } else {
            console.log("OCX初始化成功：" + ret);
            // return;
          }
        } else {
          console.log("初始化没有任何返回");
        }

        // 单图裁切&补边
        CamSDKOCX.SetAutoCrop(3);
        // this.StartVideo();
        setTimeout(() => {
          this.StartVideo();
        }, 500);
        // setTimeout("StartVideo()", 200);
      } catch (error) {
        console.log("init err" + error);
      }
    },

    StartVideo() {
      this.AddDevice();
      //打开列表所选摄像头
      this.ChangeDevice(0);
      // this.AddAudioDev(AudioList);
    },

    // <!--清空列表-->
    clean(list) {
      while (list.length > 0) {
        list.length = 0;
      }
    },

    // <!--更新设备列表-->
    AddDevice() {
      // alert("aaaaaaaaaa");
      try {
        this.clean(this.arrDevice);
        var mainDevCount = 0;
        var total = CamSDKOCX.GetDevCount();
        for (var i = 0; i < total; i++) {
          var devtype = CamSDKOCX.GetDevType(i);
          //if (devtype == 0) {//0 主头
          var DevEle = CamSDKOCX.GetDevName(i);
          let device = { id: i, name: DevEle };
          this.arrDevice.push(device);
          // DeviceList.options.add(new Option(DevEle, i));
          // DeviceList.options[mainDevCount].text = DevEle;
          mainDevCount++;
          //}
        }
        // alert(JSON.stringify(this.arrDevice));
        if (mainDevCount > 0) {
          // alert("bbbbbbbbbbbbbb");
          mainIndex = 0;
          this.device = this.arrDevice[0].name;
          // DeviceList.options[0].selected = true;
        }
      } catch (error) {
        console.log("err...." + error);
      }
    },

    // <!--切换摄像头-->
    ChangeDevice(index) {
      console.log("切换设备,index:" + index);

      try {
        let ret = CamSDKOCX.CloseDev();
        console.log("关闭设备,结果:" + ret);
        if (index >= 0) {
          ret = CamSDKOCX.openDev(index, 0, 0, 0);
          console.log("打开设备,结果:" + ret);
        }
      } catch (error) {
        console.log("changedeive" + error);
      }
    },

    // <!--麦克风-->
    AddAudioDev(obj) {
      var nCount = CamSDKOCX.GetAudioDevCount();
      for (var i = 0; i < nCount; i++) {
        var DevEle = CamSDKOCX.GetAudioDevName(i);
        obj.options.add(new Option(DevEle));
      }
      if (nCount > 0) {
        obj.options[0].selected = true;
      }
    },

    // <!--更新媒体类型列表-->
    AddMediaType(list) {
      this.clean(list);
      total = CamSDKOCX.GetMediaTypeCount();
      for (var j = 0; j < total; j++) {
        var mediatypeName = CamSDKOCX.GetMediaTypeName(j);
        list.options.add(new Option(mediatypeName));
        //list.options[j].text=mediatypeName ;
      }
      list.options[0].selected = true;
    },

    //<!--设置媒体类型-->
    SetMediaType(MediaType) {
      //var obj=document.getElementById("MediaType") ;
      var index = MediaType.selectedIndex;
      CamSDKOCX.SetMediaType(index);
    },

    UnInitCamOCX() {
      CamSDKOCX.UnInitCameraLib();
    }
  },
  created() {},
  mounted() {
    let arrObj = document.getElementsByTagName("OBJECT");
    let flag = false;
    for (let i = 0; i < arrObj.length; i++) {
      if (arrObj[i].getAttribute("id") == "CamSDKOCX") return (flag = true);
    }

    if (!flag) {
      let list = document.getElementsByClassName("ocx");
      let div = list[0];
      domAppend(div, "CamSDKOCX");
    }

    this.InitCamOCX();
  },
  destroyed() {
    this.UnInitCamOCX();
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.input-file {
  display: none;
}
.page-top {
  width: 100%;
  padding-top: 20px;
}
.page-left {
  width: 500px;
  background-color: green;
  position: absolute;
}
.page-main {
  width: 1300px;
  background-color: green;
  position: absolute;
  right: 0;
  width: 800px;
}
.page-right {
  width: 450px;
  height: 455px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin-top: 10px;
  margin-left: 1300px;
}
// 身份证
.img-avatar {
  width: 420px;
  height: 260px;
  position: absolute;
  background-color: yellowgreen;
}

// .rz-picter {
//   // width: 100px;
//   // height: 200px;
//   // margin: 0.3rem auto;
//   // border: 0.01rem solid #ededed;
//   // // display: flex;
//   // // flex-direction: column;
//   // align-items: center;
//   // // justify-content: center;
//   // background-color: #f1f1f1;
//   // position: absolute;

//   // background-color: #aaa;
//   // width: 100%;
//   // // height: 300px;
//   // padding: 20px;
// }

.uppic {
  width: 500px;
  // height: 80px;
  // margin: 0 auto;
  // // opacity: 0;
  // // z-index: 99999;
  // position: absolute;
  // padding: 80px;
  // background-color: burlywood;
  margin-top: 320px;
  margin-right: 40px;
}

.all-page-left {
  float: left;
  width: 30%;
  // background-color: red;
  padding-left: 10px;
}
.all-page-middle {
  float: left;
  width: 30%;
  // height: 10%;
  // background-color: green;
  // padding-left: 20px;
}
.all-page-right {
  float: right;
  width: 35%;
  // background-color:blueviolet;
  padding-left: 10px;
}

.bottom-left {
  float: left;
  width: 50%;
  // background-color: yellow;
  padding: 20px;
}

.bottom-right {
  float: left;
  width: 50%;
  // background-color:blue;
  padding: 20px;
}
</style>




