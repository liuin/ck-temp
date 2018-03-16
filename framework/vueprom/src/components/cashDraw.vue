<template>
  <van-popup class="cashdraw grebg" :value="cashDrawState" @input="changeCashDrawState" position="right" :overlay="true">
    <div class="bg1">
    <van-nav-bar title="提现" left-arrow @click-left="$emit('update:cashDrawState', false)" />
    <van-cell-group>
      <van-cell class="item">
        可提金额: <span class="color2">¥{{userDes.frozen_pull_out_money}}</span>
      </van-cell>
    </van-cell-group>

    <!-- <van-radio-group v-model="activeType"> -->
      <h4 class="h4">选择提取方式:</h4>
      <van-cell-group>
        
        <van-cell v-for="(item,index) in listType" :key="index" class="item">
          <van-radio :name="index" v-model="activeType">{{item}}</van-radio>
        </van-cell>
      </van-cell-group>
    <!-- </van-radio-group> -->
     <h4 class="h4">提取信息:</h4>
     
    <van-cell-group v-if="activeTypeClone == 0" class="msglist-in">
      <van-field v-model="payDate.id"  @blur="(activeType == 0)?$verify.check('id'):''" v-verify.id="payDate.id" placeholder="请输入支付宝账号"
        icon="clear" @click-icon="payDate.id = ''" />
      <label class="van-field__error-message" v-remind="payDate.id"></label>
      <van-field v-model="payDate.name" @blur="$verify.check('name')" v-verify.name="payDate.name" placeholder="请输入姓名"
        icon="clear" @click-icon="payDate.name = ''" />
      <label class="van-field__error-message" v-remind="payDate.name"></label>
    </van-cell-group>

    <van-cell-group v-if="activeTypeClone == 1" class="msglist-in">
      <van-field v-model="bankDate.id" @blur="$verify.check('bankId')" v-verify.bankId="bankDate.id" placeholder="请输入银行卡号"
        icon="clear" @click-icon="bankDate.id = ''" />
      <label class="van-field__error-message" v-remind="bankDate.id"></label>

      <van-field v-model="bankDate.name" @blur="$verify.check('bankName')" v-verify.bankName="bankDate.name" placeholder="请输入银行卡姓名"
        icon="clear" @click-icon="bankDate.name = ''" /> 
      <label class="van-field__error-message" v-remind="bankDate.name"></label>

      <van-field v-model="bankDate.creatData" @blur="$verify.check('creatData')" v-verify.creatData="bankDate.creatData" placeholder="请输入开户行"
        icon="clear" @click-icon="bankDate.creatData = ''" />
      <label class="van-field__error-message" v-remind="bankDate.creatData"></label>      
    </van-cell-group>

    <div class="line2"></div>
    <van-button type="primary" size="large" id="tj" @click="submit()">提交</van-button>
    </div>
  </van-popup>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "cashdraw",
  props: {
    cashDrawState: {
      default: true
    },
    totle: {
      default: 0
    }
  },
  computed: {
    ...mapState("login", ["userDes", "userSate"])
  },
  watch: {
    activeType(newVal) {
      this.activeTypeClone = "none";
      this.activeTypeClone = newVal;
      // setTimeout(() => {
      //   document
      //     .querySelectorAll(".verify-error")[0]
      //     .classList.remove("verify-error");
      // }, 100);
    }
  },
  data() {
    return {
      activeType: "0",
      activeTypeClone: "0",
      listType: {
        0: "支付宝",
        1: "银行卡"
      },
      payDate: {
        id: "",
        name: ""
      },
      bankDate: {
        id: "",
        name: "",
        creatData: ""
      }
    };
  },
  created() {},
  verify: {
    payDate: {
      id: ["required"],
      name: ["required"]
    },
    bankDate: {
      id: ["required"],
      name: ["required"],
      creatData: ["required"]
    }
  },
  methods: {
    submit() {
      // console.log(this.$verify.check());
      if (this.$verify.check()) {
        if (this.activeType == "0") {
          var sendDate = {
            pull_out_card_type: 1,
            pull_out_card_num: this.payDate.id,
            pull_out_card_user: this.payDate.name,
            pull_out_card_bank: "网络"
          };
        }
        if (this.activeType == "1") {
          var sendDate = {
            pull_out_card_type: 2,
            pull_out_card_num: this.bankDate.id,
            pull_out_card_user: this.bankDate.name,
            pull_out_card_bank: this.bankDate.creatData
          };
        }

        this.$api.ajax({
          type: "post",
          url: this.$api.url.moneydetailPullout,
          data: sendDate,
          // dataType: "dataType",
          success: data => {
            //code
            this.$toast({
              // type: "success",
              message: "提现成功，7个工作日到账",
              duration: 1000
            });
            this.$emit("update:cashDrawState", false);
          }
        });
      }
    },
    changeCashDrawState() {}
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.h4 {
  margin-bottom: 0;
  padding: 10px;
}
// #tj {
//   position: fixed;
//   bottom: 20px;
// }

.line2 {
  // padding-top: 10px;
  background: #f2f3f5;
}
.cashdraw {
  position: absolute;
}
.bg1 {
  background: #f2f3f5;
}
</style>
