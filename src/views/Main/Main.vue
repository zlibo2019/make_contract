<template>
  <div>
    <div>
      <el-dialog title="图片展示" :visible.sync="dialogShowPhotoVisible" width="30%" top="10px">
        <!-- <span class="delete" @click="showFiguredelete(index)">×</span> -->
        <!-- <el-image v-for="url in urls" :key="url" :src="url" fit="fill"></!-->

        <el-table :data="tableDataImage" border style="width: 100%">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="image" label="图片" width="300">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                title
                trigger="hover"
                style="width: 100px; height: 100px"
              >
                <img :src="scope.row.image" />
                <img
                  slot="reference"
                  :src="scope.row.image"
                  :alt="scope.row.image"
                  style="max-height: 100px;max-width: 100px"
                />
              </el-popover>
              <!-- <el-image style="width: 100px; height: 100px" :src="scope.row.image"></el-image> -->
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="deletePhotoClick(scope.$index,scope.row)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogShowPhotoVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogShowPhotoVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogUploadContractListTemplateVisible"
        width="30%"
        top="10px"
      >
        <span>
          <el-upload
            class="inline-block"
            :action="uploadContractListTemplate()"
            :data="uploadData"
            accept=".xlsx"
            :limit="1"
          >
            <el-button type="success">点击上传</el-button>
          </el-upload>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUploadContractListTemplateVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogUploadContractListTemplateVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogUploadContractTemplateVisible"
        width="30%"
        top="10px"
      >
        <el-upload
          class="inline-block"
          :action="uploadContractTemplate()"
          :data="uploadData"
          accept=".docx"
          :limit="1"
        >
          <el-button type="success">点击上传</el-button>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUploadContractTemplateVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogUploadContractTemplateVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="all-page-left" style="width: 5%; padding-left: 10px;">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
        :collapse="true"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title">个性化设置</span> -->

            <el-submenu index="1-1">
              <span slot="title">合同列表导入模板</span>
              <el-menu-item index="1-1-1">当前模板下载</el-menu-item>
              <el-menu-item index="1-1-2">新模板上传</el-menu-item>
            </el-submenu>

            <el-submenu index="1-2">
              <span slot="title">合同模板</span>
              <el-menu-item index="1-2-1">当前模板下载</el-menu-item>
              <el-menu-item index="1-2-2">新模板上传</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">功能</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">筛选</span>
        </el-menu-item>-->
      </el-menu>
    </div>

    <div class="all-page-left">
      <el-container>
        <el-header style="text-align: left; font-size: 12px; height:20px; margin-top:10px">
          <div>
            <span>管理员</span>
            <el-input v-model="inputAccount" style="width:150px;" :disabled="true" size="mini"></el-input>
            <span>项目名称</span>
            <el-input v-model="inputProjectName" style="width:150px" :disabled="true" size="mini"></el-input>
            <el-button
              @click="exitClick"
              slot="trigger"
              size="mini"
              type="info"
              plain
              style="width:80px"
            >退出</el-button>
          </div>
        </el-header>

        <el-main style="padding-top: 5px; padding-right: 20px;">
          <div>
            <el-input
              v-model="inputCondition"
              style="width:410px;height:31px;padding-top: 19px;"
              size="mini"
            ></el-input>
            <el-button
              slot="trigger"
              type="success"
              size="mini"
              style="margin-top:20px;"
              @click="queryContractListClick"
            >查询</el-button>
          </div>
          <div class="page-top">
            <el-button
              class="inline-block2"
              slot="trigger"
              type="primary"
              style="width: 115px"
              @click="downContractListTemplateClick"
            >档案模板下载</el-button>
            <el-upload
              class="inline-block2"
              :action="uploadContractList()"
              :data="uploadData"
              accept=".xlsx"
              :limit="1"
            >
              <el-button type="primary">档案合同上传</el-button>
            </el-upload>

            <el-button
              class="inline-block2"
              slot="trigger"
              type="primary"
              @click="bulkMakeContractClick()"
            >导出合同文本</el-button>
            <el-button
              class="inline-block2"
              slot="trigger"
              type="primary"
              @click="bulkGetContractPhotoClick()"
            >导出合同照片</el-button>
          </div>

          <div class="page-top">
            <el-table
              @selection-change="changeBox"
              height="500"
              border
              :data="tableData"
              style="width: 100%"
              :row-style="tableRowStyle"
              :header-cell-style="tableHeaderColor"
            >
              <el-table-column type="selection" width="30"></el-table-column>
              <el-table-column
                type="index"
                label="序号"
                header-align="center"
                align="center"
                width="55"
              ></el-table-column>

              <!-- <el-table-column prop="contractNo" label="合同编号" width="85"></el-table-column> -->
              <el-table-column prop="userId" label="身份证" width="180"></el-table-column>
              <el-table-column prop="userName" label="姓名" width="100"></el-table-column>
              <el-table-column label="查看图片">
                <template slot-scope="scope">
                  <el-button @click="showSfzClick(scope.row)" type="text" size="small">身份证</el-button>
                  <el-button @click="showContractClick(scope.row)" type="text" size="small">合同</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </div>

    <div class="all-page-midle">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="all-page-middle">
          <el-tab-pane name="first" label="拍身份证">
            <div class="bottom-left">
              <img :src="avatar1" class="img-avatar" fit="none" />
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
              <img :src="avatar2" class="img-avatar" style="margin-top: 40px;" fit="scale-down" />
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
              <div>
                <el-button
                  type="success"
                  style="margin-top:20px;margin-left:150px;"
                  @click="saveClick"
                >保存照片</el-button>
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
              <div>
                <el-button
                  type="success"
                  style="margin-top:20px;margin-left:150px;"
                  @click="saveClick"
                >保存照片</el-button>
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
import {
  commonAxios,
  deleteAxios,
  putAxios,
  fileAxios
} from "../../utils/axios.js";
import Base from "@/api/base";
import { Promise, resolve, reject } from "q";
import Login from "@/api/login";

