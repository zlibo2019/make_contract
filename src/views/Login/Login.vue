<template>
  <div>
    <div class="all-page-left">
      <div class="page-top">
        <el-select
          v-model="device"
          placeholder="请选择设备"
          size="medium"
          style="width:270px;"
          @change="ChangeDevice"
        >
          <el-option v-for="item in arrDevice" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="page-top">
        <el-button @click="downTemplateClick()">下载模板</el-button>
      </div>

      <div class="page-top">
        <input
          id="upload"
          type="file"
          @change="importXlsx(this)"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>

      <div class="page-top">
        <el-button type="button" @click="bulkMakeContract()">生成合同</el-button>
        <el-button type="button" @click="saveClick">保存</el-button>
        <el-button type="button" @click="queryUserClick">查询</el-button>
        <el-button type="button" @click="CaptureBase64()">拍照</el-button>
      </div>

      <div class="page-left">
        <el-table @selection-change="changeBox" :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="user_id" label="身份证" width="95"></el-table-column>
          <el-table-column prop="user_name" label="姓名" width="70"></el-table-column>
          <el-table-column prop="user_address" label="地址" width="150"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="all-page-right-top"></div>
    <div class="all-page-right-bottom">
      <div class="bottom-left">
        <img :src="avatar1" class="img-avatar" />
        <div>
          <input
            type="file"
            name="avatar"
            id="uppic"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            @change="changeImage1($event)"
            ref="avatarInput"
            class="uppic"
          />
        </div>
        <img :src="avatar2" class="img-avatar" />
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

      <div class="bottom-right">
        <img :src="avatar3" class="img-avatar" style="height: 450px; width: 350px" />

        <div>
          <input
            type="file"
            name="avatar"
            id="uppic"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            @change="changeImage3($event)"
            ref="avatarInput"
            class="uppic"
            style="margin-top:465px"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { domAppend } from "@/utils/load_ocx.js"; //我的动态创建元素的方法放于的文件夹
import { commonAxios, deleteAxios, putAxios } from "../../utils/axios.js";
export default {
  name: "login",
  data() {
    return {
      checkBoxData: [], //多选框选择的值
      avatar1: require("../../../static/img/1.jpg"),
      avatar2: require("../../../static/img/1.jpg"),
      avatar3: require("../../../static/img/1.jpg"),
      avatar1Used: false,
      device: "",
      arrDevice: [],
      tableData: [
        // {
        //   user_id: "3521201254255212508",
        //   user_name: "张三",
        //   user_address: "上海市普陀区金沙江路 1518 弄"
        // }
      ]
    };
  },
  methods: {
    changeBox(val) {
      this.checkBoxData = val;
    },

    downTemplateClick() {
      var downloadElement = document.createElement("a");
      downloadElement.href =
        "http://10.1.0.16:7001/public/docx/template_user.xlsx";
      // downloadElement.download = "b.docx"; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
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

      console.log("file" + file);
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      console.log(JSON.stringify(reader));
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
      return commonAxios("post", `http://127.0.0.1:7001/makeDocx`, params);
    },
    upXlsxData(params) {
      return commonAxios("post", `http://127.0.0.1:7001/upXlsxData`, params);
    },
    queryUser(params) {
      return commonAxios("post", `http://127.0.0.1:7001/queryUser`, params);
    },
    saveUserPhoto(params) {
      return commonAxios("post", `http://127.0.0.1:7001/saveUserPhoto`, params);
    },

    importXlsx(obj) {
      let _this = this;
      let inputDOM = this.$refs.avatarInput;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
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
          let arrData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          let arrUser = new Array();
          for (let i = 0; i < arrData.length; i++) {
            let curUser = arrData[i];
            let user = {
              user_id: curUser.身份证,
              user_name: curUser.姓名,
              user_address: curUser.地址
            };
            arrUser.push(user);
          }
          let params = { arrData: arrUser };
          _this.upXlsxData(params).then(res => {
            console.log(JSON.stringify(res));
            _this.tableData = arrUser;
            if (res.data.code == 600) {
              alert("导入成功");
            } else {
            }
          });
          // _this.$message({
          //   message: "请耐心等待导入成功",
          //   type: "success"
          // });
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
      let params = {
        user_id: this.tableData[0].user_id,
        base64_1: this.avatar1,
        base64_2: this.avatar2,
        base64_3: this.avatar3
      };
      this.saveUserPhoto(params).then(res => {
        console.log(JSON.stringify(res));
        if (res.data.code == 600) {
        } else {
        }
      });
    },

    bulkMakeContract() {
      for (let i = 0; i < this.checkBoxData.length; i++) {
        let user = this.checkBoxData[i];
        let userId = user.user_id;
        this.makeContract(userId);
      }
    },

    makeContract(userId) {
      let self = this;

      // let base64 = fs.readFileSync("c://a.jpg");
      // if (this.avatar1.length < 200 || this.avatar2.length < 200) {
      //   alert("请选择身份证照片");
      //   return;
      // }
      let params = {userId:userId};

      this.makeDocx(params).then(res => {
        console.log(JSON.stringify(res));

        if (res.data.code == 600) {
          let filePath = res.data.data;
          var downloadElement = document.createElement("a");
          downloadElement.href = filePath;
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        } else {
        }
      });
      console.log("aaaaaaaaaaaaaaaa");
    },

    showImageBase64(strBase64) {
      let zp = "data:image/jpeg;base64," + strBase64;
      if (this.avatar1Used) {
        this.avatar2 = zp;
        // document.getElementById("avatarId2").src = zp;
        this.avatar1Used = false;
      } else {
        this.avatar1 = zp;
        // document.getElementById("avatarId1").src = zp;
        this.avatar1Used = true;
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
      // this.ChangeDevice(0);
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
        if (mainDevCount > 0) {
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
      let list = document.getElementsByClassName("all-page-right-top");
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
}
.page-left {
  width: 600px;
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

.img-avatar {
  width: 380px;
  height: 250px;
  position: absolute;
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
  margin-top: 250px;
  margin-right: 40px;
}

.all-page-left {
  float: left;
  width: 30%;
  // background-color: red;
  padding-right: 20px;
}
.all-page-right-top {
  float: right;
  width: 70%;
  height: 10%;
  // background-color: green;
  padding-left: 20px;
}
.all-page-right-bottom {
  float: right;
  width: 70%;
  // background-color:blueviolet;
  padding-left: 20px;
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




