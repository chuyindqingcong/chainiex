<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="公告类型" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio label="1" class='radio'>系统公告</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="内容" prop="notice">
      <el-input :rows='10' type="textarea" v-model="ruleForm.notice"></el-input>
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
          title: '',
          type: '1',
          notice: ''
        },
        rules: {
          title: [{
              required: true,
              message: '请输入标题',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 50,
              message: '长度在 3 到 50个字符',
              trigger: 'blur'
            }
          ],
          type: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }],
          notice: [{
            required: true,
            message: '请填写内容',
            trigger: 'blur'
          }]
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