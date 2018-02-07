<template>
<div class="button">
  <el-popover ref="popover1" v-model="visible"  placement="left"  width="260"  >
    <p>请填写修改订单状态和原因<span class="c1">（必填）</span></p>    
    <div class="line1"></div>
    <el-select v-model="selectVal"  size="mini" >
      <el-option :value="index" :key="item" v-for="(item, index) in orderState" :label="item"></el-option>
    </el-select>
    <div class="line1"></div>
    <el-input class="res" type="textarea" :rows="3"></el-input>
    <div class="line2"></div>
    
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="handleDelete()">确定</el-button>
    </div>
  </el-popover>
  <el-button class="btn1" v-popover:popover1 type="danger" size="mini">操作</el-button>

</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "delBtn",
  props: {
    scope: {}
  },
  computed: {
    ...mapState("orders", ["orderState"])
  },
  data() {
    return {
      visible: false,
      selectVal: "0"
    };
  },
  watch: {
    visible: function(newValue, oldValue) {
        this.selectVal =  this.scope.row.state.toString()
        return newValue
    }
  },
  created() {},
  methods: {
    handleDelete() {
      this.$emit("changeState", this.selectVal, this.scope);
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
.c1{
  color: red;
}
</style>