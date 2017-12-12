<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
	  <el-form-item label="名称" prop="name">
	    <el-input v-model="ruleForm.name"></el-input>
	  </el-form-item>
	   <el-form-item label="员工编号" prop="workNo">
	    <el-input v-model="ruleForm.workNo"></el-input>
	  </el-form-item>
	  <el-form-item label="权限" prop="role">
	    <el-radio-group v-model="ruleForm.role">
	      <el-radio label="1" class='radio'>客服</el-radio>
	      <el-radio label="2" class='radio'>经理</el-radio>
	      <el-radio label="3" class='radio'>管理员</el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="性别" prop="sex">
	    <el-radio-group v-model="ruleForm.sex">
	      <el-radio label="0" class='radio'>男</el-radio>
	      <el-radio label="1" class='radio'>女</el-radio>
	    </el-radio-group>
	  </el-form-item>
	   <el-form-item label="登录账号" prop="userName">
	    <el-input v-model="ruleForm.userName"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" prop="password">
	    <el-input v-model="ruleForm.password"></el-input>
	  </el-form-item>
	  <el-form-item label="手机号码" prop="mobile">
	    <el-input v-model="ruleForm.mobile"></el-input>
	  </el-form-item>
	  <el-form-item label="身份证" prop="cardId">
	    <el-input v-model="ruleForm.cardId"></el-input>
	  </el-form-item>
	    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  </el-form-item>
	</el-form>
</template>
<script>
import qs from 'qs'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          workNo:'',
          role:'1',
          sex:'0',
          password:'',
          mobile:'',
          cardId:'',
          userName:'',
        },
        rules: {
          name: [
            { required: true, message: '输入名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
          ],
          workNo: [
            { required: true, message: '输入员工编号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '输入密码', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '输入登录账号', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '输入身份证', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '输入身份证', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '输入登入账号', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           	this.$ajax.post('/user/create',qs.stringify(this.ruleForm)).then(res=>{
           		if(res.data.code==0){
           			this.$notify({
			          message: '保存成功',
			          type: 'success'
			        });
			     	this.$refs[formName].resetFields();
           		}
           	})
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
.demo-ruleForm{
	max-width: 500px;
}
</style>