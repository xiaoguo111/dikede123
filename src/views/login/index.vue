<template>
  <div class="imgmain">
    <div class="main">
      <img
        class="logo1"
        src="http://likede2-admin.itheima.net/img/logo.595745bd.png"
        alt=""
      />
      <div class="banner">
        <el-form
          class="login-form"
          ref="loginForm"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <el-form-item prop="mobile">
            <i class="svg-container el-icon-mobile"></i
            ><el-input v-model="loginForm.mobile" ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="svg-container el-icon-lock"></i>
            <el-input v-model="loginForm.password" ></el-input>
          </el-form-item>
          <el-form-item prop="verifiCation">
            <i class="svg-container el-icon-house"></i>
            <el-input
              v-model="loginForm.verifiCation"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
        </el-form>
        <i class="svg-container el-icon-view"></i>
        <div class="verification" @click="onclick">
          <img class="yzm" :src="$store.state.user.verifiCation" />
        </div>
        <el-button type="primary" @click="login" >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        mobile: "admin",
        password: "admin",
        verifiCation: "",
      },
      loginFormRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // {
          //   pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          //   message: "手机号格式不正确",
          //   trigger: "blur",
          // },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {
          //   pattern:
          //     /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
          //   message: "密码不正确",
          //   trigger: "blur",
          // },
        ],
        verifiCation: [
          { required: true, message: "请输验证码", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.$store.dispatch("user/getcheck");
  },

  methods: {
    onclick() {
      this.$store.dispatch("user/getcheck");
    },
    async login() {
      //  console.log(11);
      try {
        await this.$refs.loginForm.validate();
        this.$store.dispatch("user/getloginApi", {
          loginName: this.loginForm.mobile,
          password: this.loginForm.password,
          code: this.loginForm.verifiCation,
          clientToken: this.$store.state.user.code,
          loginType: 0,
          
        });
        this.$message({
          message:'登录成功'
        })
      } catch (error) {
        this.$message.error("登陆失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.imgmain {
  box-sizing: border-box;
  padding-top: 200px;
  height: 810px;
  width: 100%;
  background: url(http://likede2-admin.itheima.net/img/background.be4fae7d.png);
  background-position: center;
  // background-color: red;
  .main {
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    padding-left: 35px;
    padding-top: 70px;
    padding-bottom: 20px;
    position: relative;
    height: 388px;
    width: 518px;
    background-color: #fff;
    margin: 0 auto;
    //  line-height: 810px;
    .logo1 {
      position: absolute;
      top: -50px;
      left: 210px;
      width: 98px;
      height: 98px;
      // background-color: blue;
      border-radius: 50%;
    }
    .banner {
      // overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 448px;
      height: 280px;
      // background-color: green;
    }
  }
}
.hezi1 {
  width: 100px;
  height: 100px;
  background-color: red;
}
.svg-container {
  position: absolute;
  top: 18px;
  left: 10px;
  z-index: 99;
  font-size: 17px;
  color: #b8bbbd;
}
/deep/ .el-input__inner {
  padding: 0 35px;
  height: 52px;
  color: #9a9b9c;
}
.el-button--primary {
  background-color: #6b7cef;
  border-radius: 10px;
  height: 51px;
}
.verification {
  position: absolute;
  width: 130px;
  height: 51px;
  top: 219px;
  left: 352px;
  // background-color: red;
  border: 1.5px solid #1e9104;
}
.el-icon-view {
  position: absolute;
  top: 164px;
  left: 455px;
}
.verification .yzm {
  width: 100%;
  height: 100%;
}
</style>
