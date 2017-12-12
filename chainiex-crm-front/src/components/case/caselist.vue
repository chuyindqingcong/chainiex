<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width='140'>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template scope="scope">
          <el-tag>{{scope.row.status==1?'未处理':scope.row.status==2?'处理中':'已完成'}}</el-tag>
        </template>
      </el-table-column>
     <el-table-column label="操作" width="180px">
        <template scope="scope">
          <el-button size="small" @click="handleDelete(scope)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.pageNo" :page-size="this.pageSize" layout="total, prev, pager, next" :total="this.total">
      </el-pagination>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible" >
		  <el-form >
		    <el-form-item label="标题" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.title"></el-input>
		    </el-form-item>
		  	 <el-form-item label="工单号" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.tradeId"></el-input>
		   	 </el-form-item>
		   	 <el-form-item label="内容" :label-width="formLabelWidth">
		      <el-input  auto-complete="off" v-model="form.content" type='textarea' :rows=10></el-input>
		   	 </el-form-item>
		   		
		   	  <el-form-item label="图片" :label-width="formLabelWidth" class="imgs">
		  		<div v-for="(item,index) in images">
		  			<img :src='imgSrc+item' @click="fdtp(imgSrc+item)">
		  		</div>
		   	 </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		 
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="updata">已处理</el-button>
		  </div>
		</el-dialog>
		<div v-if="img">
			<div class="ycc" @click="qh"></div>
			<div class="imgss"><img :src="soct" @click="qh"></div>
		</div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        tableData: null,
        pageNo: 1,
        pageSize: 10,
        soct:'',
        total: 0,
        names: '',
        img:false,
        imgSrc:'http://chainiex.oss-cn-hangzhou.aliyuncs.com/',
        form:{},
        formLabelWidth:'60px',	
         dialogFormVisible:false,
         images:[]
      }
    },
    mounted() {
      this.$ajax.get('/case/list', {
        params: {
          current: this.pageNo,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data.data.page.data;
        this.total = res.data.data.page.totalResults;
      })
    },
    methods: {
    	fdtp(val){
    		this.img=true;
    		this.soct=val
    	},
    	qh(){
    		this.img=false
    	},
    	updata(){
    		console.log(this.form)
    		this.$ajax.post('/case/done',qs.stringify({
    			caseId:this.form.id
    		})).then(res=>{
    				console.log(111)
    		})
    	},
		handleDelete(scope){
				this.images=scope.row.imgs.split(',');
			  this.form=scope.row;
				this.dialogFormVisible=true
		},
      dateFormat(row, colum) {
        return this.getTime(row.gmtCreate)
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
.imgs img{
	width: 120px;
	height: 120px;
	float: left;
	margin-right: 20px;
	cursor: pointer;
}
.imgss{
	  position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3001;
    top: 0;
    left: 0;
}
.imgss img{
	width: 100%;
	height: 100%;
}
.ycc{
	    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 3000;
}
</style>