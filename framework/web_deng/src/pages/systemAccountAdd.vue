<template>
  <div class="system-account-add">
    <div class="box">
      <el-form class="form" label-position="right" label-width="80px" :model="create">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="box-base">
              <h3 class="title3">基本信息</h3>

              <el-form-item label="用户名">
                <el-input v-model="create.account"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="create.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="create.nickname"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="create.mobile"></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <el-radio-group v-model="create.state">
                  <el-radio :label="1">可用</el-radio>
                  <el-radio :label="0">不可用</el-radio>
                </el-radio-group>
              </el-form-item>

            </div>
          </el-col>
          <el-col :span="24">
            <div class="box-set">
              <h3 class="title3">权限设置</h3>
              <el-tabs type="border-card" value="first" @tab-click="handleClick">
                <el-tab-pane label="角色" name="first">
                  <el-radio-group v-model="create.group_id">
                    <el-radio class="rolecalss" v-for="item in rolelist" :key="item.id" :label="item.id">{{item.title}}</el-radio>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane label="权限" name="second">
                  <el-checkbox :indeterminate="true" @change="handleCheckAllChange">用户管理</el-checkbox>
                  <el-checkbox-group class="itemgroup">
                    <el-checkbox label="审核"></el-checkbox>
                    <el-checkbox label="删除"></el-checkbox>
                    <el-checkbox label="修改"></el-checkbox>
                  </el-checkbox-group>


                  <el-checkbox :indeterminate="true" @change="handleCheckAllChange">订单管理</el-checkbox>
                  <el-checkbox-group class="itemgroup">
                    <el-checkbox label="审核"></el-checkbox>
                    <el-checkbox label="删除"></el-checkbox>
                    <el-checkbox label="修改"></el-checkbox>
                  </el-checkbox-group>

                  <el-checkbox :indeterminate="true" @change="handleCheckAllChange">消息管理</el-checkbox>
                  <el-checkbox-group class="itemgroup">
                    <el-checkbox label="添加"></el-checkbox>
                    <el-checkbox label="编辑"></el-checkbox>
                    <el-checkbox label="推送"></el-checkbox>
                  </el-checkbox-group>

                  <el-checkbox :indeterminate="true" @change="handleCheckAllChange">评价管理</el-checkbox>


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


        <el-button type="primary" @click="save" class="save-btn" size="medium">添加</el-button>





      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: '',
    data() {
      return {
        rolelist: []
      }
    },
    computed: {
      ...mapState('admin', ['create'])
    },
    created() {
      this.$store.dispatch('adminGroup/list', {
        count: 100
      }).then(data => {
        this.rolelist = data.list
      })
    },
    methods: {
      save() {
        console.log(this.create);
        this.$store.dispatch('admin/create', this.create).then(data => {
          this.$alert('添加成功', '', {
            confirmButtonText: '确定',
            type: 'success',
            callback: action => {
              this.$router.back();
            }
          });
        })
      },
      handleClick() {

      },
      handleCheckAllChange() {

      }
    },
    mounted: function () {}
  }

</script>

<style lang="less" scoped>
  .box-base{
    width: 300px;
  }
  .itemgroup {
    padding-left: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .save-btn {
    margin-top: 20px;
  }

  .rolecalss {
    margin-left: 20px;
    width: 140px;
    margin-bottom: 10px;
  }

</style>
