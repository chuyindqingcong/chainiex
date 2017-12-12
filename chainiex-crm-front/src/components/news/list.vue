<template>
  <div>
    <el-table :data="tableData" style="width: 100%" fit>
      <el-table-column prop="title" label="标题" width="280px">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template scope="scope">
          <el-tag>{{scope.row.status==1?'正常':'删除'}}</el-tag>
        </template>
      </el-table-column>
       <el-table-column prop="type" label="类型" width="80">
        <template scope="scope">
          <el-tag>{{scope.row.type==1?'资讯':'走向'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="abs" label="简介" min-width="70%">
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.pageNo" :page-size="this.limit" layout="total, prev, pager, next" :total="this.total">
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
        limit: 10,
        total: 0,
        names: ''
      }
    },
    mounted() {
      this.$ajax.get('/message/news', {
        params: {
          current: this.pageNo,
          limit: this.limit,
        }
      }).then(res => {
        this.tableData = res.data.data.data;
        this.total = 1
      })
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('此操作将删除公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$ajax.post('/message/news/delete', qs.stringify({
            id: row.id
          })).then(res => {
            this.$ajax.get('/message/news', {
              params: {
                current: this.pageNo,
                limit: this.limit,
              }
            }).then(res => {
               this.tableData = res.data.data.data;
              this.total = 1
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      dateFormat(row, colum) {
        return this.getTime(row.gmtCreate)
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.$ajax.get('/message/news', {
          params: {
            current: val,
            limit: this.limit,
          }
        }).then(res => {
          this.tableData = res.data.data.data;
              this.total = 1
        })
      }
    }
  }
</script>

<style>

</style>