<template>
  <div class="system-account-add">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>

  <el-form class="form" label-position="right" label-width="120px" >
    <el-row>
      <el-col :span="7">
        <el-form-item label="省份城市">
          
         <Region :clearable="true" :selected.sync="regionUpdate" :limitLen="2" @change="regionCahge" />   
        </el-form-item> 
      </el-col>
     
    </el-row>
    
    <el-form-item label="园区名称">
      <el-input v-model="update.title"></el-input>
    </el-form-item> 
    <el-form-item label="具体地址">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="address" class="my-autocomplete1"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick">
        </i>
        <template slot-scope="props">
          <div class="name">{{ props.item.value }}</div>
          <span class="addr">{{ props.item.address }}</span>
        </template>
      </el-autocomplete>
<!--       <el-input v-model=""></el-input> -->
    </el-form-item> 
    <el-form-item label="园区区域坐标">
<!--           {{aMap.arr}} -->
<!--       <el-input ></el-input> -->
<!--       <div class="line2"></div> -->
<!--       <el-amap class="amap-box" :vid="'amap-vue'"></el-amap> -->
      <el-button id="polygon" :disabled="aMap.hasDraw">绘画区域</el-button>
      <el-button id="done" :disabled="!aMap.hasDraw">完成</el-button>
      <el-button id="doneEdit" :disabled="!aMap.hasDraw">重新编辑</el-button>
      <el-button id="reset" :disabled="!aMap.hasDraw">清除重画</el-button>
      <div class="line2"></div>
      <div class="amap-box" id="amapContainer"></div>
    </el-form-item> 
    <el-form-item label="简介" >
      <el-input type="textarea" v-model="update.introduction" :autosize="{ minRows: 4, maxRows: 10}"></el-input>
    </el-form-item> 
    <el-form-item label="状态">
      <el-radio-group v-model="update.state">    
        <el-radio v-for="(item,index) in state" :label="index" :key="index">{{item}}</el-radio>
      </el-radio-group>
    </el-form-item> 

    <el-form-item label="">
      <el-button type="primary" @click="save()">提　交</el-button>
    </el-form-item> 




    
    </el-form>
</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Vue from "vue";
import VueAMap from "vue-amap";
import { lazyAMapApiLoaderInstance } from "vue-amap";

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "6810aee74910a4655348b7b5a4cc8b7b",
  plugin: [
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.Geocoder",
    "AMap.MouseTool",
    "AMap.PolyEditor",
    "AMap.Autocomplete"
  ]
});

