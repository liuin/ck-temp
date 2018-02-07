<template>
  <div class="button">
      <el-popover ref="popover1"  placement="left" v-model="visible"  width="360"  >
        <div style="text-align: left; margin: 0">
            <el-form label-position="right" label-width="100px">
                <el-form-item label="排序">
                        <el-input v-model="item.order" ></el-input>
                      </el-form-item> 
                      <el-form-item label="原因选项：">
                        <el-input v-model="item.title"></el-input>
                      </el-form-item> 
                      <el-form-item label="状态">
                        <el-radio v-model="item.state" :label="1">可用</el-radio>
                        <el-radio v-model="item.state" :label="0">不可用</el-radio>
                      </el-form-item>
                      <el-form-item label="" style="margin-bottom:0;">
                        <div style="margin-left:auto; text-align:right;">
                        <el-button type="primary" size="mini"  @click="save()"> 保存</el-button>
                        <el-button  size="mini" @click="visible= false">取消</el-button>
                        </div>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-popover>
                <el-button size="mini" v-popover:popover1 >编辑</el-button>

  </div>
</template>

<script>
export default {
  name: "editBtn",
  props: {
    scope: {}
  },
  data() {
    return {
      visible: false,
      item: {}
    };
  },
  watch: {
    visible: function(newValue, oldValue) {
      this.item = _.clone(this.scope.row);
      return newValue;
    }
  },
  created() {},
  methods: {
    save() {
      var sendDate = {
        id: this.item.id,
        title: this.item.title,
        state: this.item.state,
        order: this.item.order
      };
      this.$store
        .dispatch("ordersCanceledReason/update", sendDate)
        .then(data => {
          // this.scope.row = this.item;
          this.$emit("changeEdit", this.item, this.scope.$index);
          this.visible = false;
        });
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