<template>
  <div class="editHtml">
    <vue-html5-editor :content="content" :height="500" @change="updateData" class="html5-edit"></vue-html5-editor>   
  </div>
</template>



<script>
import "font-awesome/css/font-awesome.css";
import Vue from "vue";
import editor from "vue-html5-editor";
import moment from "moment";
Vue.use(editor, {
  i18n: {
    //i18n for custom module
    "en-us": {
      date: "insert current time",
      emoji: "emoji"
    }
  },
  //config custom module
  date: {
    format: "YYYY-MM-DD"
  },
  modules: [
    {
      name: "date",
      icon: "fa fa-calendar",
      i18n: "time",
      show: true,
      init: function(editor) {
        // alert("time module init, config is \r\n" + JSON.stringify(this.config));
      },
      handler: function(editor) {
        editor.execCommand(
          "insertHTML",
          moment().format(this.config.format || "YYYY-MM-DD HH:mm")
        );
      },
      destroyed: function(editor) {
        // alert("time module destroyed");
      }
    }
    // {
    //   //custom module with dashboard.html
    //   name: "emoji",
    //   icon: "fa fa-smile-o",
    //   i18n: "emoji",
    //   show: true,
    //   init: function(editor) {
    //     console.log("emoji module init");
    //   },
    //   //vue component
    //   dashboard: {
    //     template: "#template-emoji",
    //     data: function() {
    //       return {
    //         symbols: [
    //           ">_<|||",
    //           "^_^;",
    //           "⊙﹏⊙‖∣°",
    //           "^_^|||",
    //           '^_^"',
    //           "→_→",
    //           "..@_@|||||..",
    //           "…(⊙_⊙;)…",
    //           "o_o ....",
    //           "O__O",
    //           "///^_^.......",
    //           "?o?|||",
    //           "( ^_^ )? ",
    //           "(+_+)?",
    //           "（?ε?）? ",
    //           "o_O???",
    //           "@_@a",
    //           "一 一+",
    //           '>"<||||',
    //           "‘(*>﹏<*)′"
    //         ]
    //       };
    //     },
    //     methods: {
    //       insertSymbol: function(symbol) {
    //         //$parent is editor component instance
    //         // this.$parent.execCommand("insertHTML", symbol);
    //       }
    //     }
    //   }
    // }
  ]
});

export default {
  name: "editHTML",
  props: {
    content: {
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    updateData: function(data) {
      // sync content to component
      // this.content = data;
      // console.log(data);
      this.$emit("update:content", data);
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>

</style>
