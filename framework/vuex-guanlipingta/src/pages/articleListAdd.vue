<template>
  <div class="system-account-add">
    <div class="box">
      <el-form class="form" label-position="right" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="articleCreate.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="articleCreate.category_id">
            <el-option v-for="item in list.res" :value="item.id" :label="item.title" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <editHTML :content.sync="articleCreate.content"></editHTML>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" @click="save()">发　布</el-button>
          <el-button @click="save('drafts')">保存草稿</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import editHTML from "@/components/editHtml.vue";

export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState("articleCategory", ["articleCreate", "list"])
  },
  created() {
    this.getCate();
  },
  components: {
    editHTML
  },
  methods: {
    save(type) {
      if (type == "drafts") {
        this.articleCreate.state = 1;
      } else {
        this.articleCreate.state = 2;
      }
      this.$store
        .dispatch("articleCategory/articleCreate", this.articleCreate)
        .then(data => {
          this.$alert("添加成功", "", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$router.back();
              for (const key in this.articleCreate) {
                if (this.articleCreate.hasOwnProperty(key)) {
                  this.articleCreate[key] = "";
                }
              }
              console.log(this.articleCreate);
            }
          });
        });
    },
    getCate() {
      if (!_.isEmpty(this.list.res)) {
        return true;
      }
      var sendDate = {
        page: this.list.page,
        // count: this.list.count,
        count: 1000,
        total: this.list.total
      };
      this.$store.dispatch("articleCategory/list", sendDate).then(data => {
        this.list.res = data.list;
      });
    },
    handleClick() {},
    handleCheckAllChange() {}
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
