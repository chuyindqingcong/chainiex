<template>
	<div>
		<el-table
	      :data="tableData"
	      style="width: 100%"
	      fit>
	      <el-table-column
	        prop="name"
	        label="名称"
	        width="100px">
	      </el-table-column>
	      <el-table-column
	        prop="gmtCreate"
	        label="创建时间"
	        width="180"  :formatter="dateFormat">
	      </el-table-column>
	      <el-table-column
	        prop="role"
	        label="性别"
	        width="80px">
		        <template scope="scope">
				    <el-tag>{{scope.row.sex==0?'男':'女'}}</el-tag>
				</template>
	      </el-table-column>
	      <el-table-column
	        prop="mobile"
	        label="手机号"
	        width="130px">
	      </el-table-column>
	      <el-table-column
	        prop="cardId"
	        label="身份证"
	        min-width="160px">
	        <template scope="scope" v-if='qs>1'>
				 	{{scope.row.cardId}}
				</template>
	      </el-table-column>
	      <el-table-column
	        prop="role"
	        label="级别"
	        width="90px">
	        <template scope="scope">
				    <el-tag>{{scope.row.role==1?'客服':scope.row.role==2?'经理':'管理员'}}</el-tag>
				</template>
	      </el-table-column>
	       <el-table-column label="操作" width="180px">
		      <!--<template scope="scope">
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>-->
		    </el-table-column>
	    </el-table>
	    <div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="this.pageNo"
		      :page-size="this.pageSize"
		      layout="total, prev, pager, next"
		      :total="this.total">
		    </el-pagination>
		  </div>
	</div>
</template>

<script>
import qs from 'qs'
export default {
	data(){
		return {
			tableData:null,
			pageNo:1,
			pageSize:1000,
			total:0,
			names:''
		}
	},
	mounted(){
		this.$ajax.get('/user/list',{params:{
			current:this.pageNo,
			pageSize:this.pageSize,
		}}).then(res=>{
			this.tableData=res.data.data.users;
			this.total=1
		})
	},	
	methods:{
//		handleDelete(index, row) {
//			 this.$confirm('此操作将删除用户, 是否继续?', '提示', {
//		          confirmButtonText: '确定',
//		          cancelButtonText: '取消',
//		          type: 'warning'
//		        }).then(() => {
//		          this.$message({
//		            type: 'success',
//		            message: '删除成功!'
//		          });
//		          	this.$ajax.post('/api/notice/delete',qs.stringify({
//			       		id:row.id
//			       })).then(res=>{
//			       		this.$ajax.get('/api/notice/list',{params:{
//							current:this.pageNo,
//							pageSize:this.pageSize,
//						}}).then(res=>{
//							this.tableData=res.data.data.notices.data;
//							this.total=res.data.data.notices.totalResults
//						})
//			       })
//		        }).catch(() => {
//		          this.$message({
//		            type: 'info',
//		            message: '已取消删除'
//		          });          
//		        });
//	   },
	   dateFormat(row,colum){
	  		return this.getTime(row.gmtCreate)
	   },
	   handleSizeChange(val) {
      	},
	    handleCurrentChange(val) {
		    this.$ajax.get('/notice/list',{params:{
				current:val,
				pageSize:this.pageSize,
			}}).then(res=>{
				this.tableData=res.data.data.users;
				this.total=1
			})
	    }
	}
}

</script>

<style>
</style>