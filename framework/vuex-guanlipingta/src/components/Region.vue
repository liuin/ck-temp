<template>
    <div class="region">
    	 <el-cascader :options="options"  ref="opt" :clearable="clearable" :separator="separator" v-model="selectedOptions" @change="handleChange" @blur="handleBlur" />
    </div>
</template>
<script>
import RegionJson from "../assets/json/region.json";
export default {
  name: "region",
  props: {
    clearable: {
      default: false
    },
    limitProvince: Array,
    limitCity: Array,
    limitStreet: Array,
    selected: Array,
    separator: String,
    limitLen: {
      default: 3
    }
  },
  data() {
    return {
      options: [],
      selectedOptions: []
    };
  },
  created() {
    var that = this;
    if (that.selected) that.selectedOptions = that.selected;
    for (let p in RegionJson["1"]) {
      if (that.limitProvince && that.limitProvince.length > 0) {
        if (
          !that.inArray(p, that.limitProvince) &&
          !that.inArray(RegionJson["1"][p], that.limitProvince)
        )
          continue;
      }
      var obj = {};
      obj.value = p;
      obj.label = RegionJson["1"][p];
      if (RegionJson[p] && that.limitLen > 1) {
        for (let c in RegionJson[p]) {
          if (that.limitCity && that.limitCity.length > 0) {
            if (
              !that.inArray(c, that.limitCity) &&
              !that.inArray(RegionJson[p][c], that.limitCity)
            )
              continue;
          }
          var obj2 = {};
          obj2.value = c;
          obj2.label = RegionJson[p][c];
          if (RegionJson[c] && that.limitLen > 2) {
            for (let s in RegionJson[c]) {
              if (that.limitStreet && that.limitStreet.length > 0) {
                if (
                  !that.inArray(s, that.limitStreet) &&
                  !that.inArray(RegionJson[c][s], that.limitStreet)
                )
                  continue;
              }
              var obj3 = {};
              obj3.value = s;
              obj3.label = RegionJson[c][s];
              if (!obj2.children) obj2.children = [];
              obj2.children.push(obj3);
            }
          }
          if (!obj.children) obj.children = [];
          obj.children.push(obj2);
        }
      }
      that.options.push(obj);
    }
  },
  methods: {
    inArray(val, arr) {
      var flag = false;
      for (let i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    handleChange(val) {
      this.$emit("change", val, this.$refs.opt.currentLabels);
    },
    handleBlur() {
      console.log("blur");
      this.$emit("blur");
    }
  },
  watch: {
    selected: function(newValue, oldValue) {
      this.selectedOptions = newValue;
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>

</style>