<template>
  <div class="user-driver-lable user-maker-lable">
    <el-row type="flex" class="wrap">
      <el-col :span="4" class="left-side">

        <ul class="list">
          <li @click="lableItem()" :class="{active: showLable.res.id==0}">全部&nbsp;({{lablePager.total}})</li>
          <li v-for="item in lablePager.res" :class="{active: showLable.res.id==item.id}" :key="item.id" @click="lableItem(item)">{{item.title}}&nbsp;({{item.total}})</li>
        </ul>
        <pnation :currentPage="lablePager.page" v-if="lablePager.total > lablePager.count" @changePage="changeLablePage" :total="lablePager.total"
          :size="lablePager.count"></pnation>
      </el-col>

      <el-col :span="20" class="right-side">
        <div class="rside-inside">
          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                  <el-input v-model="tagsMakerList.mobile" placeholder="手机号码"></el-input>
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
            <el-col :span="24" v-loading="loadingLable" element-loading-background="rgba(255, 255, 255, 0.5)">
              <div class="hd-ctrl clearfix">
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
                <div>
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

                </div>
              </el-popover>
              <div class="line1"></div>
              <div class="hd hd-left">
                <!-- <el-checkbox>全选</el-checkbox>; -->
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> &nbsp;&nbsp;&nbsp;
                <el-button size="mini" :disabled="visibleCheckListLable" v-popover:popover1>打标签</el-button>
              </div>

              <el-table class="table-nobderheader" :show-header="false" border :data="tagsMakerList.res" row-class-name="user-list" ref="labelListref"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="35">

                </el-table-column>
                <el-table-column prop="" label="" width="70">
                  <template slot-scope="scope">
                    <img :src="scope.row.portrait" alt="" />
                  </template>
                </el-table-column>

                <el-table-column prop="" label="" width="">
                  <template slot-scope="scope">
                    手机号码 : {{scope.row.mobile}}
                    <br />
                    <div class="labelground">
                      <el-button v-for="item in scope.row.tags" type="success" plain class="labelitem" :key="item.id" size="mini">{{item.tag_title}}</el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="180">
                  <template slot-scope="scope">
                    所属平台 :
                   
                      <span v-for="item in scope.row.platform_list"   :key="item.id" size="mini">{{item.platform_title}}</span>
                   
                    <!-- <span v-for="(item,index) in scope.row.platform_list" :key="index">&nbsp;{{item.platform_title}}</span> -->
                  </template>
                </el-table-column>
              </el-table>
              <pnation :total="tagsMakerList.total" v-if="tagsMakerList.total > 0" :size="tagsMakerList.count" :currentPage="tagsMakerList.page"
                @changePage="changePage"></pnation>
            </el-col>
          </el-row>

        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from "vuex";

  import RegionJson from "../assets/json/region.json";

  export default {
    name: "",
    data() {
      return {
        isIndeterminate: false,
        checkAll: false,
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
        "tagsMakerList",
        "tagsMakerBind",
        "tagsMakerUnbind"
      ]),
      ...mapGetters("tags", ["conditionsMaker"])
    },
    watch: {
      visibleRnameLable() {
        this.rNameLableVal = this.showLable.res.title;
      }
    },
    created() {
      this.loadLable();
      // console.log(RegionJson);
      this.$store.dispatch("tags/tagsMakerList");
      this.RegionJson = RegionJson;
      // this.loadLableShow();
      // this.lableItem()      
    },
    methods: {
      search() {
        this.$store.dispatch("tags/tagsMakerList");
      },
      handleCheckAllChange(val) {
        // this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        if (val) {
          this.tagsMakerList.res.forEach(item => {
            this.$refs.labelListref.toggleRowSelection(item, true);
          });
        } else {
          this.tagsMakerList.res.forEach(item => {
            this.$refs.labelListref.toggleRowSelection(item, false);
          });
        }
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
        if (item.length == 0) {
          this.isIndeterminate = false;
        } else if (item.length == this.tagsMakerList.res.length) {
          this.isIndeterminate = false;
        } else {
          this.isIndeterminate = true;
        }

        this.tableSelect = item;
      },
      changePage(pager) {
        this.tagsMakerList.page = pager;
        this.$store.dispatch("tags/tagsMakerList");
      },
      rNameLable() {
        var sendDate = {
          id: this.showLable.res.id,
          title: this.rNameLableVal,
          type: 2
        };
        this.$store.dispatch("tags/update", sendDate).then(data => {
          this.loadLable();
          this.showLable.res.title = this.rNameLableVal;
          this.changePage(this.tagsMakerList.page);
          this.visibleRnameLable = false;
        });
      },
      delLable() {
        var sendDate = {
          id: this.showLable.res.id,
          type: 2
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
          type: 2
        };
        this.$store.dispatch("tags/create", sendDate).then(data => {
          this.loadLable(this.lablePager.page);
          this.create.title = "";
          this.visibleCreateLable = false;
        });
      },

      lableItem(item) {
        this.checkAll = false;

        if (item) {
          this.tagsMakerList.tags_id = item.id;
          this.showLable.res = item;
        } else {
          this.tagsMakerList.tags_id = "";
          this.showLable.res = {
            id: 0
          };
        }

        this.tagsMakerList.page = 1;
        this.tagsMakerList.total = 1;
        this.$store.dispatch("tags/tagsMakerList").then(data => {
          if (item) {} else {
            this.tagsMakerListAll = this.tagsMakerList.res;
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
              maker_id: item.id
            });
          });

          item.tagsDel.map(subItem => {
            arrDel.push({
              tags_id: subItem,
              maker_id: item.id
            });
          });
        });

        this.tagsMakerBind.tags_maker = JSON.stringify(arrAdd);
        this.tagsMakerUnbind.tags_maker = JSON.stringify(arrDel);

        this.loadingLable = true;

        if (arrAdd.length > 0) {
          this.$store.dispatch("tags/tagsMakerBind").then(data => {
            if (this.tableSelect.length <= 1 && arrDel.length > 0) {
              this.$store.dispatch("tags/tagsMakerUnbind").then(data => {
                this.loadingLable = false;
                this.changePage(this.tagsMakerList.page);
                this.loadLable(this.lablePager.page);
                this.visible1 = false;
              });
            } else {
              this.loadingLable = false;
              this.changePage(this.tagsMakerList.page);
              this.loadLable(this.lablePager.page);
              this.visible1 = false;
            }
          });
        } else {
          if (arrDel.length > 0) {
            this.loadingLable = false;
            this.$store.dispatch("tags/tagsMakerUnbind").then(data => {
              this.changePage(this.tagsMakerList.page);
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
        //     this.tagsMakerBind.tags_maker
        //   })
        // }
      },

      changeLablePage(pager) {
        this.lablePager.page = pager;
        this.loadLable();
      },
      loadLable() {
        var sendDate = {
          type: 2,
          page: this.lablePager.page,
          count: this.lablePager.count,
          total: 1
        };
        this.$store.dispatch("tags/labelList", sendDate).then(data => {
          this.lablePager.res = data.list;
          this.lablePager.total = data.list_total || this.lablePager.total;
          this.checkAll = false;
        });
      }
    },
    mounted: function () {
      console.log(this.$refs.labelListref);
    }
  };

</script>

<style lang="less" scoped>
  .user-driver-lable {
    height: 100%;
    display: flex;
    width: 100%;
    .wrap {
      width: 100%;
    }
  }

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
    margin-left: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: default;
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

  .pingtai-item {
    margin-right: 20px;
    display: inline-box;
  }

  .hd-left {
    position: relative;
    z-index: 10;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .hd-ctrl {
    height: 40px;
    line-height: 40px;
  }

  .rside-inside {
    background: #fff;
    padding: 20px;
    margin-left: 20px;
    margin-right: -20px;
  }

  .left-side {
    background: #fff;
    margin: -20px;
    margin-right: 0;
    border-right: 1px solid #eee;
    .list {
      li {
        padding: 13px 20px;
        margin-bottom: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: none;
        border-radius: 0;
        color: #76838f;
        box-sizing: border-box;
        line-height: 22px;
      }
      li:hover,
      li.active {
        color: #62a8ea;
        background-color: #f3f7f9;
        border: none;
        cursor: pointer;
      }
    }
  }

  .labelground {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 10px;
  }

</style>
