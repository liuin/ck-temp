<template>
  <div class="server-add">
    
    <div class="box">
      <el-form class="form" label-position="right" label-width="120px" >
        <el-form-item label="平台名称">
          <el-input v-model="create.title"></el-input>
        </el-form-item>
        <el-form-item label="平台所属公司">
          <el-input v-model="create.company"></el-input>
        </el-form-item>
        <el-form-item label="合作状态">
          <el-select v-model="create.state">
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
      ...mapState('platform', ['create', 'state'])
    },
    created() {
     

    },
    methods: {      
      save(){
        this.$store.dispatch('platform/create', this.create).then(data=>{


            this.$alert('保存成功', '', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.back();

                for (var i in this.create) {
                  if (i == 'state') {
                    this.create[i] = "3"  
                  }else {
                    this.create[i] = ""  
                  }              
                }

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