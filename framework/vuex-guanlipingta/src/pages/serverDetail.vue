<template>
  <div class="message-list">
    <div class="box">
      <el-row :gutter="10" class="detail">
        <el-col :span="9">
          <p>平台名称 : {{show.res.title}}</p>
          <p>access_key_id : {{show.res.access_key_id}}</p>
          <p>合作状态 : {{state[show.res.state]}}</p>
        </el-col>
        <el-col :span="9">
          <p>平台所属公司: {{show.res.company}} </p>
          <p>access_key_secret: {{show.res.access_key_secret}} </p>
          <p>创建时间: {{api.toTime(show.res.created)}} </p>
        </el-col>
        <el-col :span="4" class="logo">
          平台LOGO:
          <br />
          <img :src="show.res.logo" alt="">
        </el-col>
      </el-row>
      <div class="line3"></div>
      <h3>已绑定厂商列表</h3>
      <div class="line1"></div>
      <el-table :data="getMakersById.res" border>
        <el-table-column prop="maker_nickname" label="厂商(店铺)名称"></el-table-column>
        <el-table-column prop="company" label="所属公司名称">
        </el-table-column>
        <el-table-column prop="maker_mobile" label="账号(手机号)"></el-table-column>
        <el-table-column  label="绑定时间">
          <template slot-scope="scope">
            {{api.toTime(scope.row.created)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "server",
  data() {
    return {};
  },
  computed: {
    ...mapState("platform", ["show", "getMakersById", "state"])
  },
  created() {
    this.$store
      .dispatch("platform/show", {
        id: this.$route.query.id
      })
      .then(data => {
        this.show.res = data.platform;
      });

    this.loadGetMakersById();
  },
  methods: {
    loadGetMakersById(pager) {
      if (pager) {
        var sendData = {
          platform_id: this.$route.query.id,
          page: pager,
          count: this.getMakersById.count,
          total: 1
        };
      } else {
        var sendData = {
          platform_id: this.$route.query.id,
          page: this.getMakersById.page,
          count: this.getMakersById.count,
          total: 1
        };
      }
      this.$store.dispatch("platform/getMakersById", sendData).then(data => {
        this.getMakersById.res = data.maker_list;
        this.getMakersById.total = data.list_total || this.getMakersById.total;
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.detail {
  line-height: 30px;
}

.logo {
  img {
    width: 100px;
    height: 100px;
    background: #999;
    border-radius: 10px;
  }
}
</style>
