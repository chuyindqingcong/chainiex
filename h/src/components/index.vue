<template>
  <div class="tbs">
  	<el-table
    :data="tableData"
   	max-height="400"
    stripe
    style="width: 100%">
    <el-table-column
      prop="phoneNum"
      label="电话">
    </el-table-column>
  </el-table>
  <el-upload
	  class="upload-demo"
	  action="/upload"
	  :on-preview="handlePreview"
	  :on-remove="handleRemove"
	  :limit="1"
	  :on-exceed="handleExceed"
	  :on-error="err"
	  :on-success ="succ"
	  :file-list="fileList">
	  <el-button size="small" type="primary">点击上传</el-button>
	  <div slot="tip" class="el-upload__tip">上传任何文件</div>
	</el-upload>
	<el-button type="primary" class="asd" @click="send">发送</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      	fileList: [],
        tableData: []
      }
    },
     methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.error({
          message: '当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件',
          type: 'success'
        });
      },
      err(err, file, fileList){
      	  this.$message.error({
          message: '上传失败',
          type: 'success'
        });
      },
      send(){
      	if(this.tableData.length<=0){ 
      	this.$message.error({
          message: '请先上传资料',
          type: 'success'
        });
      		return false
      	}
      	this.$ajax.get('/sendmsg').then(req=>{
      		if(req==0){
      			 this.$message.error({
		          message: '发送失败',
		          type: 'success'
		        });
      		}else{
      			this.$message({
		          message: '发送成功',
		          type: 'success'
		       });
		       this.tableData=[]
      		}
      	})
      },
      succ(res,file,fileList){
      	this.$message({
          message: '上传成功',
          type: 'success'
       });
	      for(var i=0;i<res.length;i++){
	      	this.tableData.push({'phoneNum':res[i].phoneNum}) 	
	      }
      }
    }
  }
</script>
<style scoped>
	.tbs{
		width: 500px;
		margin-top: 40px;
	}
	.asd{
		float: right;
	}
	.upload-demo{
		margin-top: 20px;
	}
</style>