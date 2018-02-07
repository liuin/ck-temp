<template>
  <div class="system-account">
    <breadcrumb></breadcrumb>

    <div class="line3"></div>

    <div class="w1000">
      <el-form label-width="80px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="选择分类">
              <el-select v-model="articleList.category_id">
                <el-option v-for="item in list.res" :value="item.id" :label="item.title" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文章标题">
              <el-input v-model="articleList.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者">
              <el-input v-model="articleList.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="">
          <el-button icon="el-icon-search" @click="seach" class="btn-save" type="primary">搜　索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="line3"></div>

    <el-button icon="el-icon-edit" @click="$router.push({path: '/article/listAdd'})" class="btn-edit">添加文章</el-button>
    <div class="line2"></div>

    <el-table :data="articlePage.res">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="article_category_title" label="分类"></el-table-column>
      <el-table-column prop="" label="发布时间">
        <template slot-scope="scope">
          {{api.toTime(scope.row.modify)}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">

        <template slot-scope="scope">
          <delBtn @del="del(scope.row.id)" />
          <!-- <el-popover ref="popover1"  placement="top"  width="160"  >
                 <p>确定删除?</p>
                 <div class="line2"></div>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="visible1 = false">确定</el-button>
                  </div>
                </el-popover>
                <el-button v-popover:popover1 size="mini"  type="danger">删除</el-button> -->
          <el-button size="mini" @click="$router.push({path: '/article/listEdit', 'query': {'id': scope.row.id}})">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!--         <pnation :size="7" :total="10"></pnation> -->
    <pnation v-if="articlePage.total>0" :total="articlePage.total" @changePage="changePage" :size="articlePage.count"></pnation>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      visible1: false
    };
  },
  computed: {
    ...mapState("articleCategory", ["list", "articleList", "articlePage"]),
    ...mapGetters("articleCategory", ["conditions"])
  },
  created() {
    this.seach();
    this.getCate();
  },
  methods: {
    del(id) {
      var sendDate = {
        id: id
      };

      this.$store
        .dispatch("articleCategory/articleDestroy", sendDate)
        .then(data => {
          this.changePage(1);
        });
    },
    changePage(pager) {
      this.seach(pager);
    },
    getCate() {
      var sendDate = {
        page: this.list.page,
        // count: this.list.count,
        count: 1000,
        total: this.list.total
      };
      this.$store.dispatch("articleCategory/list", sendDate).then(data => {
        this.list.res = data.list;
      });
    },
    seach(pager) {
      if (pager) {
        var sendDate = {
          conditions: this.conditions,
          page: pager,
          count: this.articlePage.count,
          state: 2
        };
      } else {
        var sendDate = {
          conditions: this.conditions,
          page: this.articlePage.page,
          state: 2,
          count: this.articlePage.count,
          total: 1
        };
      }

      this.$store
        .dispatch("articleCategory/articleList", sendDate)
        .then(data => {
          this.articlePage.total = data.list_total || this.articlePage.total;
          this.articlePage.res = data.list;
        });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.btn-edit {
  display: block;
}
</style>
