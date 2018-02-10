<template>
  <div class="system-account-add">

    <div class="line2"></div>
    <div class="box">
      <el-form class="form" label-position="right" label-width="120px">
        <el-form-item label="排序">
          <el-input v-model="update.order"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型名称">
          <el-input v-model="update.title"></el-input>
        </el-form-item>
        <el-form-item label="车型图片">
          <el-upload :action="api.url.uploadImg" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="upSuccess"
            :file-list="fileList" :limit="1" :on-remove="handleRemove">
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
    <div class="line2"></div>
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
        file: "",
        fileList: []
      };
    },
    computed: {
      ...mapState("cars", ["update", "state"]),
      ...mapState("uploadImg", ["uploadImg"])
    },
    created() {
      this.$store
        .dispatch("cars/show", {
          id: this.$route.query.id
        })
        .then(data => {
          this.update.high = data.cars.high;
          this.update.icon = data.cars.icon;
          this.update.order = data.cars.order;
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
        if (this.fileList.length > 0 && (this.fileList[0].raw != undefined)) {
          var reader = new FileReader();
          reader.readAsDataURL(this.fileList[0].raw);
          reader.onload = (e) => {
            var base64 = e.target.result;            
            this.upImg(base64, (imgData) => {
              sendData.icon = imgData.path
              this.$store.dispatch("cars/update", sendData).then(data => {
                this.$alert("编辑成功", "", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {                   
                    this.$router.back();
                  }
                });
              });
            })
          }        
        } else {
          this.$store.dispatch("cars/update", sendData).then(data => {
            this.$alert("编辑成功", "", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$router.back();
              }
            });
          });
        }


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
      handleClick() {},
      handleCheckAllChange() {},
      upSuccess(response, file, fileList) {
        this.update.icon = file.url;
        this.fileList = fileList        
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
        this.update.icon = "";
      },
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
