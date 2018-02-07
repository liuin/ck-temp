<template>
  <div class="button">
      <el-popover ref="popover1"  placement="top" v-model="visible"  width="160"  >
             <p>确定删除?</p>
             <div class="line2"></div>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete()">确定</el-button>
              </div>
            </el-popover>

          <el-button
            size="mini"
            type="danger"
             v-popover:popover1>删除</el-button>

  </div>
</template>

<script>
export default {
  name: "delBtn",
  props: {},
  data() {
    return {
      visible: false
    };
  },
  created() {},
  methods: {
    handleDelete() {
      this.$emit("del");
      this.visible = false;
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