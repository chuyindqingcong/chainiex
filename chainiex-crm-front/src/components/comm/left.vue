<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :unique-opened=true>
        <router-link to="/index">
          <el-menu-item index="1">首页</el-menu-item>
        </router-link>
        <el-submenu index="2" v-if="qs>0">
          <template slot="title">系统管理</template>
           <router-link to="/config">
            <el-menu-item index="2-1">配置</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3" v-if="qs>0">
          <template slot="title">公告</template>
          <router-link to="/addnotice">
            <el-menu-item index="3-1">添加公告</el-menu-item>
          </router-link>
          <router-link to="/nocicelist">
            <el-menu-item index="3-2">公告列表</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">员工</template>
          <router-link to="/adduser">
            <el-menu-item index="4-1" v-if='qs>2'>新增员工</el-menu-item>
          </router-link>
          <router-link to="/userlist">
            <el-menu-item index="4-2" v-if='qs>1'>员工列表</el-menu-item>
          </router-link>
          <router-link to="/revise">
            <el-menu-item index="4-3" v-if='qs>0'>修改密码</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="5" v-if="qs>1">
          <template slot="title">币种</template>
          <router-link to="/addcoin">
            <el-menu-item index="5-1">新增币种</el-menu-item>
          </router-link>
          <router-link to="/coinlist">
            <el-menu-item index="5-2">币种列表</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="6" v-if="qs>1">
          <template slot="title">用户管理</template>
          <router-link to="/caselist">
            <el-menu-item index="6-1">工单列表</el-menu-item>
          </router-link>
          <router-link to="/idcardlist">
            <el-menu-item index="6-2">身份证列表</el-menu-item>
          </router-link>
           <router-link to="/user">
            <el-menu-item index="6-3">用户列表</el-menu-item>
          </router-link>
          <router-link to="/show">
            <el-menu-item index="6-4">提现申请</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="7" v-if="qs>1">
          <template slot="title">资讯/走向</template>
          <router-link to="/newAdd">
            <el-menu-item index="7-1">新增</el-menu-item>
          </router-link>
            <router-link to="/newList">
            <el-menu-item index="7-2">列表</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        qs: localStorage.getItem('qs') ? localStorage.getItem('qs') : 0
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    }
  }
</script>
<style scoped>
  .tac {}
  
  .router-link-active {
    color: transparent;
  }
</style>