<template>
  <div class="personPwd">        
    <div class="box">
      <el-form label-width="100px" class="changelogin" :rules="rules" ref="ruleForm" :model="changePwd">
        <el-form-item label="原密码" prop="old_password">
          <el-input type="password" v-model="changePwd.old_password"  auto-complete="off"></el-input>
          <!-- <el-input type="password" v-model="required"  auto-complete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="新密码"  prop="new_password">
          <el-input type="password" v-model="changePwd.new_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_new_password">
          <el-input type="password" v-model="changePwd.re_new_password"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div> 
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePwd.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        old_password: [
          {
            required: true,
            message: "请填写内容",
            trigger: "blur"
          },
          { min: 8, message: "原密码长度在不能小于8", trigger: "blur" }
        ],
        new_password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          { min: 8, message: "新密码长度在不能小于8", trigger: "blur" }
        ],
        re_new_password: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  // mixins: [rules],
  computed: {
    ...mapState("admin", ["changePwd"])
  },
  methods: {
    submit() {
      this.$refs["ruleForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$store.dispatch("admin/changePwd", this.changePwd).then(data => {
            this.$alert("修改成功", "", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$router.back();
              }
            });
          });
        }
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.changelogin {
  width: 300px;
}
</style>