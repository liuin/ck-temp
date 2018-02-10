<template>
  <div class="feedback-list-detail">
    <div class="box">
      <el-form class="form" label-position="right" label-width="80px">
        <el-row>
          <el-col :span="8">反馈人: {{show.res.create_user}} </el-col>
          <el-col :span="8">反馈来源: {{type[show.res.type]}} </el-col>
          <el-col :span="8">反馈时间: {{api.toTime(show.res.created)}} </el-col>
        </el-row>
        <div class="line3"></div>
        <el-form-item label="反馈内容">
          {{show.res.content}}
        </el-form-item>
        <el-form-item label="图片信息" class="imgs">
          <img :src="item" v-for="item in imgs" :key="item" alt="">
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable v-model="show.res.state">
            <el-option :key="index" v-for="(item,index) in state" :label="item" :value="index.toString()"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :rows="5" type="textarea" v-model="show.res.remark" />
        </el-form-item>

        <el-form-item label="">
          <el-button size="medium" type="primary" @click="save()">保存</el-button>
        </el-form-item>
      </el-form>


    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState("feedback", ["type", "state", "show", "dispose"]),
    ...mapGetters("feedback", ["imgs"])
  },
  created() {
    // this.selectVal = this.state[show.res.state]
    this.show.id = this.$route.query.id;
    this.show.type = this.$route.query.type;
    this.$store.dispatch("feedback/show");
    // console.log(this.show.res.state.toString());
    //  this.show.res.state = _.toString(this.show.res.state)
  },
  methods: {
    save() {
      this.dispose.id = this.show.id
      this.dispose.state = this.show.res.state
      this.dispose.remark = this.show.res.remark
 
      this.$store.dispatch("feedback/dispose").then(data => {
        this.$alert("修改成功", "", {
          confirmButtonText: "确定",
          type: "success",
          callback: action => {
            this.$router.back();
          }
        });
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.imgs {
  img {
    display: inline-block;
    width: 200px;
    height: 200px;
    margin-left: 10px;
    background: #eee;
  }
  img:first-child {
    margin-left: 0px;
  }
}

.feedback-list-detail {
  font-size: 14px;
}
</style>
