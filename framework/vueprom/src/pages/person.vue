<template>
  <div class="money grebg">
    <van-nav-bar title="个人资料" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <!-- <van-cell title="单元格" is-link value="内容" class="item" /> -->
      <van-cell v-for="(item,index) in person" :key="item.lable" class="item" @click="popupOpen(item, index)">
        <template slot="title">
          <span class="van-cell-text">{{item.lable}}</span>
        </template>
        <template>
          <span class="color1">{{item.value}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="popup.state" position="right" :overlay="false">
      <van-nav-bar :title="'更改' + popup.title" left-arrow @click-left="popup.state = false" right-text="保存" @click-right="save()"
      />
      <van-cell-group>
      <van-field v-model="popup.value" class="change-field" :placeholder="'请填写'+ popup.title" @blur="$verify.check()" icon="clear"
        @click-icon="popup.value = ''" v-verify="popup.value" />
        
      </van-cell-group>
      
      <label class="van-field__error-message" v-remind="popup.value"></label>
      <p class="ptip">修改 {{popup.title}}</p>
      
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "money",
  data() {
    return {
      popup: {
        state: false,
        value: "",
        title: ""
      },
      person: {
        id: {
          value: "1801808888",
          lable: "登录账号"
        },
        name: {
          value: "张山峰",
          lable: "联系人"
        },
        compName: {
          value: "中山市灯饰有限公司",
          lable: "公司名称"
        },
        tel: {
          value: "070-8888888",
          lable: "联系电话"
        },
        email: {
          value: "719677777qq.com",
          lable: "电子邮箱"
        },
        qq: {
          value: "719677777",
          lable: "QQ"
        }
      }
    };
  },
  verify: {
    popup: {
      value: ["required"]
    }
  },
  created() {
    this.$api.ajax({
      type: "post",
      url: this.$api.url.demo,
      data: {},
      // dataType: "dataType",
      success: data => {
        this.person = data.data || this.person;
      }
    });
  },
  methods: {
    save() {
      if (this.$verify.check()) {
        if (this.popup.value === this.popup.valueIn) {
          return (this.popup.state = false);
        }
        this.$api.ajax({
          type: "post",
          url: this.$api.url.demo,
          data: {},
          // dataType: "dataType",
          success: data => {
            setTimeout(() => {
              this.$toast({
                type: "success",
                message: "保存成功",
                duration: 1000
              });
              setTimeout(() => {
                this.popup.state = false;
              }, 300);
            }, 300);
          }
        });
      }
    },

    popupOpen(item, key) {
      this.popup.title = item.lable;
      this.popup.valueIn = item.value;
      this.popup.value = item.value;
      this.popup.state = true;
      this.$verify.check();

      setTimeout(() => {
        document.querySelector(".change-field input").focus();
      }, 500);
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.item:active {
  background-color: #e8e8e8;
}

.ptip {
  padding-left: 10px;
}
.van-field__error-message {
  padding-left: 20px;
}
.change-field {
  border-bottom: 1px solid #1e96fa;
}
</style>
