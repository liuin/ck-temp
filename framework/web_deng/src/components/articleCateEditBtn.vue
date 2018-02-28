<template>
  <div class="button">
    <el-popover v-model="visible" ref="popover1" placement="top" width="160">
      <div>
        分类名称:
        <div class="line1"></div>
        <el-input v-model="value" size="mini"></el-input>
      </div>
      <div class="line1"></div>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="handleEdit">保存</el-button>
      </div>
    </el-popover>
    <el-button size="mini" v-popover:popover1>编辑</el-button>
  </div>
</template>

<script>
export default {
  name: "articleCateEditBtn",
  props: {
    scope: {}
  },
  data() {
    return {
      visible: false,
      value: ""
    };
  },
  created() {},
  methods: {
    handleEdit() {
      this.$emit("edit", this.value, this.scope);
      this.visible = false;
    }
  },
  watch: {
    visible() {
      this.value = this.scope.row.title;
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.button {
  display: inline-block;
  margin-left: 5px;
}
</style>
