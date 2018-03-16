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
import { mapState } from "vuex";

// import wx from "weixin-js-sdk";
// import { weixinShare } from "../store/modules/weixinShare.js";

export default {
  name: "money",
  computed: {
    ...mapState("login", ["userDes", "userSate"])
  },
  // mixins: [weixinShare],
  data() {
    return {
      popup: {
        state: false,
        value: "",
        title: "",
        key: ""
      },
      person: {
        id: {
          value: "",
          lable: "登录账号",
          key: "username"
        },
        name: {
          value: "",
          lable: "联系人",
          key: "nickname"
        },
        compName: {
          value: "",
          lable: "公司名称",
          key: "company"
        },
        tel: {
          value: "",
          lable: "联系电话",
          key: "phone"
        },
        email: {
          value: "",
          lable: "电子邮箱",
          key: "email"
        },
        qq: {
          value: "",
          lable: "QQ",
          key: "qq_num"
        }
      }
    };
  },
  verify: {
    popup: {
      value: [
        "required",
        {
          test: function(val) {
            if (this.popup.key == "phone" || this.popup.key == "username") {
              var re = /^1\d{10}$/;
              if (re.test(val)) {
                return true;
              } else {
                return false;
              }
            } else if (this.popup.key == "email") {
              var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
              if (re.test(val)) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          },
          message: "请输入格式不对"
        }
      ]
    }
  },
  created() {
    this.$store.dispatch("login/getUserDes").then(data => {
      console.log(data);
      this.person.id.value = data.username;
      this.person.name.value = data.nickname;
      this.person.compName.value = data.company;
      this.person.tel.value = data.phone;
      this.person.email.value = data.email;
      this.person.qq.value = data.qq_num;
    });
    // this.$api.ajax({
    //   type: "post",
    //   url: this.$api.url.demo,
    //   data: {},
    //   // dataType: "dataType",
    //   success: data => {
    //     this.person = data.data || this.person;
    //   }
    // });
  },
  methods: {
    save() {
      if (this.$verify.check()) {
        if (this.popup.value === this.popup.valueIn) {
          return (this.popup.state = false);
        }

        var key = this.popup.key;
        var sendDate = {};
        sendDate[key] = this.popup.value;
        console.log(sendDate);

        this.$api.ajax({
          type: "post",
          url: this.$api.url.userUpdateByMe,
          data: sendDate,
          // dataType: "dataType",
          success: data => {
            setTimeout(() => {
              this.$toast({
                type: "success",
                message: "保存成功",
                duration: 1000
              });

              for (var i in this.person) {
                if (this.person[i]["key"] == key) {
                  this.person[i].value = sendDate[key];
                }
              }

              setTimeout(() => {
                this.popup.state = false;
              }, 300);
            }, 300);
          }
        });
      }
    },

    popupOpen(item, key) {
      if (item.key == "username") {
        return false;
      }
      this.popup.title = item.lable;
      this.popup.valueIn = item.value;
      this.popup.value = item.value;
      this.popup.state = true;
      this.popup.key = item.key;
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
