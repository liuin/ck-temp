<template>
  <div class="message-list-detail">
    <div class="box">


      <el-button type="primary" size="medium" @click="$router.push({path:'/message/listEdit', query: {'id': templateShowRes.id}})"
        class="edit">重新编辑</el-button>

      <div class="line2"></div>
      <el-row>
        <el-col :span="8">
          <p class="p1">标题：{{templateShowRes.title}}</p>
          <p class="p1">推送时间：{{api.toTime(templateShowRes.push_time)}}</p>
          <p class="p1">活动时间：{{api.toTime(templateShowRes.activity_start_time)}}至 {{api.toTime(templateShowRes.activity_end_time)}}</p>
          <p class="p1">封面图片：
            <img :src="templateShowRes.cover_image" style="width:200px; height:150px; display:inline-block; background:#eee; vertical-align:top;"
              alt=""> </p>
        </el-col>

        <el-col :span="7">
          <p class="p1">分类：{{templateShowRes.message_category_title}}</p>
          <p class="p1">状态：{{activity_state[templateShowRes.activity_state]}}</p>
          <p class="p1">点击量：{{templateShowRes.click_amount}}</p>
          <p class="p1">送达量：{{templateShowRes.arrived_amount}}</p>
          <p class="p1">推送量：{{templateShowRes.push_amount}}</p>
        </el-col>

        <el-col :span="7">
          <p class="p1">推送用户：{{templateShowRes.push_tags_title}}</p>
          <p class="p1" >推送地区：{{(templateShowRes.province !=0)? RegionJson[1][templateShowRes.province] + '  ' + RegionJson[templateShowRes.province][templateShowRes.city] : '--' }}</p>
          <!-- <p class="p1">点击率：{{ (templateShowRes.arrived_amount==0)? '0' : (templateShowRes.click_amount / templateShowRes.arrived_amount
            * 100).toFixed(2) + '%'}}</p>
          <p class="p1">送达率：{{ (templateShowRes.push_amount==0)? '0' : (templateShowRes.arrived_amount / templateShowRes.push_amount * 100).toFixed(2) +
            '%'}}</p> -->
        </el-col>
      </el-row>

      <div class="editbox">
        {{templateShowRes.content}}
      </div>



    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import RegionJson from "../assets/json/region.json";

  export default {
    name: "",
    data() {
      return {
        RegionJson: {}
      };
    },
    computed: {
      ...mapState("message", [
        "templateShow",
        "templateShowRes",
        "categoryListRes",
        "activity_state"
      ])
    },
    created() {
      this.templateShow.id = this.$route.query.id;
      this.$store.dispatch("message/categoryList");
      this.$store.dispatch("message/templateShow").then(data => {
        console.log(this.templateShowRes);
      });
      this.RegionJson = RegionJson;
    },
    methods: {},
    mounted: function () {}
  };

</script>

<style lang="less" scoped>
  .edit {
    display: block;
    margin-left: auto;
  }

  .p1 {
    line-height: 30px;
  }
  .editbox{
    padding: 20px;
  }

</style>
