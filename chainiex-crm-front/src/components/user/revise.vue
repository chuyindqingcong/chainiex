<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	  <el-form-item label="原密码" prop="oldPwd">
	    <el-input v-model="ruleForm.oldPwd"></el-input>
	  </el-form-item>
	 <el-form-item label="新密码" prop="pwd">
	    <el-input v-model="ruleForm.pwd"></el-input>
	  </el-form-item>
	  <el-form-item label="重复新密码" prop="repwd">
	    <el-input v-model="ruleForm.repwd"></el-input>
	  </el-form-item>
	  <el-form-item>
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
          oldPwd: '',
          pwd: '',
          repwd: ''
        },
        rules: {
          oldPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请填写新密码', trigger: 'blur' }
          ],
          repwd: [
            { required: true, message: '请重复密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.ruleForm.pwd!=this.ruleForm.repwd){
          		this.$notify.error({
		          message: '新密码不一致，请重新输入'
		        });
		        return false
          	}
           	this.$ajax.post('/user/password/modify',qs.stringify(this.ruleForm)).then(res=>{
           		if(res.data.code==0){
           			  this.$alert('修改密码成功,请返回登录页重新登录', {
				          confirmButtonText: '确定',
				          callback: action => {
				            this.$message({
				              type: 'info',
				              message: '请重新登录'
				            });
				            	localStorage.removeItem('qs')
								localStorage.removeItem('username')
				            this.$router.push('/');
				            
				          }
				        });
				       
           		}else{
           			this.$notify.error({
			          message: '密码错误，请重新输入'
			        });
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
	max-width: 800px;
}
</style>