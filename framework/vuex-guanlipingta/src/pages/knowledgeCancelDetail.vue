<template>
  <div class="knowledgeCarType">


    
    <div class="box">

      <p class="p1">排序：{{show.res.order}}</p>
      <p class="p1">取消原因： {{show.res.title}} </p>
      <p class="p1">次数统计：{{show.res.total}} </p>
      <p class="p1">状态：{{state[show.res.state]}} </p>
      <div class="line2"></div>
      <p class="p1">取消记录</p>
      <div class="line1"></div>
      <el-table width="100%" border :data="tableList">
        <el-table-column prop="order_sn" label="物流订单编号"></el-table-column>
        <el-table-column label="订单取消时间">
          <template slot-scope="scope">
            {{api.toTime(scope.row.created)}}
          </template>
        </el-table-column>
        <el-table-column prop="maker_mobile" label="用户手机号"></el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      tableList: []
    };
  },
  computed: {
    ...mapState("ordersCanceledReason", ["show", "state", "listByReason"])
  },
  created() {
    this.$store
      .dispatch("ordersCanceledReason/show", {
        id: this.$route.query.id
      })
      .then(data => {
        this.listByReason.reason_id = data.orders_canceled_reason.id;
        this.$store
          .dispatch("ordersCanceledReason/listByReason", this.listByReason)
          .then(data => {
            this.tableList = data.list;
            this.listByReason.total = data.list_total;
          });
      });
  },
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.p1 {
  margin-bottom: 10px;
}
</style>
