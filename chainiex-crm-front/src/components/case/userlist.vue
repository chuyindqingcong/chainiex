<template>
  <div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="用户id">
    <el-input v-model="formInline.user" placeholder="用户id"></el-input>
  </el-form-item>
  <el-form-item label="币种">
    <el-select v-model="formInline.region" placeholder="币种">
      <el-option label="BTC" value="BTC"></el-option>
      <el-option label="DASH" value="DASH"></el-option>
        <el-option label="NEM" value="NEM"></el-option>
      <el-option label="WAVES" value="WAVES"></el-option>
    </el-select>
  </el-form-item><el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
  </el-select>
    <el-table :data="tableData" style="width: 100%" fit>
      <el-table-column prop="uid" label="id" width="80px">
      </el-table-column>
      <el-table-column prop="coin" label="币种" width="100px">
      </el-table-column>
      <el-table-column prop="amount" label="余额" min-width>
      </el-table-column>
      <el-table-column prop="lockAmount" label="冻结余额" min-width>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope)" v-if="qs>2">冻结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.pageNo" :page-size="this.pageSize" layout="total, prev, pager, next" :total="this.total">
      </el-pagination>
    </div>
    <el-dialog title="冻结余额" :visible.sync="dialogFormVisible" >
		  <el-form >
		    <el-form-item label="冻结数量" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.amount"></el-input>
		    </el-form-item>
		  
		   	 <el-form-item label="原因" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="reason" type='textarea' :rows=10></el-input>
		   	 </el-form-item>
		   		
		  
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		 
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dj">冻结</el-button>
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
        reason:'',
        pageNo: 1,
        qs: localStorage.getItem('qs') ? localStorage.getItem('qs') : 0,
        pageSize: 100,
        total: 0,
        form:{},
        formLabelWidth:'80px',
        dialogFormVisible:false,
        names: '',
         formInline: {
          user: '',
          region: ''
        }
      }
    },
    mounted() {
    	if(this.qs>2){
    		this.$ajax.get('/coin/fund/list', {
		        params: {
		          current: this.pageNo,
		          pageSize: this.pageSize,
		        }
		      }).then(res => {
		        this.tableData = res.data.data.page.data;
		        this.total = res.data.data.page.totalResults
		      })	
    	}else{
    		this.tableData=null;
    		this.total=0
    	}
    },
    methods: {
    	onSubmit(){
    		if(this.qs>3){
    			if(this.formInline.user.length>0){
    					this.$ajax.get('/coin/fund/user', {
					params:{
						userId:this.formInline.user	
					}
			      }).then(res => {
			        this.tableData = res.data.data.page.data;
			        this.total = res.data.data.page.totalResults
			      })		
    			}else{
    					this.$ajax.get('/coin/fund/list', {
				        params: {
				          current: this.pageNo,
				          pageSize: this.pageSize,
				          coin:this.formInline.region
				        }
				      }).then(res => {
				        this.tableData = res.data.data.page.data;
				        this.total = res.data.data.page.totalResults
				      })	
    			}
    		}else{
    					this.$ajax.get('/coin/fund/user', {
					params:{
						userId:this.formInline.user	
					}
			      }).then(res => {
			        this.tableData = res.data.data.page.data;
			        this.total = res.data.data.page.totalResults
			      })		
    		}
    	},
    	dj(){
    		if(this.reason.length<=0){
    				 this.$message({
				            type: 'error',
				            message: '请填写原因!'
				          });
				          return false
    			}else if(this.form.amount<=0){
    				this.$message({
				            type: 'error',
				            message: '金额不能为0!'
				          });
				          return false
    			}
    			this.$ajax.post('/coin/user/freeze',qs.stringify({
		       		coin:this.form.coin,
		       		userId:this.form.uid,
		       		amount:this.form.amount,
		       		reason:this.reason
		       	})).then(res=>{
		       		if(res.data.code==0){
		       			   this.$message({
				            type: 'success',
				            message: '冻结成功!'
				          });
		       		}else{
		       			  this.$message({
				            type: 'error',
				            message: '冻结失败,请检查冻结数量是否超过余额!'
				          });
		       		}
		       	})
    	},
      handleDelete(scope) {
       	this.dialogFormVisible=true;
       	this.form=scope.row
      },
      dateFormat(row, colum) {
        return this.getTime(row.gmtCreate)
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.$ajax.get('/notice/list', {
          params: {
            current: val,
            pageSize: this.pageSize,
          }
        }).then(res => {
          this.tableData = res.data.data.notices.data;
          this.total = res.data.data.notices.totalResults
        })
      }
    }
  }
</script>

<style>

</style>