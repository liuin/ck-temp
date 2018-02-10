<template>
  <div class="message-list-add">



    <div class="box">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="标题">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <el-select value="1">
            <el-option value="1">1</el-option>
            <el-option value="1">2</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面图片">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-row>
          <el-col :span="10">
            <el-form-item label="推送时间">
              <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="4">
            <el-form-item label="推送">
              <el-select value="1">
                <el-option value="1">1</el-option>
                <el-option value="1">2</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="10">
            <el-form-item label="推送地区">
              <el-select value="1">
                <el-option value="1">1</el-option>
                <el-option value="1">2</el-option>
                <el-option value="1">3</el-option>
              </el-select>

              <el-select value="1">
                <el-option value="1">1</el-option>
                <el-option value="1">2</el-option>
                <el-option value="1">3</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="4">
            <el-form-item label="推送地区">
              <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="正文">
          <el-input type="textarea" :rows="4"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button size="medium" type="primary">发布</el-button>
          <el-button size="medium">保存至草稿箱</el-button>
        </el-form-item>



      </el-form>
    </div>



  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created() {
      console.log(this.$route);
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    mounted: function () {}
  }

</script>

<style lang="less" scoped>


</style>
