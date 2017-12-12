<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="key" label="key" width='140'>
      </el-table-column>
      <el-table-column prop="value" label="值" min-width>
      </el-table-column>
      <el-table-column prop="gmtModify" label="修改时间" width="180" :formatter="dateFormat">
      </el-table-column>
     
     <el-table-column label="操作" width="180px">
        <template scope="scope">
          <el-button size="small" @click="handleDelete(scope)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.pageNo" :page-size="this.pageSize" layout="total, prev, pager, next" :total="this.total">
      </el-pagination>
    </div>
     <el-button type="primary" @click="add" class="xx">新增</el-button>
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible" >
		  <el-form >
		    <el-form-item label="key" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.key" :disabled="showh"></el-input>
		    </el-form-item>
		  	 <el-form-item label="值" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.value"></el-input>
		   	</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		 
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="upload">修改</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        tableData: null,
        pageNo: 1,
        showh:true,
        pageSize: 10,
        soct:'',
        total: 0,
        names: '',
        img:false,
        imgSrc:'http://chainiex.oss-cn-hangzhou.aliyuncs.com/',
        form:{},
        formLabelWidth:'60px',	
         dialogFormVisible:false,
      }
    },
    mounted() {
      this.$ajax.get('/config/list', {
        params: {
          current: this.pageNo,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data.data.configs;
        this.total = 1
      })
    },
    methods: {
    	upload(){
    		if(this.form.id){
    			this.$ajax.post('/config/update', qs.stringify({
	    			key:this.form.key,
	    			value:this.form.value
	    		})).then(res=>{
	    			if(res.data.code==0){
	    				this.$notify({
				          message: '修改成功',
				          type: 'success'
				        });
				        this.dialogFormVisible=false;

	    			}else{
	    				 this.$notify.error({
				              message: '修改失败'
				            });
	    			}
    			})
    		}else{
    			console.log(this.form)
    			this.$ajax.post('/config/create', qs.stringify({
	    			key:this.form.key,
	    			value:this.form.value
	    		})).then(res=>{
	    			if(res.data.code==0){
	    				this.$notify({
				          message: '新增成功',
				          type: 'success'
				        });
				        this.dialogFormVisible=false;
				        this.$ajax.get('/config/list', {
					        params: {
					          current: this.pageNo,
					          pageSize: this.pageSize,
					        }
					      }).then(res => {
					        this.tableData = res.data.data.configs;
					        this.total = 1
					      })
	    			}else{
	    				 this.$notify.error({
				              message: '新增失败'
				            });
	    			}
	    		})
    		}
    		
    	},
    	add(){
    		this.form={
    			key:'',
    			value:''
    		};
    		this.dialogFormVisible=true;
    		this.showh=false;
    	},
		handleDelete(scope){
			this.showh=true;
			  this.form=scope.row;
				this.dialogFormVisible=true
		},
      dateFormat(row, colum) {
        return this.getTime(row.gmtModify)
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.$ajax.get('/case/list', {
          params: {
            current: val,
            pageSize: this.pageSize,
          }
        }).then(res => {
           this.tableData = res.data.data.page.data;
       		 this.total = res.data.data.page.totalResults;
        })
      }
    }
  }
</script>

<style scoped>
.block{
	float:left;
	margin-top: 20px;
}
.xx{
	float: right;
	margin-top: 20px;
}
</style>