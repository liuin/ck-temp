<template>
  <div class="system-account-add">
    <div class="box">
      <el-form class="form" label-position="right" label-width="120px">
        <el-form-item label="排序">
          <el-input v-model="create.order"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型名称">
          <el-input v-model="create.title"></el-input>
        </el-form-item>
        <el-form-item label="车型图片">

          <el-upload :action="api.url.uploadImg"  list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-success="upSuccess" :file-list="fileList" :limit="1" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" >
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
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";

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
      ...mapState("cars", ["create", "state"]),
      ...mapState("uploadImg", ["uploadImg"])
    },
    created() {
      // console.log();
    },
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

        if (this.fileList.length > 0 && (this.fileList[0].raw != undefined)) {
          var reader = new FileReader();
          reader.readAsDataURL(this.fileList[0].raw);
          reader.onload = (e) => {
            var base64 = e.target.result;            
            this.upImg(base64, (imgData) => {
              // console.log(imgDat);
              sendData.icon = imgData.path
              this.$store.dispatch("cars/create", sendData).then(data => {
                this.$alert("添加成功", "", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.create.title = ""
                    this.create.state = ""
                    this.create.icon = ""
                    this.$router.back();
                  }
                });
              });
            })
          }
        } else {
                this.$store.dispatch("cars/create", sendData).then(data => {
                  this.$alert("添加成功", "", {
                    confirmButtonText: "确定",
                    type: "success",
                    callback: action => {
                      this.create.title = ""
                      this.create.state = ""
                      this.create.icon = ""
                      this.$router.back();
                    }
                  });
                });
        }





      },
      handleClick() {},
      handleCheckAllChange() {},
      upSuccess(response, file, fileList) {        
        this.create.icon = file.url;
        this.fileList = fileList
      },
      upImg(base64, callback) {
        var sendData = {
          folder: this.uploadImg.folder,
          img: base64
        }
        this.$store.dispatch("uploadImg/uploadImg", sendData).then(data => {
          if (callback) {
            callback(data)
          }
        })
      },
      handleRemove(file, fileList) {},
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    mounted: function () {}
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
