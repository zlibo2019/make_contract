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
        <el-button>导入人员</el-button>
        <el-button type="button" @click="makeContract()">生成合同</el-button>
        <el-button type="button" @click="CaptureBase64()">拍照</el-button>
        <el-button>保存</el-button>
      </div>

      <div class="page-left">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="95"></el-table-column>
          <el-table-column prop="name" label="姓名" width="70"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="all-page-middle">
      <div class="rz-picter">
        <img :src="avatar1" class="img-avatar" />
      </div>

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

      <div class="rz-picter">
        <img :src="avatar2" class="img-avatar" />
      </div>

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

    <div class="all-page-right">
      <div class="page-right"></div>
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
      avatar1: require("../../../static/img/1.jpg"),
      avatar2: require("../../../static/img/2.jpg"),
      avatar1Used: false,
      device: "",
      arrDevice: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "张三",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "李四",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王五",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "马六",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "刘虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "刘德华",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "刘海霞",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "张曼玉",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
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

    getDocx(params){
      return commonAxios("post", `http://127.0.0.1:7002/a`, params);
    },

    makeContract() {
      let self = this;
      // let base64 = fs.readFileSync("c://a.jpg");
      if (this.avatar1.length < 200 || this.avatar2.length < 200) {
        alert("请选择身份证照片");
        return;
      }
      let params = { base64_1: this.avatar1, base64_2: this.avatar2 };

      this.getDocx(params).then(res => {
console.log(JSON.stringify(res));

        if (res.data.code == 600) {
          console.log("res................" + JSON.stringify(res.data.data));

          //这里res.data是返回的blob对象
          var blob = new Blob([res.data.data.data], {
            type:
              "application;charset=utf-8"
          }); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "b.docx"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        } else {
        }
      });
      console.log('aaaaaaaaaaaaaaaa');
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
        // var obj = document.getElementById("device");
        // // console.log("aaaaaaaaaaaaaaaaaaaa" + JSON.stringify(obj));
        // var index = obj.selectedIndex;
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
      let list = document.getElementsByClassName("all-page-right");
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
.page-top {
  width: 100%;
}
.page-left {
  width: 300px;
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
  width: 500px;
  height: 250px;
  position: absolute;
}

.rz-picter {
  width: 300px;
  // height: 200px;
  // margin: 0.3rem auto;
  // border: 0.01rem solid #ededed;
  // // display: flex;
  // // flex-direction: column;
  // align-items: center;
  // // justify-content: center;
  // background-color: #f1f1f1;
  // position: absolute;

  // background-color: #aaa;
  width: 100%;
  // height: 300px;
  padding: 20px;
}

.uppic {
  width: 500px;
  // height: 80px;
  // margin: 0 auto;
  // // opacity: 0;
  // // z-index: 99999;
  // position: absolute;
  // padding: 80px;
  background-color: burlywood;
  margin-top: 250px;
  margin-right: 40px;
}

.all-page-left {
  float: left;
  width: 33%;
  // background-color: red;
  padding-right: 20px;
}

.all-page-middle {
  float: left;
  width: 33%;
  // background-color: yellow;
  padding: 20px;
}

.all-page-right {
  float: right;
  width: 34%;
  // background-color: green;
  padding-left: 20px;
}
</style>




