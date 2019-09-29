<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import Login from "@/api/login";
export default {
  name: "Login",

  data() {
    return {
      form: {
        username: localStorage.getItem("glyNo")
          ? localStorage.getItem("glyNo")
          : "", //13188884545,
        password: localStorage.getItem("glyPass")
          ? localStorage.getItem("glyPass")
          : ""
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [{ required: true, message: "账号不可为空", trigger: "blur" }]
        // password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    };
  },
  methods: {
    onSubmit(formName) {
      let self = this;
      let params = {
        glyNo: this.form.username,
        glyPass: this.form.password
      };
      Login.login(params)
        .then(res => {
          // console.log("res:",res)

          if (res.data.code == 600) {
            let projectBh = res.data.data.projectBh;
            let projectName = res.data.data.projectName;
            let glyName = res.data.data.glyName;
            localStorage.setItem("projectBh", projectBh); // 项目编号
            localStorage.setItem("projectName", projectName); //项目名称
            localStorage.setItem("glyName", glyName); //管理员名称
            self.$router.push("/Main");
          } else {
            // self.dialogVisible = true;
            alert(res.data.msg);
            return false;
          }
        })
        .catch(err => {
          alert("出错了！！！！" + err);
          // self.dialogVisible = true;
          return false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>