<template>
  <div id="login-container">
    <div class="login-form">
      <h1>登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.number="ruleForm.username"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model.number="ruleForm.phone"
            placeholder="输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="goRegister" class="register">注册账号</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from "@/network/profile.js";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        password: "",
        username: "",
        phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { type: "number", message: "手机格式输入有误" },
        ],
      },
    };
  },
  methods: {
    // 提交功能
    submitForm(formName) {
      if (!this.checkPhone()) {
        this.ruleForm.phone = "";
        this.$message.error("手机格式不正确");
      }
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          alert("登录失败");
          return false;
        } else {
          getLogin(
            this.ruleForm.phone,
            this.ruleForm.username,
            this.ruleForm.password
          ).then((res) => {
            this.dealLogin(res);
          });
        }
      });
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 验证手机号功能
    checkPhone() {
      const rg = /^1[0-9]{10}$/;
      if (this.ruleForm.phone && rg.test(this.ruleForm.phone)) return true;
      else false;
    },
    // 前往注册页面
    goRegister() {
      this.$router.push("/register");
    },
    //处理登录
    dealLogin(res) {
      const { err_code } = res.data;
      switch (err_code) {
        case 1:
          this.$message.error("用户名、手机号或密码错误");
          this.ruleForm.username = "";
          this.ruleForm.phone = "";
          this.ruleForm.password = "";
          break;
        default:
          alert("登录成功");
          // 保存到本地sessionStoraget
          window.sessionStorage.setItem(
            "userInfo",
            JSON.stringify(this.ruleForm)
          );
          this.$store.commit("setInfo");
          this.$router.push("/container");
          console.log(res);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#login-container {
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/img/login.png");
  background-size: 1535px;
  .login-form {
    display: flex;
    flex-direction: column;
    width: 33.333333rem;
    height: 28rem;
    justify-content: center;
    background-color: rgba(66, 34, 59, 0.315);
    border: 0.066667rem solid rgba(0, 0, 0, 0.068);
    border-radius: 1rem;
    color: rgb(251, 214, 35);
    h1 {
      text-align: center;
      margin-bottom: 3rem;
    }
    // 更改框架element里一些样式
    .el-form {
      width: 30rem;
    }
    .el-form-item {
      position: relative;
      /deep/ .el-form-item__label {
        color: rgb(251, 214, 35);
        font-weight: 800;
      }
      /deep/ .el-button--primary {
        position: absolute;
        width: 6rem;
        height: 3rem;
        right: 54%;
        transform: translate(50%);
        background-image: linear-gradient(
          38deg,
          rgb(220, 208, 141) 0%,
          rgb(141, 117, 36) 50%,
          rgb(220, 208, 141) 100%
        );
      }
      /deep/ .el-button--default {
        padding: 0.3rem;
        border: 0.066667rem solid rgba(255, 255, 255, 0);
        border-radius: 1rem;
      }
      .register {
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>