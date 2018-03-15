<template>
  <div class="message-list-add">
    <div class="box"  v-loading="loading">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="templateUpdate.title"></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="templateUpdate.category_id">
            <el-option v-for="(item,index) in categoryListRes" :key="index" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面图片">
          <el-upload :action="api.url.uploadImg" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :on-success="upSuccess" :file-list="uploadImg.fileList" :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>


        <el-row>
          <el-col :span="10">
            <el-form-item label="推送用户">
              <el-select filterable v-model="tagsItemValue">
                <el-option :value="0" label="全部"></el-option>
                <el-option :value="'1-0'" label="司机(全部)"></el-option>
                <el-option :value="'2-0'" label="厂商(全部)"></el-option>
                <el-option v-for="item in tagsItem" :value="item.value" :label="item.label" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="推送地区" v-if="tagsItemValueType == '1'">
              <Region :clearable="true" :selected.sync="region" :limitLen="2" @change="regionCahge" />
            </el-form-item>

            <el-form-item label="推送平台" v-if="tagsItemValueType == '2'">
              <el-select v-model="templateUpdate.platform_id" filterable>
                <el-option v-for="item in platformListRes" :value="item.id" :label="item.title" :key="item.id"></el-option>
              </el-select>
            </el-form-item>


          </el-col>
          <el-col :span="10" >
            <el-form-item label="推送时间">
              <el-date-picker v-model="pushTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-date-picker type="daterange" v-model="activeTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="正文">
          <!-- <el-input type="textarea" v-model="templateUpdate.content" :rows="4"></el-input> -->
          <editHTML :content.sync="templateUpdate.content"></editHTML>
        </el-form-item>

        <el-form-item label="">
          <el-button size="medium" @click="save('send')" type="primary">发布</el-button>
          <el-button size="medium" @click="save('drafts')">保存至草稿箱</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import editHTML from "@/components/editHtml.vue";
