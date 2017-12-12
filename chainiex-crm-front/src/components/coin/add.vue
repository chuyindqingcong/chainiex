<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="币种名称" prop="coin">
      <el-input v-model="ruleForm.coin"></el-input>
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
          coin: ''
        },
        rules: {
          coin: [{
            required: true,
            message: '请输入币种',
            trigger: 'blur'
          }, ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$ajax.post('/notice/create', qs.stringify(this.ruleForm)).then(res => {
              this.$notify({
                message: '保存成功',
                type: 'success'
              });
              this.$refs[formName].resetFields();
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
  .demo-ruleForm {
    max-width: 800px;
  }
</style>