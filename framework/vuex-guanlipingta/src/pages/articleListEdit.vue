<template>
  <div class="system-account-add">
    <breadcrumb></breadcrumb>
    <div style="margin-top:30px;"></div>

    <el-form class="form" label-position="right" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="articleUpdate.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="articleUpdate.category_id">
          <el-option v-for="item in list.res" :value="item.id" :label="item.title" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="articleUpdate.content" type="textarea" :rows="10"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="save()">发　布</el-button>
        <el-button @click="save('drafts')">保存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState("articleCategory", ["articleUpdate", "list"])
  },
  created() {
    this.getCate();

    if (this.$route.query.id) {
      this.$store
        .dispatch("articleCategory/articleShow", { id: this.$route.query.id })
        .then(data => {
          console.log(data);
          this.articleUpdate.title = data.article.title;
          this.articleUpdate.id = data.article.id;
          
          this.articleUpdate.category_id = data.article.article_category_title;
          this.articleUpdate.content = data.article.article_category_title;
        });
    }
  },
  methods: {
    save(type) {
      if (type == "drafts") {
        this.articleUpdate.state = 1;
      } else {
        this.articleUpdate.state = 2;
      }
      this.$store
        .dispatch("articleCategory/articleUpdate", this.articleUpdate)
        .then(data => {
          this.$alert("添加成功", "", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$router.back();
              for (const key in this.articleUpdate) {
                if (this.articleUpdate.hasOwnProperty(key)) {
                  this.articleUpdate[key] = "";
                }
              }
              console.log(this.articleUpdate);
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
        count: this.list.count,
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
