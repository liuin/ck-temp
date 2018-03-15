<template>
  <div class="system-account-add">

    <div class="box">
      <el-form class="form" label-position="right" label-width="80px" :model="update" :rules="validRules" ref="form1">


        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box-base">
              <h3 class="title3">基本信息</h3>

              <el-form-item label="用户名" prop="account">
                <el-input v-model="update.account"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="update.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="nickname">
                <el-input v-model="update.nickname"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="update.mobile"></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <el-radio-group v-model="update.state">
                  <el-radio :label="1">可用</el-radio>
                  <el-radio :label="0">不可用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save" class="save-btn" size="medium">保存资料</el-button>
              </el-form-item>
            </div>
          </el-col>
          <div class="line2"></div>
          <el-col :span="24">
            <div class="box-set">
              <h3 class="title3">权限设置</h3>
              <el-tabs type="border-card" value="first" @tab-click="handleClick" v-loading = "rolelist.length == 0 || dataTree.length == 0">
                <el-tab-pane label="角色" name="first">
                  <el-radio-group v-model="update.group_id">
                    <el-radio class="rolecalss" v-for="item in rolelist" :key="item.id" :label="item.id">{{item.title}}</el-radio>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane label="权限" name="second">

                    <el-tree :check-strictly="false" v-if="dataTree.length>0" :data="dataTree" node-key="id" @check="clickTree" :props="defaultPropsTree"
                      ref="tree" show-checkbox :default-expand-all="false" :default-expanded-keys="defaultExpandedKeys"></el-tree>


                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <!--     <el-col :span="24" v-if="$route.query.eidt"> -->
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
        <div class="line2"></div>
        <el-button type="primary" @click="onSubmitRole" class="save-btn" size="medium">保存权限</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validator } from "../store/modules/validator.js";
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      rolelist: [],
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
  mixins: [validator],
  computed: {
    ...mapState("admin", ["update"])
  },
  created() {
    this.$store
      .dispatch("adminGroup/list", {
        count: 100
      })
      .then(data => {
        this.rolelist = data.list;
      });

    this.$store
      .dispatch("admin/show", {
        id: this.$route.query.id
      })
      .then(data => {
        console.log(data);
      });

    this.$store
      .dispatch("adminGroup/sysMenuListInAccessByAdmin", {
        admin_id: this.$route.query.id
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
    save() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          this.$store.dispatch("admin/update", this.update).then(data => {
            this.$alert("编辑成功", "", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$router.back();
              }
            });
          });
        }
      });
    },
    onSubmitRole() {
      this.$store
        .dispatch("adminGroup/adminSaveMenuAccess", {
          id: this.$route.query.id,
          group_id: this.update.group_id,
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
.box-base {
  width: 300px;
}

.itemgroup {
  padding-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.save-btn {
  margin-top: 0px;
}

.rolecalss {
  margin-left: 20px;
  width: 140px;
  margin-bottom: 10px;
}
</style>
