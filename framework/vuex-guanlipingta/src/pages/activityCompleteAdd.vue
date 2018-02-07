<template>
  <div class="activity-recharge-add">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>

    <el-form label-position="right" label-width="120px">
      <el-form-item label="活动名称">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="活动类型">
         <el-radio>活动期间</el-radio>
         <el-radio>每天</el-radio>
      </el-form-item>

      <el-form-item label="活动规则">        
          <el-button>新增</el-button>
            <div class="line1"></div>
            <el-table class="table-add"    :data="[{id:18821214125},{}]"  >
              <el-table-column prop="id" label="充值金额" >
                <template slot-scope="scope">
                  <el-input></el-input>
                </template>
              </el-table-column>      
              <el-table-column prop="" label="赠送金额" >
                <template slot-scope="scope">
                  <el-input></el-input>
                </template>
              </el-table-column>      
              <el-table-column prop="" label="操作" ><template slot-scope="scope">
                  <el-popover ref="popover1"  placement="top"  width="160"  >
                       <p>确定删除吗?</p>
                       <div class="line2"></div>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="change(scope.$index, scope.row, scope)">取消</el-button>
                          <el-button type="primary" size="mini" @click="change(scope.$index, scope.row, scope)">确定</el-button>
                        </div>
                   </el-popover><el-button size="mini" v-popover:popover1>删除</el-button>              
                </template>
              </el-table-column>  
            </el-table>
        </el-form-item>
        
        

      <div class="line2"></div>

      <el-form-item label="" >
        <el-button size="medium" type="primary">保存</el-button>
      </el-form-item>
  


    </el-form>    

  </div>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        
      }
    },
    created() {
    },
    methods: {      
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .table-add {width: 500px;}
</style>