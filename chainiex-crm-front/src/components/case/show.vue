<template>
  <div>
    <el-select v-model="value6" placeholder="请选择" @change="changes">
      <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
    <el-button>全部提现</el-button>

    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%;margin-top: 11px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="币种" width="120" prop="coin">
      </el-table-column>
      <el-table-column prop="amount" label="数量" width="120">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="remark" label="留言" width="120">
      </el-table-column>
      <el-table-column prop="toAddress" label="地址" min-width>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
      	  <template scope="scope">
	          <el-tag>{{scope.row.status==1?'等待处理':scope.row.status==2?'成功':scope.row.status==3?'失败':'用户取消'}}</el-tag>
	        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template scope="scope">
          <el-button size="small" @click="handleDelete(scope)">提现</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.pageNo" :page-size="this.pageSize" layout="total, prev, pager, next" :total="this.total">
      </el-pagination>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible" size="tiny">
		  <el-form >
		    <el-form-item label="币种" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.coin"></el-input>
		    </el-form-item>
		  	 <el-form-item label="数量" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.amount"></el-input>
		   	 </el-form-item>
		   	 <el-form-item label="留言" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.remark"></el-input>
		   	 </el-form-item>
		   		<el-form-item label="交易id" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.uids"></el-input>
		   	 </el-form-item>
		   	  <el-form-item label="地址" :label-width="formLabelWidth">
		     <el-input  auto-complete="off" v-model="form.toAddress" id='aa'> </el-input> 	<el-button @click="copy" style="float: right;margin-top:5px">复 制</el-button>
		   	 </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		 
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="nosuccess">拒 绝</el-button>
		    <el-button type="primary" @click="success">提 现</el-button>
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
        input: '',
        form:{
        	remark:null,
        	icon:null,
        	uids:null,
        	coin:null,
        	toAddress:null
        },
        pageSize: 10,
        total: 0,
        formLabelWidth:'60px',
        names: '',
        dialogFormVisible:false,
        multipleSelection: [],
        cities: [{
          value: 'BTC',
          label: '比特币'
        }, {
          value: 'DASH',
          label: '达世币'
        }, {
          value: 'NEM',
          label: '新经币'
        }, {
          value: 'WAVES',
          label: '海浪币'
        }],
        value6: ''
      }
    },
    mounted() {
      this.$ajax.get('/withdraw/list', {
        params: {
          current: this.pageNo,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data.data.page.data;
        this.total = res.data.data.page.totalResults
      })
    },
    methods: {
    	success(){
    		this.$ajax.post('/withdraw/done',qs.stringify({
    			txid:this.form.uids,
    			withdrawId:this.form.id
    		})).then(res=>{
    			if(res.data.code==0){
    				this.dialogFormVisible=false,
    				  this.$ajax.get('/withdraw/list', {
				        params: {
				          current: this.pageNo,
				          pageSize: this.pageSize,
				        }
				      }).then(res => {
				        this.tableData = res.data.data.page.data;
				        this.total = res.data.data.page.totalResults
				      })
    			}
    		})
    	},
    	nosuccess(){
    		this.$ajax.post('/withdraw/reject',qs.stringify({
    			txid:this.form.uids,
    			withdrawId:this.form.id
    		})).then(res=>{
    			if(res.data.code==0){
    				this.dialogFormVisible=false,
    				  this.$ajax.get('/withdraw/list', {
				        params: {
				          current: this.pageNo,
				          pageSize: this.pageSize,
				        }
				      }).then(res => {
				        this.tableData = res.data.data.page.data;
				        this.total = res.data.data.page.totalResults
				      })
    			}
    		})
    	},
    	copy(){
						document.getElementById('aa').getElementsByTagName('input')[0].select()
						document.execCommand("Copy"); 
						 this.$notify({
			          message: '复制成功',
			          type: 'success'
			        });
    	},
      handleDelete(scope, row) {
      	console.log(scope)
			  this.form=scope.row;
				this.dialogFormVisible=true
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$ajax.get('/withdraw/list', {
          params: {
            current: val,
            pageSize: this.pageSize,
          }
        }).then(res => {
          this.tableData = res.data.data.page.data;
          this.total = res.data.data.page.totalResults
        })
      },
      toggleSelection(rows) {
        if(rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      dateFormat(row, colum) {
        return this.getTime(row.gmtCreate)
      },
      changes(val) {
        this.$ajax.get('/withdraw/list', {
          params: {
            current: 1,
            pageSize: this.pageSize,
            coin: val
          }
        }).then(res => {
          this.tableData = res.data.data.page.data;
          this.total = res.data.data.page.totalResults
        })
      }
    }
  }
</script>

<style scoped>

</style>