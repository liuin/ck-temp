<template>
  <div class="server-add">
    
    

    <div class="box">
      <el-form class="form" label-position="right" label-width="120px" >
        <el-form-item label="平台名称">
          <el-input v-model="update.title"></el-input>
        </el-form-item>
        <el-form-item label="平台所属公司">
          <el-input v-model="update.company"></el-input>
        </el-form-item>
        <el-form-item label="平台LOGO">

          <el-upload :action="api.url.uploadImg"  list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-success="upSuccess" :file-list="fileList" :limit="1" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" >
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-form-item>
        <el-form-item label="合作状态">
          <el-select v-model="update.state">
            <el-option v-for="(item,index) in state" :key="item" :value="index" :label="item"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="">
          <el-button type="primary" @click="save()">保存</el-button>
        </el-form-item>
  
      </el-form>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "serveradd",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: []
    };
  },
  computed: {
    ...mapState("platform", ["update", "state", "show"]),
    ...mapState("uploadImg", ["uploadImg"])
  },
  created() {
    this.show.id = this.$route.query.id;
    this.$store.dispatch("platform/show", { id: this.show.id }).then(data => {
      this.show.res = data.platform;
      this.update.id = this.show.id;
      this.update.title = this.show.res.title;
      this.update.company = this.show.res.company;
      this.update.state = this.show.res.state.toString();

      if (this.show.res.logo != "") {
        var icons = {
          name: "",
          url: this.show.res.logo + "!desc"
        };
        this.fileList.push(icons);
      }
    });
  },
  methods: {
    upSuccess(response, file, fileList) {
      this.update.logo = file.url;
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {},
    upImg(base64, callback) {
      var sendData = {
        folder: this.uploadImg.folder,
        img: base64
      };
      this.$store.dispatch("uploadImg/uploadImg", sendData).then(data => {
        if (callback) {
          callback(data);
        }
      });
    },
    save() {
      var sendData = this.update;
      if (this.fileList.length > 0 && this.fileList[0].raw != undefined) {
        var reader = new FileReader();

        reader.readAsDataURL(this.fileList[0].raw);
        reader.onload = e => {
          var base64 = e.target.result;
          this.upImg(base64, imgData => {
            // console.log(imgDat);
            sendData.logo = imgData.path;
            this.$store.dispatch("platform/update", sendData).then(data => {
              this.$alert("修改成功", "", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.$router.back();

                  for (var i in this.create) {
                    if (i == "state") {
                      this.create[i] = "3";
                    } else {
                      this.create[i] = "";
                    }
                  }
                }
              });
            });
          });
        };
      } else {
        sendData.logo = this.show.res.logo;
        this.$store.dispatch("platform/update", sendData).then(data => {
          this.$alert("修改成功", "", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$router.back();

              for (var i in this.create) {
                if (i == "state") {
                  this.create[i] = "3";
                } else {
                  this.create[i] = "";
                }
              }
            }
          });
        });
      }

      // this.$store.dispatch("platform/update", this.update).then(data => {
      //   this.$alert("编辑成功", "", {
      //     confirmButtonText: "确定",
      //     type: "success",
      //     callback: action => {
      //       this.$router.back();
      //     }
      //   });
      // });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.form {
  width: 500px;
}
</style>