export default {
  name: "messageListAdd",
  data() {
    return {
      loading: false,
      dialogImageUrl: "",
      dialogVisible: false,
      region: [],
      pushTime: "",
      activeTime: [],
      tagsItem: [],
      tagsItemValue: "",
      tagsItemValueType: 0
    };
  },
  created() {
    this.reset();
    this.templateShow.id = this.$route.query.id;
    this.loading = true;
    this.$store.dispatch("message/templateShow").then(data => {
      for (const key in this.templateUpdate) {
        if (this.templateUpdate.hasOwnProperty(key)) {
          if (this.templateShowRes[key] != undefined) {
            this.templateUpdate[key] = this.templateShowRes[key];
          }
        }
      }

      this.pushTime = new Date(this.templateUpdate.push_time * 1000);

      this.activeTime = [
        new Date(this.templateUpdate.activity_start_time * 1000),
        new Date(this.templateUpdate.activity_end_time * 1000)
      ];

      // console.log(data.message_template.cover_image_url);
      this.uploadImg.fileList = [
        {
          name: "",
          url: data.message_template.cover_image_url + "!desc"
        }
      ];
      if (this.templateUpdate.push_tags_type == 0) {
        this.tagsItemValue = 0;
      } else {
        this.tagsItemValue =
          this.templateUpdate.push_tags_type +
          "-" +
          this.templateUpdate.push_tags_id;
      }

      this.region = [
        this.templateUpdate.province.toString(),
        this.templateUpdate.city.toString()
      ];
      this.loading = false;
    });

    this.categoryList.page = 1;
    this.categoryList.count = 100;

    // console.log(this.fileList);
    this.$store.dispatch("message/categoryList");
    this.$store.dispatch("platform/list");

    //获取司机标签
    var sendDate1 = {
      type: 1,
      page: 1,
      count: 100,
      total: 1
    };
    this.$store.dispatch("tags/labelList", sendDate1).then(data => {
      data.list.map(item => {
        this.tagsItem.push({
          value: "1-" + item.id,
          label: "司机 (" + item.title + ")"
        });
      });
    });

    //获取厂商标签
    var sendDate2 = {
      type: 2,
      page: 1,
      count: 100,
      total: 1
    };
    this.$store.dispatch("tags/labelList", sendDate2).then(data => {
      data.list.map(item => {
        this.tagsItem.push({
          value: "2-" + item.id,
          label: "厂商 (" + item.title + ")"
        });
      });
    });
  },
  watch: {
    activeTime(newVal, oldVal) {
      this.templateUpdate.activity_start_time = newVal[0].getTime() / 1000;
      this.templateUpdate.activity_end_time = newVal[1].getTime() / 1000;
    },
    pushTime(newVal) {
      this.templateUpdate.push_time = newVal.getTime() / 1000;
    },
    tagsItemValue(newVal) {
      if (newVal != 0) {
        var id = newVal.split("-");
        this.templateUpdate.push_tags_id = id[1];
        this.templateUpdate.push_tags_type = parseInt(id[0]);
        this.tagsItemValueType = id[0];
      } else {
        this.templateUpdate.push_tags_id = 0;
        this.tagsItemValueType = 0;
        this.templateUpdate.push_tags_type = newVal;
      }
    }
  },
  components: {
    editHTML
  },
  computed: {
    ...mapState("message", [
      "templateShow",
      "templateShowRes",
      "templateUpdate",
      "categoryList",
      "categoryListRes"
    ]),
    ...mapState("uploadImg", ["uploadImg"]),
    ...mapState("platform", {
      platformListRes: state => state.list.res
    })
  },
  methods: {
    reset() {
      this.templateUpdate.category_id = "";
      this.templateUpdate.title = "";
      this.templateUpdate.content = "";
      this.uploadImg.fileList = [];
      this.loading = false;
    },
    save(type) {
      if (type == "send") {
        this.$confirm(
          "本消息将于 " + this.pushTime.toLocaleString() + " 推送，是否确认？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(data => {
          this.loading = true;
          this.templateUpdate.state = 2;
          if (
            this.uploadImg.fileList.length > 0 &&
            this.uploadImg.fileList[0].raw != undefined
          ) {
            this.$store
              .dispatch("uploadImg/upImg")
              .then(data => {
                if (data) {
                  this.templateUpdate.cover_image = data.path;
                }
                this.$store.dispatch("message/templateUpdate").then(data => {
                  this.$alert("修改成功", "", {
                    confirmButtonText: "确定",
                    type: "success",
                    callback: action => {
                      this.reset();
                      this.$router.back();
                    }
                  });
                });
              })
              .catch(data => {
                this.loading = false;
              });
          } else {
            this.$alert("图片不能为空", "", {
              confirmButtonText: "确定",
              type: "error"
            });
            this.loading = false;
          }
        });
      }
      if (type == "drafts") {
        this.templateUpdate.state = 1;
        this.loading = true;
        if (
          this.uploadImg.fileList.length > 0 &&
          this.uploadImg.fileList[0].raw != undefined
        ) {
          this.$store
            .dispatch("uploadImg/upImg")
            .then(data => {
              if (data) {
                this.templateUpdate.cover_image = data.path;
              }
              this.templateUpdate.cover_image = data.path;
              this.$store.dispatch("message/templateUpdate").then(data => {
                this.$alert("保存到草稿成功", "", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.reset();
                    this.$router.back();
                  }
                });
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$alert("图片不能为空", "", {
            confirmButtonText: "确定",
            type: "error"
          });
          this.loading = false;
        }
      }
    },
    regionCahge(arr, currentLabels) {
      this.templateUpdate.province = arr[0];
      this.templateUpdate.city = arr[1];
      console.log(arr);
    },
    upSuccess(response, file, fileList) {
      this.$store.commit("uploadImg/fileList", fileList);
    },
    handleRemove(file, fileList) {
      this.$store.commit("uploadImg/fileList", fileList);
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

</style>
