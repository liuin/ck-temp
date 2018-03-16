const personOther = {
  data() {
    return {
      personOther: {},
      personOtherList: {
        username: {
          value: "",
          lable: "客户账号",
        },
        nickname: {
          value: "",
          lable: "联系人"
        },
        company: {
          value: "",
          lable: "公司名称"
        },
        phone: {
          value: "",
          lable: "联系电话"
        },
        email: {
          value: "",
          lable: "电子邮箱"
        },
        qq_num: {
          value: "",
          lable: "QQ"
        }
      }
    }
  },
  created() {
    var id = this.$route.query.id;
    this.$api.ajax({
      type: "post",
      url: this.$api.url.userShow,
      data: {
        id: id
      },
      // dataType: "dataType",
      success: data => {
        this.personOther = data;
        // for (const key in this.personOtherList) {
        //   if (this.personOtherList.hasOwnProperty(key) && data.hasOwnProperty(key)) {
        //     this.personOtherList[key].value = data[key];
        //   }
        // }
        // console.log(this.personOtherList);

      }
    });
  },
  methods: {

  },
  mounted: function () {}
}


export {
  personOther
}
