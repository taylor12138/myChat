<template>
  <div id="register-container">
    <div class="register-form">
      <h1>注册</h1>
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="再次输入"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="goLogin" class="login">去登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getRegister } from "@/network/profile.js";
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        password: "",
        checkPass: "",
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
        checkPass: [{ required: true, message: "请确认密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交功能
    submitForm(formName) {
      if (this.ruleForm.password !== this.ruleForm.checkPass) {
        this.ruleForm.password = "";
        this.ruleForm.checkPass = "";
        return this.$message.error("密码输入不一致!");
      }
      if (!this.checkPhone()) {
        this.ruleForm.phone = "";
        this.$message.error("手机格式不正确");
      }
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          alert("注册失败");
          return false;
        } else {
          getRegister(
            this.ruleForm.phone,
            this.ruleForm.username,
            this.ruleForm.password
          ).then((res) => {
            this.dealRegister(res);
          });
        }
      });
    },
    // 处理返回的信息
    dealRegister(res) {
      if (res.status === 500)
        return this.$message.error("当前网络不稳定，请稍后重试");
      const { err_code } = res.data;
      switch (err_code) {
        case 1:
        case 3:
          this.$message.error("当前用户名或手机号已注册");
          this.ruleForm.username = "";
          this.ruleForm.phone = "";
          this.ruleForm.password = "";
          this.ruleForm.checkPass = "";
          break;
        default:
          alert("注册成功");
          window.sessionStorage.setItem(
            "userInfo",
            JSON.stringify(this.ruleForm)
          );
          this.$store.commit("setInfo");
          this.$router.push("/container");
          console.log(res);
      }
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 验证手机号功能
    checkPhone() {
      const rg = /^1[0-9]{10}$/;
      console.log(rg.test(this.ruleForm.phone));
      if (this.ruleForm.phone && rg.test(this.ruleForm.phone)) return true;
      else false;
    },
    // 跳转登陆界面
    goLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
#register-container {
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/img/register.jpg") -7.933333rem -11.933333rem;
  .register-form {
    display: flex;
    flex-direction: column;
    width: 33.333333rem;
    height: 28rem;
    justify-content: center;
    background-color: rgba(85, 186, 204, 0.459);
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
          rgb(145, 121, 121) 0%,
          rgb(86, 86, 81) 25%,
          rgb(122, 94, 14) 50%,
          rgb(3, 115, 105) 75%,
          rgb(94, 55, 34) 100%
        );
      }
      /deep/ .el-button--default {
        padding: 0.3rem;
        border: 0.066667rem solid rgba(255, 255, 255, 0);
        border-radius: 1rem;
      }
      .login {
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>