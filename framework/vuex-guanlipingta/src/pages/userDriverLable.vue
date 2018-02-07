<template>
  <div class="user-driver-lable">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>

    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查　询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="3">
        <el-popover ref="popover1" placement="bottom" v-model="visibleCreateLable" width="160">
          <h4 style="margin:0">标签名称</h4>
          <div class="line1"></div>
          <el-input v-model="create.title"></el-input>
          <div class="line1"></div>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleCreateLable = false">取消</el-button>
            <el-button type="primary" size="mini" @click="createLable()">确定</el-button>
          </div>
        </el-popover>

        <el-button type="primary" v-popover:popover1 @click="visibleCreateLable = true" class="btn-new" icon="el-icon-edit">新建标签</el-button>
      </el-col>
    </el-row>

    <div class="line3"></div>

    <el-row type="flex" :gutter="20" justify="space-between">
      <el-col :span="17">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>&nbsp;
            <template v-if="showLable.res.id !== 0">
              <span class="labeltxt">{{showLable.res.title}}</span>
              <el-popover ref="popover2" placement="bottom" v-model="visibleRnameLable" width="160">
                <h4 style="margin:0">标签名称</h4>
                <div class="line1"></div>
                <el-input v-model="rNameLableVal"></el-input>
                <div class="line1"></div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleRnameLable = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="rNameLable">确定</el-button>
                </div>
              </el-popover>

              <el-popover ref="popover3" placement="bottom" v-model="visibleDelLable" width="160">
                <p>确定删除吗?</p>                
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visibleDelLable = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="delLable">确定</el-button>
                </div>
              </el-popover>

              <el-button v-popover:popover2>重命名</el-button>
              <el-button v-popover:popover3  type="danger" >删除</el-button>
            </template>
            <template v-else>
              <span>全部司机方用户</span>
            </template>

          </div>
          <el-popover ref="popover1" placement="top" class="popover1" width="425" v-model="visible1">
            <div class="checkbox-box">
              <el-checkbox>标签一</el-checkbox>
              <el-checkbox>标签二</el-checkbox>
              <el-checkbox>标签一签一</el-checkbox>
              <el-checkbox>标签二标签二</el-checkbox>
              <el-checkbox>标签一</el-checkbox>
              <el-checkbox>标签二sdf</el-checkbox>
              <el-checkbox>标签一</el-checkbox>
              <el-checkbox>标签二fdf</el-checkbox>
            </div>
            <div class="line2"></div>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible1 = false">确定</el-button>
            </div>
          </el-popover>
          <div class="hd">
            <el-checkbox>全选</el-checkbox>&nbsp;&nbsp;&nbsp;
            <el-button size="mini" v-popover:popover1>选择标签</el-button>
          </div>
          <div class="line1"></div>
          <el-table :data="pager.res" :show-header="false">
            <el-table-column prop="" label="" width="25">
              <template slot-scope="scope">
                <el-checkbox></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="" label="" width="70">
              <template slot-scope="scope">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="width:50px; height:50px; background:#eee;display:block;"
                  alt="" />
              </template>
            </el-table-column>
            <el-table-column prop="" label="" width="100">
              <template slot-scope="scope">
                姓名 : XXX
                <br /> 标签一
              </template>
            </el-table-column>
            <el-table-column prop="" label="" width="200">
              <template slot-scope="scope">
                手机号码 : 1243959559
              </template>
            </el-table-column>
            <el-table-column prop="" label="">
              <template slot-scope="scope">
                所属城市 : 广州
              </template>
            </el-table-column>
          </el-table>
          <pnation :total="10" :size="7"></pnation>
        </el-card>

      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>&nbsp;
            <span>全部(130)</span>
          </div>
          <ul class="list">
            <li v-for="item in lablePager.res" :class="{active: showLable.res.id==item.id}" :key="item.id" @click="lableItem(item)">{{item.title}}</li>
          </ul>
          <pnation :currentPage="lablePager.page" v-if="lablePager.total > lablePager.count" @changePage="changeLablePage" :total="lablePager.total"
            :size="lablePager.count"></pnation>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from "vuex";

  export default {
    name: "",
    data() {
      return {
        visibleCreateLable: false,
        visibleRnameLable: false,
        rNameLableVal: "",
        visibleDelLable: false,
        visible1: false,
        dialogVisible: false,
      };
    },
    computed: {
      ...mapState("tags", [
        "lablePager",
        "labelList",
        "pager",
        "type",
        "create",
        "showLable"
      ])
    },
    watch:{
      visibleRnameLable(){
        this.rNameLableVal = this.showLable.res.title
      }
    },
    created() {
      this.loadLable();
      // this.loadLableShow();
      console.log(this.lablePager.page);
    },
    methods: {
      rNameLable(){
        var sendDate = {
          id: this.showLable.res.id,
          title: this.rNameLableVal,
          type:1
        }
        this.$store.dispatch('tags/update', sendDate).then(data => {
          this.loadLable()
          this.showLable.res.title = this.rNameLableVal
          this.visibleRnameLable = false
        })
      },
      delLable(){
        var sendDate = {
          id: this.showLable.res.id,
          type:1
        }
        this.$store.dispatch('tags/labelDestroy', sendDate).then(data => {
          this.showLable.res.title = ""
          this.showLable.res.id = 0
          this.visibleDelLable = false
          this.loadLable()
        })          
      },    
      createLable() {
        var sendDate = {
          title: this.create.title,
          type: 1
        };
        this.$store.dispatch("tags/create", sendDate).then(data => {
          this.loadLable(this.lablePager.page);
          this.create.title = "";
          this.visibleCreateLable = false;
        });
      },

      lableItem(item) {
        this.showLable.res = item;
      },
      changeLablePage(pager) {
        this.lablePager.page = pager;
        this.loadLable();
      },
      loadLable() {
        var sendDate = {
          type: 1,
          page: this.lablePager.page,
          count: this.lablePager.count,
          total: 1
        };
        this.$store.dispatch("tags/labelList", sendDate).then(data => {
          this.lablePager.res = data.list;
          this.lablePager.total = data.list_total || this.lablePager.total;
        });
      }
    },
    mounted: function () {}
  };

</script>

<style lang="less" scoped>
.labeltxt {
  display: inline-block;
  min-width: 100px;
  margin-right: 10px;
}

.title {
  margin: 0;
  font-weight: normal;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  font-size: 16px;
}

.checkbox-box {
  overflow: hidden;
  label {
    width: 100px;
    float: left;
    padding: 0 10px;
    margin: 0 10px;
    height: 25px;
    overflow: hidden;
    /* text-overflow: ellipsis; */
  }
}

.btn-new {
  display: block;
  margin-left: auto;
}

.el-card {
  // height: 100%;
}

.list {
  font-size: 14px;
  line-height: 30px;
  li {
    cursor: pointer;
    padding: 0 10px;
    &:hover,
    &.active {
      background: #f5f7fa;
    }
  }
}
</style>
