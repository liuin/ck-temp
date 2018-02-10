<template>
  <div class="user-driver-lable">
    <div class="box">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="tagsDriverList.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search()" icon="el-icon-search">查　询</el-button>
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

      <div class="line2"></div>

      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="17" v-loading="loadingLable" element-loading-background="rgba(255, 255, 255, 0.5)">

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
                <el-button v-popover:popover3 type="danger">删除</el-button>
              </template>
              <template v-else>
                <span>全部司机方用户</span>
              </template>

            </div>
            <el-popover ref="popover1" placement="top" class="popover1" width="425" v-model="visible1">
              <div >
                <div class="checkbox-box">
                  <el-checkbox-group v-model="checkListLable">
                    <el-checkbox v-for="item in lablePager.res" :key="item.id" :label="item.id">{{item.title}}</el-checkbox>
                  </el-checkbox-group>
                 
                </div>
                <div class="line2"></div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="changeLable">确定</el-button>
                </div>
  
              </div>            </el-popover>
            <div class="hd hd-left">
              <!-- <el-checkbox>全选</el-checkbox>; -->
              全选&nbsp;&nbsp;&nbsp;<el-button size="mini" :disabled="visibleCheckListLable" v-popover:popover1>打标签</el-button>
            </div>
            <div class="line1"></div>
            <el-table :data="tagsDriverList.res" row-class-name="user-list" ref="labelListref" @selection-change="handleSelectionChange">
              <el-table-column  type="selection"  width="55" >
                 
              </el-table-column>
              <el-table-column prop="" label="" width="70">
                <template slot-scope="scope">
                  <img :src="scope.row.portrait" alt="" />
                </template>
              </el-table-column>
              <el-table-column prop="" label="" width="">
                <template slot-scope="scope">
                  姓名 : {{scope.row.driver_name}}
                  <br />
                  <span v-for="item in scope.row.tags" class="labelitem" :key="item.id">{{item.tag_title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="" width="180">
                <template slot-scope="scope">
                  手机号码 : {{scope.row.mobile}}
                </template>
              </el-table-column>
              <el-table-column prop="" label="" width="180">
                <template slot-scope="scope">
                  所属城市 : {{RegionJson[scope.row.province][scope.row.city]}}
                </template>
              </el-table-column>
            </el-table>
            <pnation :total="tagsDriverList.total" v-if="tagsDriverList.total > 0" :size="tagsDriverList.count" :currentPage="tagsDriverList.page"
              @changePage="changePage"></pnation>
          </el-card>

        </el-col>
        <el-col :span="7">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <i class="el-icon-info"></i>&nbsp;
              <span>
                <el-button type="text" size="medium" @click="lableItem()">全部</el-button>&nbsp;({{lablePager.total}})</span>
            </div>
            <ul class="list">
              <li v-for="item in lablePager.res" :class="{active: showLable.res.id==item.id}" :key="item.id" @click="lableItem(item)">{{item.title}}&nbsp;({{item.total}})</li>
            </ul>
            <pnation :currentPage="lablePager.page" v-if="lablePager.total > lablePager.count" @changePage="changeLablePage" :total="lablePager.total"
              :size="lablePager.count"></pnation>
          </el-card>
        </el-col>
      </el-row>



    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import RegionJson from "../assets/json/region.json";

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
      RegionJson: {},
      checkListLable: [],
      visibleCheckListLable: true,
      listLabel: [],
      tableSelect: [],
      loadingLable: false
    };
  },
  computed: {
    ...mapState("tags", [
      "lablePager",
      "labelList",
      "pager",
      "type",
      "create",
      "showLable",
      "tagsDriverList",
      "tagsDriverBind",
      "tagsDriverUnbind"
    ]),
    ...mapGetters("tags", ["conditionsDriver"])
  },
  watch: {
    visibleRnameLable() {
      this.rNameLableVal = this.showLable.res.title;
    }
  },
  created() {
    this.loadLable();
    // console.log(RegionJson);
    this.$store.dispatch("tags/tagsDriverList");
    this.RegionJson = RegionJson;
    // this.loadLableShow();
    // this.lableItem()
  },
  methods: {
    search(){
      this.$store.dispatch("tags/tagsDriverList");
    },
    handleSelectionChange(item) {
      this.checkListLable = [];
      if (item.length > 0) {
        this.visibleCheckListLable = false;
      } else {
        this.visibleCheckListLable = true;
      }

      if (item.length == 1) {
        // console.log(item,this.checkListLable);
        item[0].tags.map(itemsub => {
          this.checkListLable.push(itemsub.id);
        });
      }

      this.tableSelect = item;
    },
    changePage(pager) {
      this.tagsDriverList.page = pager;
      this.$store.dispatch("tags/tagsDriverList");
    },
    rNameLable() {
      var sendDate = {
        id: this.showLable.res.id,
        title: this.rNameLableVal,
        type: 1
      };
      this.$store.dispatch("tags/update", sendDate).then(data => {
        this.loadLable();
        this.showLable.res.title = this.rNameLableVal;
        this.changePage(this.tagsDriverList.page);
        this.visibleRnameLable = false;
      });
    },
    delLable() {
      var sendDate = {
        id: this.showLable.res.id,
        type: 1
      };
      this.$store.dispatch("tags/labelDestroy", sendDate).then(data => {
        this.showLable.res.title = "";
        this.showLable.res.id = 0;
        this.visibleDelLable = false;
        this.loadLable();
        this.lableItem();
      });
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
      if (item) {
        this.tagsDriverList.tags_id = item.id;
        this.showLable.res = item;
      } else {
        this.tagsDriverList.tags_id = "";
        this.showLable.res = {
          id: 0
        };
      }

      this.tagsDriverList.page = 1;
      this.tagsDriverList.total = 1;
      this.$store.dispatch("tags/tagsDriverList").then(data => {
        if (item) {
        } else {
          this.tagsDriverListAll = this.tagsDriverList.res;
        }
      });
    },
    changeLable() {
      var arrDel = [];
      var arrAdd = [];

      var changeLable = [];

      this.tableSelect.map(item => {
        var obj = {
          id: item.id,
          tags: [],
          tagsAdd: [],
          tagsDel: []
        };

        item.tags.map(subitem => {
          // selectarr.push(subitem.id);
          obj.tags.push(subitem.id);
        });

        obj.tagsAdd = this._.difference(this.checkListLable, obj.tags);

        if (this.tableSelect.length <= 1) {
          obj.tagsDel = this._.difference(obj.tags, this.checkListLable);
        }
        changeLable.push(obj);
      });

      changeLable.map(item => {
        item.tagsAdd.map(subItem => {
          arrAdd.push({
            tags_id: subItem,
            driver_id: item.id
          });
        });

        item.tagsDel.map(subItem => {
          arrDel.push({
            tags_id: subItem,
            driver_id: item.id
          });
        });
      });

      this.tagsDriverBind.tags_driver = JSON.stringify(arrAdd);
      this.tagsDriverUnbind.tags_driver = JSON.stringify(arrDel);

      this.loadingLable = true;

      if (arrAdd.length > 0) {
        this.$store.dispatch("tags/tagsDriverBind").then(data => {
          if (this.tableSelect.length <= 1 && arrDel.length > 0) {
            this.$store.dispatch("tags/tagsDriverUnbind").then(data => {
              this.loadingLable = false;
              this.changePage(this.tagsDriverList.page);
              this.loadLable(this.lablePager.page);
              this.visible1 = false;
            });
          } else {
            this.loadingLable = false;
            this.changePage(this.tagsDriverList.page);
            this.loadLable(this.lablePager.page);
            this.visible1 = false;
          }
        });
      } else {
        if (arrDel.length > 0) {
          this.loadingLable = false;
          this.$store.dispatch("tags/tagsDriverUnbind").then(data => {
            this.changePage(this.tagsDriverList.page);
            this.loadLable(this.lablePager.page);
            this.visible1 = false;
          });
        } else {
          this.loadingLable = false;
          this.visible1 = false;
        }
      }

      // if (getLable.length == 1) {
      //   arrAdd = this._.difference(this.checkListLable, getLable[0]);
      //   // console.log( this._.difference(['a', 'b'], ["a"]));
      //   arrAdd.map((item, index) =>{
      //     this.tagsMakerBind.tags_driver
      //   })
      // }
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
  mounted: function() {
    console.log(this.$refs.labelListref);
  }
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
.labelitem {
  color: #409eff;
  border: 1px solid #409eff;
  display: inline-block;
  border-radius: 6px;
  line-height: 17px;
  padding: 0 9px;
  margin-right: 10px;
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

.list {
  font-size: 14px;
  line-height: 30px;
  li {
    color: #409eff;
    cursor: pointer;
    padding: 0 10px;
    &:hover,
    &.active {
      background: #f5f7fa;
    }
  }
}
.hd-left {
  position: relative;
  z-index: 10;
  margin-left: 31px;
  margin-bottom: -43px;
}

</style>
