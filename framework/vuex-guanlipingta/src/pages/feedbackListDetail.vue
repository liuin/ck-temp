<template>
  <div class="feedback-list-detail">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>
    <div class="line3"></div>

    <el-form class="form" label-position="right" label-width="80px">
      <el-row>
        <el-col :span="8">反馈人: XXXX </el-col>
        <el-col :span="8">反馈来源: XXXX </el-col>
        <el-col :span="8">反馈时间: XXXX </el-col>
      </el-row>
      <el-form-item label="反馈内容">
<p>反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容</p>
      </el-form-item>
      <el-form-item label="图片信息" class="imgs">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" />
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" />
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select>
            <el-option :key="index" v-for="(item,index) in state" :label="item" :value="index"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input :rows="5" type="textarea" />
      </el-form-item>
    
      <el-form-item label="">
        <el-button size="medium" type="primary" @click="save()">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState("feedback", ["type", "state"])
  },
  created() {},
  methods: {
    save() {}
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
}

.feedback-list-detail {
  font-size: 14px;
}
</style>
