<template>
  <div class="system-account-add">
    <breadcrumb separator-class="el-icon-arrow-right"></breadcrumb>

    <div style="margin-top:30px;"></div>

  <el-form class="form" label-position="right" label-width="120px" >    
    <el-form-item label="排序">
      <el-input v-model="update.order"></el-input>
    </el-form-item> 
    <el-form-item label="车辆类型名称">
      <el-input v-model="update.title"></el-input>
    </el-form-item> 
    <el-form-item label="车型图片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="upSuccess"
        :file-list="fileList"
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
      <el-radio v-model="update.state" :label="1">可用</el-radio>
      <el-radio v-model="update.state" :label="0">不可用</el-radio>
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
      dialogVisible: false,
      fileList: []
    };
  },
  computed: {
    ...mapState("cars", ["update", "state"])
  },
  created() {
    this.$store
      .dispatch("cars/show", { id: this.$route.query.id })
      .then(data => {
        this.update.high = data.cars.high;
        this.update.icon = data.cars.icon;
        this.update.id = data.cars.id;
        this.update.load = data.cars.load;
        this.update.long = data.cars.long;
        this.update.state = data.cars.state;
        this.update.title = data.cars.title;
        this.update.with = data.cars.with;

        var icons = {
          name: "",
          url: data.cars.icon
        };
        this.fileList.push(icons);
      });
  },
  methods: {
    save() {
      var sendData = {
        id: this.update.id,
        title: this.update.title,
        icon: this.update.icon,
        state: this.update.state,
        order: this.update.order,
        long: this.update.long,
        with: this.update.with,
        high: this.update.high,
        load: this.update.load
      };
      this.$store.dispatch("cars/update", sendData).then(data => {
        this.$alert("编辑成功", "", {
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
      this.update.icon = file.url;
    },
    handleRemove(file, fileList) {
      this.update.icon = "";
    },
    handlePictureCardPreview(file) {
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