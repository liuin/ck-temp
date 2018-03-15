<template>
  <div class="system-account-add">

    <div class="box">
      <el-form class="form" label-position="right" label-width="80px" :model="update">


        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box-base" v-loading="$store.state.ajaxLoad">
              <h3 class="title3">基本信息</h3>
              <el-form-item label="角色名">
                <el-input v-model="update.title"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio v-model="update.state" :label="1">可用</el-radio>
                <el-radio v-model="update.state" :label="0">不可用</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="save-btn" size="medium" @click="onSubmit">编辑资料</el-button>
              </el-form-item>
              <div class="line2"></div>
            </div>
          </el-col>



          <el-col :span="24">
            <div v-loading="$store.state.ajaxLoad || dataTree.length==0">
              <h3 class="title3">选择权限</h3>
              <!-- <el-tabs type="border-card" value="用户管理" @tab-click="handleClick" v-loading="_.isEmpty(authorityList)"> -->
              <el-tabs type="border-card" value="权限">

                <el-tab-pane name="权限" label="权限">
                  <template>
                    <el-tree :check-strictly="false" v-if="dataTree.length>0" :data="dataTree" node-key="id" @check="clickTree" :props="defaultPropsTree"
                      ref="tree" show-checkbox :default-expand-all="false" :default-expanded-keys="defaultExpandedKeys"></el-tree>
                  </template>
                </el-tab-pane>


                <!--       <el-tab-pane label="用户管理" name="first" > -->
                <!--         <el-checkbox-group > -->
                <!--           <el-checkbox  label="2" >审核</el-checkbox> -->
                <!--           <el-checkbox label="5" >删除</el-checkbox> -->
                <!--         </el-checkbox-group> -->
                <!--       </el-tab-pane> -->
                <!--       <el-tab-pane label="订单管理" name="second"> -->
                <!--         <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">用户管理</el-checkbox>         -->
                <!--         <el-checkbox-group class="itemgroup" >           -->
                <!--           <el-checkbox  label="4" >审核</el-checkbox> -->
                <!--           <el-checkbox label="3" >删除</el-checkbox>           -->
                <!--         </el-checkbox-group> -->
                <!--       </el-tab-pane>  -->
              </el-tabs>
              <div class="line2"></div>
              <el-button type="primary" class="save-btn" size="medium" @click="onSubmitRole">编辑权限</el-button>

            </div>

          </el-col>
          <!--     <el-col :span="24" v-if="$route.query.edit"> -->
          <el-col :span="24" v-if="false">
            <div class="box box-time">
              <h3>操作日志</h3>
              <div class="ct">
                <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
                <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
                <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
              </div>


            </div>
          </el-col>
        </el-row>








      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      authorityList: [],
      authorityArr: [],
      postTreeDate: [],
      defaultExpandedKeys: [],
      baseMenusOnSelected: "",
      rootId: [],
      dataTree: [
        // {
        //   id: 1,
        //   label: "一级 1",
        //   children: [
        //     {
        //       id: 2,
        //       label: "二级 1-1",
        //       pid: 1
        //     }
        //   ]
        // },
        // {
        //   id: 3,
        //   label: "一级 2",
        //   children: [
        //     {
        //       id: 4,
        //       label: "二级 2-1",
        //       pid: 3
        //     },
        //     {
        //       id: 5,
        //       label: "二级 2-2",
        //       pid: 3
        //     }
        //   ]
        // },
        // {
        //   id: 6,
        //   label: "一级 3",
        //   children: [
        //     {
        //       id: 7,
        //       label: "二级 3-1",
        //       pid: 6
        //     },
        //     {
        //       id: 8,
        //       label: "二级 3-2",
        //       pid: 6
        //     }
        //   ]
        // }
      ],
      defaultPropsTree: {
        children: "sub",
        label: "title"
      }
    };
  },
  computed: {
    ...mapState("adminGroup", ["update", "show"])
  },
  created() {
    if (this.$route.query.id) {
      //        this.$store.commit('setState', [{'show.id': this.$route.query.id}, this.$store.state.adminGroup])
      this.$store.dispatch("adminGroup/show", {
        id: this.$route.query.id
      });
    }

    this.$store
      .dispatch("adminGroup/sysMenuListInAccessByGroup", {
        group_id: this.$route.query.id
      })
      .then(data => {
        var list = [];
        data.list.forEach(item => {
          this.rootId.push(item.id);
          var listNew = {
            id: item.id,
            title: item.title,
            sub: []
          };
          if (item.sub.length > 0) {
            item.sub.forEach(itemSub => {
              var itemSubNew = {
                id: itemSub.id,
                title: itemSub.title
              };
              listNew.sub.push(itemSubNew);
            });
          }
          list.push(listNew);
        });
        this.dataTree = list;

        setTimeout(() => {
          this.baseMenusOnSelected = data.menusOnSelected.split(",");
          // console.log(this.$refs.tree);
          var df = this.api.filetrArr(this.baseMenusOnSelected, this.rootId);
          // console.log(df);
          // console.log(df);
          this.$refs.tree.setCheckedKeys(df.arr);
          this.defaultExpandedKeys = df.flArr;
        }, 100);
      });
  },
  methods: {
    clickTree(val, itemState) {
      var getArr = [];
      getArr = itemState.checkedKeys;
      getArr = getArr.concat(itemState.halfCheckedKeys);
      this.postTreeDate = getArr;
    },
    onSubmit() {
      if (this.$route.query.id) {
        this.$store.dispatch("adminGroup/update", this.update).then(data => {
          this.$alert("修改资料成功", "", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$router.back();
            }
          });

          return;
        });
      }
    },
    onSubmitRole() {
      this.$store
        .dispatch("adminGroup/sysmenuSaveMenuAccess", {
          id: this.$route.query.id,
          menus: this.postTreeDate.toString()
        })
        .then(data => {
          this.$alert("修改权限成功", "", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$router.back();
            }
          });
        });
    },
    handleClick() {},
    handleCheckAllChange() {}
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.itemgroup {
  padding-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.save-btn {
  margin-top: 0px;
}

.box-base {
  width: 300px;
}
</style>
