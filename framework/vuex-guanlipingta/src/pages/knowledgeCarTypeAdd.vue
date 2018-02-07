<template>
  <div class="system-account-add">
    <breadcrumb separator-class="el-icon-arrow-right"></breadcrumb>

    <div style="margin-top:30px;"></div>

  <el-form class="form" label-position="right" label-width="120px" >    
    <el-form-item label="排序">
      <el-input v-model="create.order"></el-input>
    </el-form-item> 
    <el-form-item label="车辆类型名称">
      <el-input v-model="create.title"></el-input>
    </el-form-item> 
    <el-form-item label="车型图片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="upSuccess"
        :limit="1"
        :on-remove="handleRemove" >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>


    </el-form-item> 

    <!-- <el-form-item label="长(米)">
      <el-input ></el-input>
    </el-form-item> 
    <el-form-item label="宽(米)">
      <el-input ></el-input>
    </el-form-item> 
    <el-form-item label="高(米)">
      <el-input ></el-input>
    </el-form-item> 
    <el-form-item label="载重(吨)">
      <el-input ></el-input>
    </el-form-item>  -->


    <el-form-item label="状态">
      <el-radio v-model="create.state" :label="1">可用</el-radio>
      <el-radio v-model="create.state" :label="0">不可用</el-radio>
    </el-form-item> 

    <el-form-item label="">
      <el-button @click="save()" type="primary">提　交</el-button>
    </el-form-item> 




    
    </el-form>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    ...mapState("cars", ["create", "state"])
  },
  created() {},
  methods: {
    save() {
      var sendData = {
        title: this.create.title,
        icon: this.create.icon,
        state: this.create.state,
        order: this.create.order,
        long: this.create.long,
        with: this.create.with,
        high: this.create.high,
        load: this.create.load
      };
      this.$store.dispatch("cars/create", sendData).then(data => {
        this.$alert("添加成功", "", {
          confirmButtonText: "确定",
          type: "success",
          callback: action => {
            this.$router.back();
          }
        });
      });
    },
    handleClick() {},
    handleCheckAllChange() {},
    upSuccess(response, file, fileList) {
      this.create.icon = file.url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.itemgroup {
  padding-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.save-btn {
  margin-top: 20px;
}
</style>