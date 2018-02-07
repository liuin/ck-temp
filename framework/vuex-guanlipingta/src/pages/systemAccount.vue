<template>
  <div class="system-account" >
<!--     <el-breadcrumb separator-class="el-icon-arrow-right"> -->
<!--       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item :to="{ path: '/system/account' }">系统管理</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item>账号列表</el-breadcrumb-item> -->
<!--     </el-breadcrumb> -->
    <breadcrumb></breadcrumb>
    <div class="line3"></div>  
    <el-button  class="add-btn" @click="addBtn" >添加账号</el-button>
    <div class="line2"></div>

    <el-table :data="list.data"  >
      <el-table-column prop="id" label="账号ID" ></el-table-column>
      <el-table-column prop="account" label="用户名" ></el-table-column>
      <el-table-column prop="nickname" label="姓名" ></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="admin_group_title" label="角色"></el-table-column>
      <el-table-column prop="create_user" label="创建人"></el-table-column>
      <el-table-column prop="created" width="180" sortable label="创建时间" ></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span :class="(scope.row.state)? '' : 'waring'">{{(scope.row.state)? '可用' : '禁用'}}</span>          
        </template>
      </el-table-column>
      <el-table-column  label="操作"  width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$router.push({'path': '/system/accountEdit',query:{id: scope.row.id}})">编辑</el-button>

<!--             <el-popover ref="popover1"  placement="top"  width="160"  > -->
<!--              <p>确定删除?</p> -->
<!--              <div class="line2"></div> -->
<!--               <div style="text-align: right; margin: 0"> -->
<!--                 <el-button size="mini" type="text" @click="visible1 = true">取消</el-button> -->
<!--                 <el-button type="primary" size="mini" @click="handleDelete(scope.row.id)">确定</el-button> -->
<!--               </div> -->
<!--             </el-popover> -->
<!--  -->
<!--           <el-button -->
<!--             size="mini" -->
<!--             type="danger" -->
<!--              v-popover:popover1>删除</el-button> -->
          <delBtn  @del="handleDelete(scope.row.id)" />

        </template>
      </el-table-column>
    </el-table>



    <pnation :total="list.total" @changePage="changePage" :size="list.count"></pnation>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: '',
    data() {
      return {       
        visible1: true
      }
    },
    computed:{
      ...mapState('admin',['list'])
    },
    created() {
      this.$store.dispatch('admin/list')
      this.$store.dispatch('admin/total')
    },
    methods: {      
      changePage(pager){
        this.$store.commit('setState', [{'list.page': pager}, this.$store.state.admin])
        this.$store.dispatch('admin/list')
      },
      addBtn(){
        this.$router.push('/system/accountAdd')
      },
      handleEdit(){
        console.log(arguments);
      },
      handleDelete(id){        
        this.$store.dispatch('admin/destroy', {'id':id}).then(data=>{
           this.changePage(1);
        })
      }
    },
    mounted:function(){
      this.data =  [{
        created: '2016-05-02',
        nickname: '王小虎'       
      },
      {
        created: '2016-01-02',
        nickname: '王小虎2'       
      }
      ]
    }
  }
</script>

<style lang="less" scoped>
  
  
</style>