<template>
  <div class="message-list">
    <div class="box">
      <el-table  width="100%" border :data="templateListRes"  v-loading="loading">
        <el-table-column prop="id" label="ID" width="40"></el-table-column>      
        <el-table-column prop="title" label="标题" ></el-table-column>      
        <el-table-column prop="message_category_title" label="分类" ></el-table-column>  
        <el-table-column prop="" label="保存时间"  >
          <template slot-scope="scope">
            {{api.toTime(scope.row.modify)}}
          </template>
          </el-table-column> 
  
        <el-table-column prop="" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini"  @click="$router.push({path: '/message/listEdit', 'query': {'id': scope.row.id}})">编辑</el-button>
            <!-- <el-button size="mini" type="danger" >删除</el-button> -->
            <delBtn @del="del(scope)" class="delbtn"></delBtn>
          </template>
        </el-table-column>
      </el-table>
      <pnation v-if="templateList.total != 0" :total="templateList.total" @changePage="changePage" :size="templateList.count"></pnation>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "messagedrafts",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState("message", [
      "templateList",
      "templateListRes",
      "templateDestroyDraft"
    ])
  },
  created() {
    this.templateList.page = 1;
    this.templateList.state = 1;
    this.loading = true;
    this.$store.dispatch("message/templateList").then(data => {
      this.loading = false;
      console.log(this.templateListRes);
    });
  },
  methods: {
    changePage(val) {
      this.loading = true;
      this.templateList.page = val || this.templateList.page;
      this.$store.dispatch("message/templateList").then(data => {
        this.loading = false;
      });
    },
    del(scope) {
      this.templateDestroyDraft.id = scope.row.id;
      this.$store.dispatch("message/templateDestroyDraft").then(data => {
        this.changePage();
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.delbtn {
  display: inline-block;
}
</style>