<template>
  <div class="login">
    <div class="wrap">
      <div class="title">后台管理系统</div>
      <div class="forms">
        <div>
          <el-input v-model="user" placeholder="请输入账号"></el-input>
        </div>
        <div>
          <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
        </div>
        <div><button type="button" @click="subfrom">登录</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        user: '',
        password: ''
      }
    },
    methods: {
      subfrom() {
        this.$ajax.post('/user/login', qs.stringify({
          username: this.user,
          password: this.password
        })).then(res => {
          if(res.data.code == 0) {
            localStorage.setItem('qs', res.data.data.role)
            localStorage.setItem('username', res.data.data.username)
            this.$router.replace('/index')
          } else {
            this.$notify.error({
              message: '账号或密码错误'
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    height: 100%;
    width: 100%;
    position: fixed;
    background: rgba(56, 157, 170, .82)
  }
  
  .wrap {
    width: 380px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -190px;
    margin-top: -240px;
  }
  
  .title {
    color: #fff;
    font-size: 33px;
    margin: 20px;
  }
  
  .forms {
    padding: 40px;
    background: #fff;
    border-radius: 5px;
  }
  
  .forms div {
    margin-bottom: 12px;
  }
  
  .forms button {
    width: 100%;
    background: #00d1b2;
    color: #fff;
    border: none;
    height: 40px;
    font-size: 15px;
    cursor: pointer;
    line-height: 40px;
  }
</style>