var CO = require("co");
export default {
  name: "Main",
  data() {
    return {
      tableDataImage: [
        {
          image:
            "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg"
        }
      ],
      dialogType: 1, // 1身份证2合同照片
      uploadContractListTemplateData: { aa: "11" },
      urls: [],
      dialogShowPhotoVisible: false,
      dialogUploadContractListTemplateVisible: false,
      dialogUploadContractTemplateVisible: false,
      inputAccount: "",
      inputProjectName: "",
      inputCondition: "",
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
      fileList: [],
      uploadData: {
        projectBh: localStorage.getItem("projectBh")
      }
    };
  },
  methods: {
    deletePhotoClick(index, row) {
      let self = this;
      let params = { filePath: row.image };
      this.removeFile(params).then(res => {
        if (res.data.code == 600) {
          this.tableDataImage.splice(index, 1);
          alert("删除成功");
        } else {
          alert("删除失败:" + res.data.msg);
        }
      });
    },
    handleSelect(key, keyPath) {
      if (key === "1-1-1") {
        this.downContractListTemplateClick();
      } else if (key === "1-2-1") {
        this.downContractTemplateClick();
      } else if (key === "1-1-2") {
        this.dialogUploadContractListTemplateVisible = true;
      } else if (key === "1-2-2") {
        this.dialogUploadContractTemplateVisible = true;
      }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    downClick() {
      let userId = this.checkBoxData[0].userId;
      if (this.dialogType === 1) {
        let url1 = `${Base.server}/public/photo/${userId}/sfz1.jpg`;
        let url2 = `${Base.server}/public/photo/${userId}/sfz2.jpg`;
        this.downloadFile(url1, "sfz1.jpg");
        // this.downloadFile(url2, "sfz2.jpg");
      } else {
      }
    },
    uploadContractListTemplate() {
      return `${Base.server}/saveContractListTemplate`;
    },
    uploadContractTemplate() {
      return `${Base.server}/saveContractTemplate`;
    },
    uploadContractList() {
      return `${Base.server}/saveContractList`;
    },
    beforeUploadContractListTemplateData(file) {
      //  let self = this;
      //   // this.fileName = options.file.name;
      //   // this.id = options.data.id;
      //   let regId = localStorage.getItem("regId"); // 注册公司id
      //   this.getBase64(options.file).then(res => {
      //     let fileData = res.split(",")[1];
      //     let params = { regId: regId, base64_1: fileData };
      //     self
      //       .saveContractListTemplate(params)
      //       .then(res => {
      //         this.$message({
      //           type: "success",
      //           message: "上传成功!"
      //         });
      //         // this.templetManage();
      //       })
      //       .catch(error => {
      //         console.log(error);
      //       });
      //   });
      //   let fd = new FormData()
      // fd.append('base64_1', file);
      // fd.append('regId',regId);
      // // fd.append('id',id)//其他参数
      // let url = `${Base.server}/saveContractListTemplate`;
      // return commonAxios('post',url,fd);
      // let self = this;
      // // this.fileName = options.file.name;
      // // this.id = options.data.id;
      // let regId = localStorage.getItem("regId"); // 注册公司id
      // return new Promise((resolve, reject) => {
      //   this.getBase64(file).then(res => {
      //     if (res) {
      //       let fileData = res.split(",")[1];
      //       let params = { regId: regId, base64_1: fileData };
      //       self.uploadContractListTemplateData = params;
      //       resolve();
      //     } else {
      //       reject();
      //     }
      //   });
      // });
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return "background-color: lightblue;font-weight: 450";
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: darkgray;color: #fff;font-weight: 500;";
      }
    },
    exitClick() {
      localStorage.clear;
      this.$router.push("/");
    },
    showSfzClick(row) {
      let userId = row.userId;
      // this.urls.length = 0;
      this.tableDataImage.length = 0;
      this.showPhoto(userId, null, 1);
    },
    showContractClick(row) {
      let userId = row.userId;
      let projectBh = localStorage.getItem("projectBh");
      // this.urls.length = 0;
      this.tableDataImage.length = 0;
      this.showPhoto(userId, projectBh, 2);
    },
    listContractFileName(projectBh, userId) {
      let params = { projectBh: projectBh, userId: userId };
      return commonAxios(
        "post",
        `${Base.server}/contract/listContractFileName`,
        params
      );
    },
    listSfzFileName(userId) {
      let params = { userId: userId };
      return commonAxios(
        "post",
        `${Base.server}/contract/listSfzFileName`,
        params
      );
    },
    showPhoto(userId, projectBh, type) {
      let self = this;
      // let regId = tableData[0].regId;
      // let userId = this.checkBoxData[0].userId;
      if (type === 1) {
        let url1 = `${Base.server}/public/photo/${userId}/sfz1.jpg`;
        let url2 = `${Base.server}/public/photo/${userId}/sfz2.jpg`;
        // this.urls.push(url1);
        // this.urls.push(url2);
        // this.tableDataImage.push({ image: url1 });
        // this.tableDataImage.push({ image: url2 });
        this.dialogType = 1;
        this.listSfzFileName(userId).then(res => {
          if (res.data.code === 600) {
            let arrName = res.data.data;
            for (let i = 0; i < arrName.length; i++) {
              let curUrl = `${Base.server}/public/photo/${userId}/${arrName[i]}`;
              // self.urls.push(curUrl);
              self.tableDataImage.push({ image: curUrl });
            }
            this.dialogShowPhotoVisible = true;
          }
        });
        this.dialogShowPhotoVisible = true;
      } else {
        // let userId = this.checkBoxData[0].userId;
        // let regId = this.checkBoxData[0].regId;
        this.dialogType = 2;
        this.listContractFileName(projectBh, userId).then(res => {
          if (res.data.code === 600) {
            let arrName = res.data.data;
            for (let i = 0; i < arrName.length; i++) {
              let curUrl = `${Base.server}/public/photo/${userId}/${arrName[i]}`;
              // self.urls.push(curUrl);
              self.tableDataImage.push({ image: curUrl });
            }
            this.dialogShowPhotoVisible = true;
          }
        });
      }
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
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

    beforeFileUploadUpContractList(file) {
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
    // httpRequestUpContractTemplate(options) {
    //   // alert("aaaaaaaaaaaaaaaaa");
    //   let self = this;
    //   // this.fileName = options.file.name;
    //   // this.id = options.data.id;
    //   let projectBh = localStorage.getItem("projectBh"); // 注册公司id
    //   this.getBase64(options.file).then(res => {
    //     let fileData = res.split(",")[1];
    //     let params = { projectBh: projectBh };
    //     self
    //       .saveContractTemplate(params)
    //       .then(res => {
    //         this.$message({
    //           type: "success",
    //           message: "上传成功!"
    //         });
    //         // this.templetManage();
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   });
    // },
    // httpRequestUpContractListTemplate(options) {
    //   // alert("aaaaaaaaaaaaaaaaa");
    //   let self = this;
    //   // this.fileName = options.file.name;
    //   // this.id = options.data.id;
    //   let projectBh = localStorage.getItem("projectBh"); // 注册公司id
    //   this.getBase64(options.file).then(res => {
    //     let fileData = res.split(",")[1];
    //     let params = { projectBh: projectBh, base64_1: fileData };
    //     self
    //       .saveContractListTemplate(params)
    //       .then(res => {
    //         this.$message({
    //           type: "success",
    //           message: "上传成功!"
    //         });
    //         // this.templetManage();
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   });
    // },

    httpRequestUpContractList(options) {
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
    uploadContractListUrl() {
      return `${Base.server}/saveContractList`;
    },
    submitUploadUpContractTemplate() {
      this.$refs.uploadUpContractTemplate.submit();
    },
    submitUploadUpContractListTemplate() {
      this.$refs.uploadUpContractListTemplate.submit();
    },
    submitUploadUpContractList() {
      // alert("aaaaaaaaaaaaaaaaaaaaa");
      this.$refs.uploadUpContractList.submit();
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

    downloadFile(url, fileName) {
      var downloadElement = document.createElement("a");
      downloadElement.href = url;
      downloadElement.download = fileName;
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    },
    //        `${params.server}/public/docx/template/${params.regId}/${params.fileName}`,
    downFile(url) {
      return fileAxios(url);
    },

    downContractListTemplateClick() {
      let self = this;
      let projectBh = localStorage.getItem("projectBh");
      let url = `${Base.server}/public/docx/template/${projectBh}/template_contract_list.xlsx`;
      this.downFile(url)
        .then(res => {
          let blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          let url = window.URL.createObjectURL(blob);
          let fileName = "template_contract_list.xlsx";
          self.downloadFile(url, fileName);
        })
        .catch(error => {
          let url = `${Base.server}/public/docx/template/template_contract_list.xlsx`;
          self.downloadFile(url, "");
        });
    },

    downContractTemplateClick() {
      let self = this;
      let projectBh = localStorage.getItem("projectBh");
      // let fileName = "template_contract.docx";
      // let params = {
      //   regId: regId,
      //   fileName: fileName,
      //   server: Base.server
      // };
      let url = `${Base.server}/public/docx/template/${projectBh}/template_contract.docx`;
      this.downFile(url)
        .then(res => {
          let blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          let url = window.URL.createObjectURL(blob);
          let fileName = "template_contract.docx";
          self.downloadFile(url, fileName);
        })
        .catch(error => {
          let url = `${Base.server}/public/docx/template/template_contract.docx`;
          self.downloadFile(url, "");
        });
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

    bulkMakeContract(params) {
      return commonAxios("post", `${Base.server}/bulkMakeContract`, params);
    },
    bulkMakeContractPhoto(params) {
      return commonAxios(
        "post",
        `${Base.server}/bulkMakeContractPhoto`,
        params
      );
    },
    saveContractList(params) {
      return commonAxios("post", `${Base.server}/saveContractList`, params);
    },
    queryContractList(params) {
      return commonAxios("post", `${Base.server}/queryContractList`, params);
    },
    savePhoto(params) {
      return commonAxios("post", `${Base.server}/savePhoto`, params);
    },
    saveContractTemplate(params) {
      return commonAxios("post", `${Base.server}/saveContractTemplate`, params);
    },
    removeFile(params) {
      return commonAxios("post", `${Base.server}/removeFile`, params);
    },

    saveContractListTemplate(params) {
      return commonAxios(
        "post",
        `${Base.server}/saveContractListTemplate`,
        params
      );
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
          let arrContractList = new Array();
          for (let i = 0; i < arrData.length; i++) {
            let curContractList = arrData[i];
            let ContractList = {};

            for (let j = 0; j < arrField.length; j++) {
              let curTableField = arrField[j].数据库字段名.replace(
                /^\s*|\s*$/g,
                ""
              ); // 去除两边空格
              let curXlsxField = arrField[j].合同导入字段名.replace(
                /^\s*|\s*$/g,
                ""
              ); // 去除两边空格
              ContractList[curTableField] = curContractList[curXlsxField];
            }
            arrContractList.push(ContractList);
          }

          let projectBh = localStorage.getItem("projectBh");
          let params = { regprojectBhId: projectBh, arrData: arrContractList };
          _this.saveContractList(params).then(res => {
            console.log(JSON.stringify(res));
            if (res.data.code == 600) {
              _this.tableData = arrContractList;
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

    queryContractListClick() {
      let self = this;
      let projectBh = localStorage.getItem("projectBh");
      let fuzzyCondition = this.inputCondition; // 模糊查询
      let params = { projectBh: projectBh, fuzzyCondition: fuzzyCondition };
      this.queryContractList(params).then(res => {
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
      if (self.checkBoxData.length > 1) {
        alert("只能选择一个人");
        return;
      }

      let base64_1, base64_2, base64_3;
      if (this.activeName === "first") {
        base64_1 = this.avatar1;
        base64_2 = this.avatar2;
        if (base64_1.length < 100 || base64_2.length < 100) {
          alert("请拍照或导入照片");
          return;
        }
        base64_3 = null;
      } else {
        base64_1 = null;
        base64_2 = null;
        base64_3 = this.avatar3;
        if (base64_3.length < 100) {
          alert("请拍照或导入照片");
          return;
        }
      }
      let params = {
        projectBh: localStorage.getItem("projectBh"),
        userId: this.checkBoxData[0].userId,
        contractNo: this.checkBoxData[0].contractNo,
        base64_1: base64_1,
        base64_2: base64_2,
        base64_3: base64_3
      };
      // alert(this.checkBoxData[0].ContractListId);
      console.log(JSON.stringify(this.tableData));

      // alert(JSON.stringify(params));

      this.savePhoto(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.data.code == 600) {
          alert("保存成功");
        } else {
          alert("保存失败");
        }
      });
    },

    bulkMakeContractClick() {
      let self = this;
      // for (let i = 0; i < self.checkBoxData.length; i++) {
      // let curContract = self.checkBoxData[i];
      // let params = curContract;
      if (self.checkBoxData.length === 0) {
        alert("请至少选择一行!");
        return;
      }
      self.bulkMakeContract(self.checkBoxData).then(res => {
        if (res.data.code == 600) {
          let filePath = res.data.data;
          self.downloadFile(filePath, "");
        } else {
          alert("照片不存在!");
        }
      });
      // }
    },

    bulkGetContractPhotoClick() {
      let self = this;
      if (self.checkBoxData.length === 0) {
        alert("请至少选择一行!");
        return;
      }
      self.bulkMakeContractPhoto(self.checkBoxData).then(res => {
        if (res.data.code == 600) {
          let filePath = res.data.data;
          self.downloadFile(filePath, "");
        } else {
          alert("照片不存在!");
        }
      });
      // }
    },

    // downloadFile(url) {
    //   const iframe = document.createElement("iframe");
    //   iframe.style.display = "none"; // 防止影响页面
    //   iframe.style.height = 0; // 防止影响页面
    //   iframe.src = url;
    //   document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
    //   // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
    //   setTimeout(() => {
    //     iframe.remove();
    //   }, 10 * 1000);
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
  beforeRouteEnter(to, from, next) {
    let self = this;
    next(vm => {
      if (undefined === to.params.glyNo || null === to.params.glyPass) {
        return;
      }
      let params = {
        glyNo: to.params.glyNo,
        glyPass: to.params.glyPass
      };
      Login.login(params)
        .then(res => {
          if (res.data.code == 600) {
            let projectBh = res.data.data.projectBh;
            let projectName = res.data.data.projectName;
            let glyName = res.data.data.glyName;
            localStorage.setItem("projectBh", projectBh); //
            localStorage.setItem("projectName", projectName); //
            localStorage.setItem("glyName", glyName); //
            vm.$router.push("/Main");
          } else {
            vm.$router.push("/");
          }
        })
        .catch(err => {
          alert("出错了！！！！" + err);
        });
    });
  },

  created() {
    // let params = this.$route.params;
    // if (undefined !== params.glyNo) {
    //   Login.login(params)
    //     .then(res => {
    //       if (res.data.code == 600) {
    //         let projectBh = res.data.data.projectBh;
    //         let projectName = res.data.data.projectName;
    //         let glyName = res.data.data.glyName;
    //         localStorage.setItem("projectBh", projectBh); //
    //         localStorage.setItem("projectName", projectName); //
    //         localStorage.setItem("glyName", glyName); //
    //       } else {
    //         vm.$router.push("/");
    //       }
    //     })
    //     .catch(err => {
    //       alert("出错了！！！！" + err);
    //     });
    // }

    let glyName = localStorage.getItem("glyName");
    if (undefined === glyName || null === glyName) {
      this.$router.push("/");
    }

    this.inputAccount = glyName;
    this.inputProjectName = localStorage.getItem("projectName");
  },
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
  background-color: darkgray;
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
  padding-left: 1px;
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

.inline-block {
  display: inline-block;
  width: 118px;
  margin-top: 10px;
  margin-left: 6px;
}
.inline-block2 {
  display: inline-block;
  width: 120px;
  // margin-top: 10px;
  margin-left: 3px;
}

// .delete {
//   width: 20px;
//   height: 20px;
//   position: absolute;
//   top: -30px;
//   font-size: 18px;
//   color: red;
//   right: -10px;
//   cursor: pointer;
// }
</style>




