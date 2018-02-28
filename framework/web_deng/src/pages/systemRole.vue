<template>
  <div class="system-account-add">    
    <div class="box">
      <el-button size="medium" type="primary" class="add-btn" @click="addBtn">添加角色</el-button>
      <div class="line2"></div>
      <el-table :data="listData" border v-loading="_.isEmpty(list.res)">
        <el-table-column prop="id" label="账号ID"></el-table-column>
        <el-table-column prop="title" label="角色名"></el-table-column>
        <el-table-column prop="create_user" label="创建人"></el-table-column>
        <el-table-column prop="created" width="200px" label="创建时间"></el-table-column>
        <!--       <el-table-column prop="title" label="权限"> -->
        <!--         <template slot-scope="scope"> -->
        <!--           <router-link class="editrole" :to="{path: '/system/roleAdd', query: {edit: '123'}}">编辑权限</router-link>  -->
        <!--         </template> -->
        <!--       </el-table-column> -->
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span :class="(scope.row.state)? '' : 'waring'">{{(scope.row.state)? '可用' : '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">


            <el-button size="mini" @click=" $router.push({path: '/system/roleEdit', 'query': {'id': scope.row.id}})">编辑</el-button>
            <!--           <el-button -->
            <!--             size="mini" -->
            <!--             type="danger" -->
            <!--             @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <pnation :total="list.totle" @changePage="changePage" :currentPage="list.page" :size="list.count"></pnation>
    </div>

  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";

  export default {
    name: "",
    data() {
      return {
        listData: []
      };
    },
    computed: {
      ...mapState("adminGroup", ["list"])
    },
    created() {
      this.$store.dispatch("adminGroup/total");
      this.loadList()
    },
    methods: {
      loadList() {
        var sendData = {
          page: this.list.page,
          count: this.list.count
          // totle: 1
        }
        this.$store.dispatch("adminGroup/list").then(data => {

          data.list.map(item => {
            item.created = api.toTime(item.created);
          });
          this.list.res = data.list;
          // this.list.totle = data.list_total;
          this.listData = this.list.res
        });
      },
      changePage(pager) {
        this.list.page = pager;
        this.loadList(pager);
      },
      addBtn() {
        this.$router.push("/system/roleAdd");
      },
      handleClick() {},
      handleDelete() {},
      handleEdit(item) {
        console.log(item.row);
        //        $router.push({path: '/system/roleAdd', 'query': {'edit': scope.id}})
      }
    },
    mounted: function () {}
  };

</script>

<style lang="less" scoped>
  .itemgroup {
    padding-left: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .log {
    .p1 {
      font-weight: normal;
      background: #eee;
      padding: 5px;
    }
  }

  .editrole {
    text-decoration: none;
    color: #409eff;
  }

  .save-btn {
    margin-top: 20px;
  }

</style>
