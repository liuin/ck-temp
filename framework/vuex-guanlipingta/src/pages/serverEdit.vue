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
  import { mapState } from 'vuex'
  
  export default {
    name: 'serveradd',
    data() {
      return {
        
      }
    },
    computed:{
      ...mapState('platform', ['update', 'state', 'show'])
    },
    created() {
      this.show.id = this.$route.query.id;
      this.$store.dispatch('platform/show', {id: this.show.id}).then(data => {
        this.show.res = data.platform        
        this.update.id = this.show.id
        this.update.title = this.show.res.title
        this.update.company = this.show.res.company
        this.update.state = this.show.res.state.toString()
      })

    },
    methods: {      
      save(){
        this.$store.dispatch('platform/update', this.update).then(data=>{
            this.$alert('编辑成功', '', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.back();
              }
            });
        })
      }
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .form{width: 500px;}
</style>