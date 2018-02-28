<template>
  <div class="system-account">


    <div class="box">
      <el-popover v-model="popoverVisible" ref="popover2" placement="top" width="160">
        <div>
          分类名称:
          <div class="line1"></div>
          <el-input v-model="create.title" size="mini"></el-input>
        </div>

        <div class="line1"></div>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="saveCate()">保存</el-button>
        </div>
      </el-popover>
      <el-button icon="el-icon-edit" type="primary" size="medium" v-popover:popover2 class="btn-edit">添加分类</el-button>
      <div class="line2"></div>
      <el-table :data="list.res" border>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="分类名称"></el-table-column>
        <el-table-column prop="total" label="当前文章数"></el-table-column>
        <el-table-column prop="" label="操作">

          <template slot-scope="scope">
            <articleCateEditBtn :scope="scope" @edit="editCate"></articleCateEditBtn>
          </template>
        </el-table-column>
      </el-table>

      <pnation v-if="list.total>0" :currentPage="list.page" :total="list.total" @changePage="changePage" :size="list.count"></pnation>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import articleCateEditBtn from "@/components/articleCateEditBtn.vue";

  export default {
    name: "",
    data() {
      return {
        cateValue: "",
        popoverVisible: false
      };
    },
    components: {
      articleCateEditBtn
    },
    created() {
      this.getCate();
    },
    computed: {
      ...mapState("articleCategory", ["list", "create", "update"])
    },
    methods: {
      saveCate() {
        this.$store
          .dispatch("articleCategory/create", {
            title: this.create.title
          })
          .then(data => {
            this.getCate();
            this.popoverVisible = false;
            this.create.title = "";
          });
      },
      editCate(value, scope) {
        var sendDate = {
          id: scope.row.id,
          title: value
        }
        this.$store.dispatch('articleCategory/update', sendDate).then(data => {
          scope.row.title = value
        })
      },
      changePage(pager) {
        this.list.page = pager;
        this.getCate(pager);
      },
      getCate(pager) {
        if (pager) {
          var sendDate = {
            page: pager,
            count: this.list.count,
            total: this.list.total
          };
        } else {
          var sendDate = {
            page: this.list.page,
            count: this.list.count,
            total: 1
          };
        }
        this.$store.dispatch("articleCategory/list", sendDate).then(data => {
          this.list.total = data.list_total || this.list.total;
          this.list.res = data.list;
        });
      }
    },
    mounted: function () {}
  };

</script>

<style lang="less" scoped>
  .btn-edit {
    display: block;
  }

</style>
