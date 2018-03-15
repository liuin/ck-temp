<template>
  <div class="knowledgeCarType">
    <div class="box">
      <el-tabs value="1" @tab-click="handleClickTag">
        <el-tab-pane label="司机取消订单原因" name="1"></el-tab-pane>
        <el-tab-pane label="厂商取消订单原因" name="2"></el-tab-pane>        
      </el-tabs>


      <el-popover ref="popover2" v-model="visible" placement="bottom" width="160">
        <div style="text-align: left; margin: 0">
          <el-form label-position="top" label-width="100px">
            <el-form-item label="原因选项：">
              <el-input v-model="create.title"></el-input>
            </el-form-item>
            <el-button type="primary" size="mini" @click="add()"> 保存</el-button>
            <el-button size="mini" @click="visible = false">取消</el-button>
          </el-form>
        </div>
      </el-popover>
      <div class="line1"></div>
      <el-button size="medium" type="primary" icon="el-icon-edit" v-popover:popover2 class="btn-edit">添加原因</el-button>
      <div class="line2"></div>


      <el-table border width="100%" :data="list.res" v-loading="isLoading">
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column prop="title" label="取消原因"></el-table-column>
        <el-table-column prop="total" label="次数统计"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{state[scope.row.state]}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <editBtn @changeEdit="changeEdit" :scope="scope" />
            <el-button size="mini" @click="$router.push({path: '/knowledge/cancelDetail', 'query': {'id': scope.row.id}})">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pnation :size="list.count" :currentPage="list.page" :total="list.total" @changePage="changePage" v-if="list.total>0"></pnation>
    </div>


  </div>
</template>

<script>
import { mapState } from "vuex";
import editBtn from "@/components/orderCancelEditBtn.vue";

export default {
  name: "",
  data() {
    return {
      visible: false,
      isLoading: false
    };
  },
  components: {
    editBtn
  },
  computed: {
    ...mapState("ordersCanceledReason", [
      "list",
      "state",
      "create",
      "typeState"
    ])
  },
  created() {
    this.typeState.typeStateValue = "1";
    this.load();
  },
  methods: {
    handleClickTag(tag) {
      this.typeState.typeStateValue = tag.name;
      this.load();
    },
    add() {
      var sendDate = this.create;
      this.$store
        .dispatch("ordersCanceledReason/create", sendDate)
        .then(data => {
          this.visible = false;
          this.load();
          this.create.title = "";
          // this.$alert("添加成功", "", {
          //   confirmButtonText: "确定",
          //   type: "success",
          //   callback: action => {
          //     this.load();
          //   }
          // });
        });
    },
    changeEdit(item, index) {
      this.list.res[index].order = item.order;
      this.list.res[index].state = item.state;
      this.list.res[index].title = item.title;
      this.list.res[index].total = item.total;
    },
    changePage(pager) {
      this.list.page = pager;
      this.load(pager);
    },
    load(pager) {
      this.isLoading = true;
      if (pager) {
        var sendDate = {
          page: pager,
          count: this.list.count
        };
      } else {
        var sendDate = {
          page: this.list.page,
          count: this.list.count,
          total: 1
        };
      }
      this.$store.dispatch("ordersCanceledReason/list", sendDate).then(data => {
        this.list.total = data.list_total || this.list.total;
        this.list.res = data.list;
        this.isLoading = false;
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>

</style>
