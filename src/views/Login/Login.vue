<template>
  <div>
    <div class="page-top">
      <el-button>导入人员</el-button>
      <el-button>生成合同</el-button>
      <el-button type="button" @click="CaptureShow">拍照</el-button>
      <el-button>保存</el-button>
    </div>

    <div class="page-left">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="95"></el-table-column>
        <el-table-column prop="name" label="姓名" width="70"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>

    <!-- <div class="img-box">
      <img src="../../../dist/img/zlb.jpg" />
    </div>-->
    <!-- 
    <div style="display:none">
      <object
        id="CamSDKOCX"
        classid="clsid:33AE0D31-48C2-4D5F-8FD8-8690B97D5435"
        codebase="./CamSDKOCX.ocx"
        width="0"
        height="0"
        ref="CamSDKOCX"
      ></object>
    </div>-->
  </div>
</template>


<script>
import { domAppend } from "@/utils/load_ocx.js"; //我的动态创建元素的方法放于的文件夹
import {
  Capture,
  InitCamOCX,
  UnInitCamOCX,
  CaptureShow
} from "@/utils/index.js";

export default {
  name: "login",

  data() {
    return {
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
    capture() {
      Capture();
    },
    CaptureShow(obj) {
      CaptureShow(obj);
    }
  },
  created() {
  
  },
  mounted() {
  let obj = document.getElementsByTagName("OBJECT");
    let flag = false;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].getAttribute("id") == "CamSDKOCX") return (flag = true);
    }
    if (!flag) {
      let body = document.getElementsByTagName("body")[0];o0
      domAppend(body, "CamSDKOCX");
    }

    InitCamOCX();
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
  width: 800;
}
.img-box {
  width: 200px;
  height: 350px;
  background-color: green;
  position: absolute;
  top: 1;
  bottom: 0;
  right: 0;
  // left: 0;
  // margin: auto;
}
</style>

