<template>
  <div class="user-driver-list-etail">
        
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>基本信息</span>            
      </div>
      <el-row :gutter="100" class="ct" type="flex">
         <el-col :span="8" >
            <div class=""><span class="c1">ID: </span><span>{{show.res.id}}</span></div>
            <div class=""><span class="c1">手机号: </span><span>{{show.res.mobile}}</span></div>
            <div class=""><span class="c1">绑定平台: </span><span>{{show.res.nickname}}</span></div>
         </el-col>
         <el-col :span="8" :offset="1">
            <div class="">&nbsp;</div>
            <div class=""><span class="c1">注册时间: </span><span>{{api.toTime(show.res.created)}}</span></div>     
         </el-col>        
      </el-row>
    </el-card>
    <div class="line2"></div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>地址信息</span>            
      </div>
      <div class="ct">
        <p class="p1">收货地信息</p>
        <el-table border width="100%"  :data="listByMaker.res"  >
            <el-table-column prop="title" label="联系人(公司)" ></el-table-column>      
            <el-table-column prop="phone" label="联系电话" ></el-table-column>      
            <el-table-column label="经纬度" >
              <template slot-scope="scope">
               经度：{{scope.row.lng}} 纬度： {{scope.row.lat}} 
              </template>  
            </el-table-column>      
            <el-table-column prop="address" label="收货地地址"  ></el-table-column>                  
          </el-table> 
      </div>      
      <div class="line2"></div>
      <div class="ct">
        <p class="p1">目的地信息</p>
        <el-table border  width="100%"  :data="companylistByMaker.res"  >
            <el-table-column prop="park_title" label="物流园" ></el-table-column>      
            <el-table-column prop="title" label="物流名称" ></el-table-column>      
            <el-table-column prop="phone" label="联系电话" ></el-table-column>      
            <el-table-column prop="address" label="目的地地址"  ></el-table-column>                  
          </el-table> 

      </div>
      
    </el-card>
    <div class="line3"></div>


  

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: '',
    data() {
      return {
        dialog: false
      }
    },
    computed: {
      ...mapState('maker',  ['show']),
      ...mapState('warehouse',  ['listByMaker']),
      ...mapState('company', {
        companylistByMaker: state=> state.listByMaker
      }),
    },
    created() {
     
      this.show.id = this.$route.query.id
      this.listByMaker.maker_id = this.$route.query.id
      this.companylistByMaker.maker_id = this.$route.query.id

      this.$store.dispatch('maker/show')
      this.$store.dispatch('warehouse/listByMaker')
      this.$store.dispatch('company/listByMaker')
    },
    methods: {      
      change(){
        this.dialog = false
      }
    },
    mounted:function(){
      
    }
  }
</script>

<style lang="less" scoped>
  .btn-change{margin-left:10px;}
</style>