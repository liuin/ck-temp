<template>
  <div class="message-cate">
    <div class="box">
      <el-popover ref="popover2" v-model="addCatevisible" placement="top" width="160">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="categoryCreate.title"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="addCatevisible = false">取消</el-button>
          <el-button type="primary" @click="addCate" size="mini">保存</el-button>
        </div>
      </el-popover>

      <el-button type="primary" @click="addCatevisible = true" size="medium" v-popover:popover2>添加分类</el-button>
      <div class="line2"></div>

      <el-table width="100%" border :data="categoryListRes" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.26)">
        <el-table-column prop="id" label="ID" width="35"></el-table-column>
        <el-table-column prop="title" label="分类名称"></el-table-column>
        <el-table-column prop="total" label="当前消息数"></el-table-column>

        <el-table-column prop="" label="操作" width="250">
          <template slot-scope="scope">
            <!-- <el-popover ref="popover1" placement="top" width="160">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="分类名称">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text">取消</el-button>
                <el-button type="primary" size="mini">保存</el-button>
              </div>
            </el-popover>

            <el-button size="mini" v-popover:popover1>编辑</el-button> -->
            <articleCateEditBtn :scope="scope" @edit="edit"></articleCateEditBtn>
          </template>
        </el-table-column>
      </el-table>
      <pnation v-if="categoryList.total != 0" :total="categoryList.total" @changePage="changePage" :size="categoryList.count"></pnation>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import articleCateEditBtn from "../components/articleCateEditBtn.vue";

export default {
  name: "messageCate",
  data() {
    return {
      loading: false,
      addCatevisible: false
    };
  },
  components: {
    articleCateEditBtn
  },
  computed: {
    ...mapState("message", [
      "categoryList",
      "categoryListRes",
      "categoryUpdate",
      "categoryCreate"
    ])
  },

  created() {
    this.categoryList.page = 1;
    this.$store.dispatch("message/categoryList").then(data => {
      console.log(this.categoryListRes);
    });
  },
  methods: {
    edit(value, scope) {
      if (value == scope.row.title) {
        this.$alert("分类名称不能相同", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
      } else {
        this.categoryUpdate.id = scope.row.id;
        this.categoryUpdate.title = value;
        this.loading = true;
        this.$store.dispatch("message/categoryUpdate").then(data => {
          this.changePage();
        });
      }
    },
    changePage(val) {
      this.loading = true;
      this.categoryList.page = val || this.categoryList.page;
      this.$store.dispatch("message/categoryList").then(data => {
        this.loading = false;
      });
    },
    addCate() {
      this.addCatevisible = false;
      this.$store.dispatch("message/categoryCreate").then(data => {
        this.categoryCreate.title = "";
        this.changePage();
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>

</style>
