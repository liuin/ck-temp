<template>
  <div class="user-driver-list-etail" >    
        
     <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>基本信息</span>            
      </div>
      <el-row :gutter="100" class="ct" type="flex" v-if="!_.isEmpty(driver)">
         <el-col :span="8" >
            <div class="flex-leftright"><span class="c1">ID: </span><span>{{driver.id}}</span></div>
            <div class="flex-leftright"><span class="c1">姓名: </span><span>{{driver.driver_name}}</span></div>
            <div class="flex-leftright"><span class="c1">紧急联系人: </span><span>{{driver_cert.urgent_contact}}</span></div>
            <div class="flex-leftright"><span class="c1">注册时间: </span><span>{{api.toTime(driver.created)}}</span></div>
         </el-col>
         <el-col :span="8" :offset="1">
            <div class="flex-leftright"><span class="c1">所在城市: </span><span>{{driver.region}}</span></div>
            <div class="flex-leftright"><span class="c1">邀请人手机号: </span><span>{{driver.referee_mobile}}</span></div>     
            <div class="flex-leftright"><span class="c1">手机号: </span><span>{{driver.mobile}}</span></div>
            <div class="flex-leftright"><span class="c1">联系方式: </span><span>{{driver.mobile}}</span></div>            
         </el-col>
         <el-col :span="6">
            <img  :src="api.imgdesc(driver.portrait,'120px')" style="background:#eee; width:100px; height:120px;display:block; margin-left:auto;"  alt="" />
         </el-col>
      </el-row>
    </el-card>
    <div class="line3"></div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>身份信息</span>            
      </div>
      <div class="ct">
        <p class="p1">身份证号码　{{driver.cardno}}</p>
      </div>
      <div class="line1"></div>
      <el-row :gutter="100" class="ct" type="flex">
         <el-col :span="8" class="ta-c">
            <div class="imgbox" @click="dialogVisible = true">
              <img :src="api.imgdesc(driver_cert.card_img)" style="background:#eee; width:200px; height:150px;"  alt="" />
              <p class="p1 ta-c">身份证</p>
              <i class="el-icon-zoom-in"></i> 
            </div>
            </el-col>             
         <el-col :span="6" class="ta-c">              
            <div class="imgbox" >
              <img :src="api.imgdesc(driver_cert.people_carded_img)" style="background:#eee; width:200px; height:150px;"  alt="" />
              <p class="p1 ta-c">手持身份证</p>
              <i class="el-icon-zoom-in"></i>
             </div>
         </el-col>
      </el-row>
    </el-card>
    <div class="line3"></div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>车辆信息</span>            
      </div>
      <div class="ct">
        
      </div>
      <div class="line1"></div>
      <el-row :gutter="100" class="ct" type="flex">
         <el-col :span="8" class="ta-l">
            <p class="p1 " ><span class="c1">车牌号码</span>　{{driver.plate_number}}</p>
            <p class="p1 " ><span class="c1">载重(kg)</span>  {{driver.load}}</p>
            <div class="line1"></div>  
            <div class="imgbox">
              <img :src="api.imgdesc(driver_cert.drivers_license)" style="background:#eee; width:200px; height:150px;"  alt="" />
              <p class="p1 ta-c">驾驶证</p>
              <i class="el-icon-zoom-in"></i>
            </div>
         </el-col>             
         <el-col :span="8" class="ta-l">      
            <p class="p1 " ><span class="c1">车辆类型</span>    {{driver.car_category_title}}</p>
            <p class="p1 " ><span class="c1">长宽高(cm)</span>　{{driver.long}}*{{driver.with}}*{{driver.high}}</p>
            <div class="line1"></div>  
            <div class="imgbox">
              <img :src="api.imgdesc(driver_cert.driving_license)" style="background:#eee; width:200px; height:150px;"  alt="" />
              <p class="p1 ta-c">行驶证</p>
              <i class="el-icon-zoom-in"></i>
             </div>
         </el-col>
         <el-col :span="8" class="ta-l">      
            <p class="p1 " >&nbsp;</p>
            <p class="p1 " >&nbsp;</p>
            <div class="line1"></div>  
            <div class="imgbox">
              <img :src="api.imgdesc(driver_cert.car_img)" style="background:#eee; width:200px; height:150px;"  alt="" />
              <p class="p1 ta-c">车辆45°侧面照片</p>
              <i class="el-icon-zoom-in"></i>
             </div>
         </el-col>
      </el-row>
    </el-card>

    <div class="line3"></div>

    <el-card class="box-card" v-if="driver_exp_account">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>其他</span>            
      </div>

      <el-row :gutter="100" class="ct" type="flex">


         <el-col :span="8" class="ta-l">

            <p class="p1" ><span class="c1">提现方式</span>　{{ (driver_exp_account.type == 1) ? '支付宝' : ''}}</p>
           
            <p class="p1" ><span class="c1">评分情况</span>　{{driver.score}}分</p>            
            <p class="p1" ><span class="c1">状态</span>　{{selectDate[driver.state]}}
            <stateBtn @changeState="changeState" :selectDate="selectDate" :scope = "scope"  />
            </p>            
         </el-col>             
         <el-col :span="8" class="ta-l">      
            <p class="p1 " ><span class="c1">账号</span>　{{driver_exp_account.account}}</p>
            <p class="p1 " ><span class="c1">名字</span>　{{driver_exp_account.nickname}}</p>            
         </el-col>         
      </el-row>
    </el-card>

    <div class="line3"></div>
<div class="box box-time" v-if="false">
      <h3>操作日志</h3>
      <div class="ct">
        <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
        <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
        <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
      </div>      

     
    </div>
    <div class="line3"></div>

<el-dialog
  title=""
  :visible.sync="dialogVisible"
  width="90%" :fullscreen="false"
  >
  <div style="text-align:center;">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background:#eee; width:500px; height:500px;" alt="" />
  </div>
<!--   <span slot="footer" class="dialog-footer"> -->
<!--     <el-button @click="dialogVisible = false">取 消</el-button> -->
<!--     <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
<!--   </span> -->
</el-dialog>




  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      visible1: false,
      dialogVisible: false,
      driver: {},
      driver_cert: {},
      driver_exp_account: {},
      scope: {
        row: {
          id: "",
          state: ""
        }
      }
    };
  },
  computed: {
    ...mapState("driver", ["selectDate"])
  },
  created() {
    var sendData = {
      id: this.$route.query.id
    };

    this.$store.dispatch("driver/show", sendData).then(data => {
      this.driver = data.driver;
      this.driver_cert = data.driver_cert;
      this.driver_exp_account = data.driver_exp_account || null;
      // this.driver_exp_account = null;

      this.scope.row.id = this.$route.query.id.toString();
      this.scope.row.state = this.driver.state;
    });
  },
  methods: {
    changeState(val, scope) {
      this.$store
        .dispatch("driver/audit", { id: scope.row.id, state: _.toInteger(val) })
        .then(data => {
          this.driver.state = val;
        });
    },
    change() {
      this.dialog = false;
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.btn-change {
  margin-left: 10px;
}
</style>