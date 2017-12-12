<template>
  <div>
    <el-table :data="tableData" style="width: 100%" fit>
      <el-table-column prop="coin" label="币种名称" width="180px">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template scope="scope">
          <el-tag>{{scope.row.status==1?'正常':'删除'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width>
        <!--<template scope="scope">
		        <el-button
		          size="small"
		          type="danger"
		  
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>-->
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.pageNo" :page-size="this.pageSize" layout="total, prev, pager, next" :total="this.total">
      </el-pagination>
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
        total: 0,
        names: ''
      }
    },
    mounted() {
      this.$ajax.get('/coin/list', {
        params: {
          current: this.pageNo,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data.data.coins;
        this.total = 1
      })
    },
    methods: {

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
          this.tableData = res.data.data.coins;
          this.total = 1
        })
      }
    }
  }
</script>

<style>

</style>