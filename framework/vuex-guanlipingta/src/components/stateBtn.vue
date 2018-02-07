<template>
  <div class="button">
      <el-popover ref="popover1" v-model="visible"  placement="top"  width="160"  >
                   <el-select v-model="selectVal"  size="mini" >
                     <el-option :value="index" :key="item" v-for="(item, index, key) in selectDate" :label="item"></el-option>
                   </el-select>
                   <div class="line2"></div>
                   
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="handleDelete()">确定</el-button>
                    </div>
                  </el-popover>
                <el-button class="btn1" v-popover:popover1 type="danger" size="mini">操作</el-button>

  </div>
</template>

<script>
  export default {
    name: 'delBtn',
    props:{
      selectDate: {},
      scope: {}
    },
    data() {
      return {
        visible: false,
        selectVal: 0
      }
    },
     watch:{
      visible:function  (newValue, oldValue) {            
         this.selectVal =  this.scope.row.state.toString()
         return newValue
      }
    },    
    created() {     
    },
    methods: {      
      handleDelete(){
        this.$emit('changeState', this.selectVal, this.scope)
        this.visible = false
      }
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .button{display:inline-block; margin-left:5px;}
</style>