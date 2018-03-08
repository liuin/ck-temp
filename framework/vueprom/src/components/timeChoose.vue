<template>
  <van-popup class="timebox " :value="timeState" @input="changeTimeState" position="right" :overlay="true">
    <div class="box">
      <h3>选择日期</h3>
      <div class="line1"></div>
      <div class="timepro">
        <div class="time1" @click="dateShow = true; clickDate = 'time1'">
          {{dateStart}}
        </div>
        <div class="sp">-</div>
        <div class="time2" @click="dateShow = true; clickDate = 'time2'">
          {{dateEnd}}
        </div>
      </div>

      <div class="timechoose">
        <span class="item" @click="spTime('week1')">一周</span>
        <span class="item" @click="spTime('month1')">一个月</span>
        <span class="item" @click="spTime('month3')">三个月</span>
      </div>

      <div class="linkground">
        <div class="btn1" @click="changeTime('cancel')">取消</div>
        <div class="btn2" @click="changeTime('config')">确定</div>
      </div>

      <van-popup v-model="dateShow" overlay-class="date-show-model" class="date-show" position="bottom" :overlay="true">
        <van-datetime-picker class="datetime1" v-model="currentDate"  type="date" @confirm="confirm" @cancel="cancel" />  
      </van-popup>
      
    </div>
  </van-popup>
</template>
<script>
export default {
  name: "loginBox",
  props: {
    timeState: {
      default: true
    }
  },
  watch: {},
  data() {
    return {
      time: [],
      clickDate: "",
      dateStart: this.$moment(new Date()).format("YYYY-MM-DD"),
      dateEnd: this.$moment(new Date()).format("YYYY-MM-DD"),
      currentDate: new Date(),
      dateShow: false
    };
  },
  created() {},
  methods: {
    changeTime(type) {
      switch (type) {
        case "cancel":
          this.$emit("update:timeState", false);
          break;
        case "config":
          let time = [
            this.$moment(this.dateStart).unix(),
            this.$moment(this.dateEnd).unix()
          ];
          this.$emit("updateTime", time);
          this.$emit("update:timeState", false);
          break;

        default:
          break;
      }
    },
    spTime(type) {
      switch (type) {
        case "week1":
          this.dateStart = this.$moment()
            .subtract(1, "week")
            .format("YYYY-MM-DD");
          this.dateEnd = this.$moment(new Date()).format("YYYY-MM-DD");
          break;
        case "month1":
          this.dateStart = this.$moment()
            .subtract(1, "month")
            .format("YYYY-MM-DD");
          this.dateEnd = this.$moment(new Date()).format("YYYY-MM-DD");
          break;
        case "month3":
          this.dateStart = this.$moment()
            .subtract(3, "month")
            .format("YYYY-MM-DD");
          this.dateEnd = this.$moment(new Date()).format("YYYY-MM-DD");
          break;
        default:
          break;
      }
    },
    changeTimeState(val) {
      if (val == false) {
        this.$emit("update:timeState", false);
      }
    },
    confirm(value) {
      if (this.clickDate == "time1") {
        this.dateStart = this.$moment(value).format("YYYY-MM-DD");
      }
      if (this.clickDate == "time2") {
        this.dateEnd = this.$moment(value).format("YYYY-MM-DD");
      }
      this.dateShow = false;
    },
    cancel() {
      this.dateShow = true;
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.timebox {
  left: 80px;
  width: 240px;
}

.box {
  // font-size: 12px;
  padding: 10px;
}
.datetime1 {
  width: 320px;
}
.date-show {
  margin-left: -40px;
  width: 320px;
}

.timepro {
  background: #f2f3f5;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  .time1,
  .time2 {
    background: #fff;
    padding: 5px 10px;
  }
  .sp {
    display: inline-block;
    margin: 0 0px;
    font-size: 16px;
  }
}
.timechoose {
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
  .item {
    display: inline-block;
    border-radius: 5px;
    background: #f2f3f5;
    padding: 5px 0px;
    width: 60px;
    text-align: center;
    &:active {
      background: #ddd;
    }
  }
}
.linkground {
  position: absolute;
  display: flex;
  bottom: 0;
  width: 240px;
  margin-left: -10px;
  line-height: 35px;
  .btn1 {
    flex: 1;
    text-align: center;
    background: #d0d2d9;
    color: #343c5c;
  }
  .btn2 {
    flex: 1;
    text-align: center;
    background: #343c5c;
    color: #fff;
  }
}
</style>
