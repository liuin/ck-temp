<template>
  <div class="system-account">
    
    <div class="box">
      <el-table :data="articlePage.res" border>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="article_category_title" label="分类"></el-table-column>
        <el-table-column label="发布时间">
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
      <pnation v-if="articlePage.total>0" :total="articlePage.total" @changePage="changePage" :size="articlePage.count"></pnation>
    </div>

    


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
    ...mapState("articleCategory", ["list", "articleList", "articlePage"])
  },
  created() {
    this.seach()
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
    seach(pager) {
      if (pager) {
        var sendDate = {
          conditions: this.conditions,
          page: pager,
          count: this.articlePage.count,
          state: 1
        };
      } else {
        var sendDate = {
          conditions: this.conditions,
          page: this.articlePage.page,
          state: 1,
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
