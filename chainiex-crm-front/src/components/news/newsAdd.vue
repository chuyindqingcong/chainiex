<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio label="1" class='radio'>资讯</el-radio>
         <el-radio label="2" class='radio'>政策走向</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="简介" prop="abs">
      <el-input v-model="ruleForm.abs"></el-input>
    </el-form-item>
    <el-form-item label="logo图" prop="cover">
      <el-upload
			  class="avatar-uploader"
			  action="/image/upload"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
    </el-form-item>
    <el-form-item label="内容" prop="notice">
     	<quilleditor  v-model="ruleForm.content"
                ref="myTextEditor"  
                :options="editorOption"  
                @change="onChange"> 
                      <div id="toolbar" slot="toolbar">
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
        <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
        <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
        <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
        <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
        <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
        <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

      <span class="ql-formats"><select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-header" >
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected="selected"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
     <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-font">
        <option selected="selected"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select></span>
      <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
        <span class="ql-formats"><button type="button" class="ql-clean"></button></span>
        <span class="ql-formats"><button type="button" class="ql-link"></button></span>
        <!--图片按钮点击事件-->
      <span class="ql-formats"><button type="button" @click="imgClick">
        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
      </button></span>
        <span class="ql-formats"><button type="button" class="ql-video"></button></span>

      </div>
  </quilleditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
	import qs from 'qs'
	import { quillEditor } from 'vue-quill-editor'
	export default {
		data() {
			return {
				ruleForm: {
					title: '',
					cover:'',
					type: '1',
					content: '',
					abs:''
				},
				fileName:'file',
				uploadUrl: '/image/upload',
				editorOption: {
					modules: {
						toolbar: '#toolbar'
					}
				},
				rules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
					},{
							min: 3,
							max: 50,
							message: '长度在 3 到 50个字符',
							trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
				}
			};
		},
		methods: {
			onChange() {
				this.$emit('input', this.ruleForm.content)
			},

			onFileChange(e) {
				var self = this
				var fileInput = e.target
				if(fileInput.files.length == 0) {
					return
				}
				this.editor.focus()
				if(fileInput.files[0].size > 1024 * 1024 * 100) {
					this.$alert('图片不能大于600KB', '图片尺寸过大', {
						confirmButtonText: '确定',
						type: 'warning',
					})
				}
				var data = new FormData
				data.append(this.fileName, fileInput.files[0])
				this.$ajax.post(this.uploadUrl, data).then(function(res) {
					if(res.data) {
						self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.data.url)
					}
				})
			},

			imgClick() {
				if(!this.uploadUrl) {
					console.log('no editor uploadUrl')
					return;
				}
				var input = document.createElement('input')
				input.type = 'file'
				input.name = this.fileName
				input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
				input.onchange = this.onFileChange
				input.click()
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$ajax.post('/message/news/create', qs.stringify(this.ruleForm)).then(res => {
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
      handleAvatarSuccess(res, file) {
      	console.log(res.data)
        this.ruleForm.cover = res.data.url
      },
      beforeAvatarUpload(file) {
//      const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
//
//      if (!isJPG) {
//        this.$message.error('上传logo图片只能是 JPG 格式!');
//      }
        if (!isLt2M) {
          this.$message.error('上传logo图片大小不能超过 2MB!');
        }
        return isLt2M;
//      return isJPG && isLt2M;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		},
		computed: {
			editor() {
				return this.$refs.myTextEditor.quill
			}
		},
		components: {
			'quilleditor': quillEditor
		},
		mounted() {
			this.ruleForm.content = this.value
		},
		watch: {
			'value' (newVal, oldVal) {
				if(this.editor) {
					if(newVal !== this.ruleForm.content) {
						this.ruleForm.content = newVal
					}
				}
			},
		}

	}
</script>
<style scoped>
  .demo-ruleForm {
    max-width: 800px;
  }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    border: 1px dashed #ddd;
    border-radius: 5px; 
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>