export default {
  name: "",
  data() {
    return {
      map: "",
      aMap: {
        arr: [],
        hasDraw: false,
        geocoder: "",
        autocomplete: {},
        zoom: 14,
        autoTip: []
      },
      address: "",
      currentLabels: []
      //        regionUpdate: []
    };
  },
  computed: {
    ...mapState("park", ["state", "update"]),
    ...mapGetters("park", ["regionUpdate"])
  },
  created() {
    this.aMap.arr = this.update.locations;
    this.update.id = this.$route.query.id;

    this.$store.dispatch("park/show", { id: this.update.id }).then(data => {
      this.update.title = data.park.title;
      this.address = this.update.address = data.park.address;
      this.update.locations = data.park.locations;
      this.update.introduction = data.park.introduction;
      this.update.province = data.park.province_id;
      this.update.city = data.park.city_id;
      this.update.state = data.park.state.toString();

      //        var loc = api.toLocations(this.update.locations);
      var loc = this.update.locations;

      this.aMap.arr = loc;

      //        this.update.province = "2"
      //        this.update.city = "52"

      //        this.regionUpdate = ["2", "52"]

      this.loadMap();
    });
  },
  watch: {
    address: _.debounce(function(newValue, oldValue) {
      if (newValue != "" && this.aMap.geocoder != "") {
        this.currentLabels[0] =
          this.currentLabels[0] == undefined ? "" : this.currentLabels[0];
        this.currentLabels[1] =
          this.currentLabels[1] == undefined ? "" : this.currentLabels[1];
        this.aMap.geocoder.getLocation(
          this.currentLabels[0] + this.currentLabels[1] + this.address,
          (status, result) => {
            console.log(
              this.currentLabels[0] + this.currentLabels[1] + this.address,
              status
            );
            if (status === "complete" && result.info === "OK") {
              this.map.setCenter([
                result.geocodes[0].location.lng,
                result.geocodes[0].location.lat
              ]);
              this.map.setZoom(20);
            }
          }
        );
      }
    }, 700)
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },

    querySearch: _.debounce(function(queryString, cb) {
      if (queryString == "") {
        return cb([]);
      }
      this.aMap.autoTip = [];
      this.aMap.autocomplete.search(queryString, (status, result) => {
        if (status == "complete") {
          result.tips.map(item => {
            this.aMap.autoTip.push({ value: item.address, address: item.name });
          });
        }
        cb(this.aMap.autoTip);
      });
    }, 700),
    handleSelect() {},
    save() {
      var locations = this.aMap.arr.join("|");

      var sendData = {
        id: this.update.id,
        province: this.update.province,
        city: this.update.city,
        title: this.update.title,
        address: this.address,
        locations: locations,
        introduction: this.update.introduction,
        //          desc: "aaabbb",
        state: this.update.state
      };

      this.$store.dispatch("park/update", sendData).then(data => {
        this.$alert("编辑成功", "", {
          confirmButtonText: "确定",
          type: "success",
          callback: action => {
            this.$router.back();
            //                this.create = {
            //                  province: 12,
            //                  city: 223,
            //                  title: "",
            //                  address: "",
            //                  locations: "",
            //                  introduction: "",
            //                  desc: "",
            //                  state: "0"
            //                }
          }
        });
      });
    },
    regionCahge(arr, currentLabels) {
      this.currentLabels = currentLabels;
      this.update.province = arr[0];
      this.update.city = arr[1];
      this.aMap.geocoder.getLocation(
        currentLabels[0] + currentLabels[1] + this.address,
        (status, result) => {
          if (status === "complete" && result.info === "OK") {
            this.map.setCenter([
              result.geocodes[0].location.lng,
              result.geocodes[0].location.lat
            ]);
            this.map.setZoom(this.aMap.zoom);
          }
        }
      );
      this.aMap.autocomplete.setCity(arr[1]);
    },
    handleClick() {},
    handleCheckAllChange() {},

    loadMap() {
      var _this = this;

      //高德地图
      lazyAMapApiLoaderInstance.load().then(() => {
        // your code ...

        _this.map = new AMap.Map("amapContainer", {
          resizeEnable: true,
          zoom: _this.aMap.zoom
        });

        var polygon1 = "";
        var polygon1Editor = "";
        var overlayGroup = "";

        //          _this.map.setCenter(new AMap.LngLat(121.59996, 31.197646));

        _this.aMap.geocoder = new AMap.Geocoder({});
        _this.aMap.autocomplete = new AMap.Autocomplete({
          citylimit: true,
          city: "广州",
          datatype: "poi"
        });
        //
        //        //地理编码,返回地理编码结果
        //        geocoder.getLocation("北京市海淀区苏州街", function(status, result) {
        //            console.log(status);
        //            if (status === 'complete' && result.info === 'OK') {
        ////                geocoder_CallBack(result);
        //
        //            }
        //        });

        //           _this.map.setCity('北京市');

        if (_this.aMap.arr.length > 0) {
          _this.aMap.hasDraw = true;
          polygon1 = new AMap.Polygon({
            path: _this.aMap.arr, //设置多边形边界路径
            strokeColor: "#FF33FF", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线宽
            fillColor: "#1791fc", //填充色
            fillOpacity: 0.35 //填充透明度
          });
          polygon1.setMap(_this.map);
          _this.map.setFitView();
          polygon1Editor = new AMap.PolyEditor(_this.map, polygon1);
          //            polygon1Editor.open();
        }

        var mouseTool = new AMap.MouseTool(_this.map);

        //开启画图
        AMap.event.addDomListener(
          document.getElementById("polygon"),
          "click",
          function() {
            mouseTool.polygon();
          },
          false
        );

        AMap.event.addListener(mouseTool, "draw", function(type, obj) {
          mouseTool.close(true);
          _this.aMap.hasDraw = true;
          var polygonItem = type.obj;
          var path = polygonItem.getPath(); //取得绘制的多边形的每一个点坐标
          var arr = [];
          path.map(item => {
            arr.push([item.lng, item.lat]);
          });

          polygon1 = new AMap.Polygon({
            path: arr, //设置多边形边界路径
            strokeColor: "#FF33FF", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线宽
            fillColor: "#1791fc", //填充色
            fillOpacity: 0.35 //填充透明度
          });
          polygon1.setMap(_this.map);
          polygon1Editor = new AMap.PolyEditor(_this.map, polygon1);
          polygon1Editor.open();
        });

        AMap.event.addDomListener(
          document.getElementById("done"),
          "click",
          function() {
            polygon1Editor.close();
            var path = polygon1.getPath();

            _this.aMap.arr = [];
            path.map(item => {
              _this.aMap.arr.push([item.lng, item.lat]);
            });

            console.log(_this.aMap.arr);
          },
          false
        );

        AMap.event.addDomListener(
          document.getElementById("doneEdit"),
          "click",
          function() {
            polygon1Editor.open();
          },
          false
        );

        AMap.event.addDomListener(
          document.getElementById("reset"),
          "click",
          function() {
            polygon1Editor.close();
            polygon1.hide();
            polygon1Editor = "";
            overlayGroup = "";
            _this.aMap.hasDraw = false;
            _this.aMap.arr = [];
          },
          false
        );
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.form {
}
.tab-item {
}

.itemgroup {
  padding-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.save-btn {
  margin-top: 20px;
}
.amap-box {
  width: 100%;
  height: 500px;
}
.my-autocomplete1 {
  width: 100%;
}
.my-autocomplete {
  li {
    line-height: 24px;
    padding: 7px;
    & > div {
      height: 24px;
    }
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>