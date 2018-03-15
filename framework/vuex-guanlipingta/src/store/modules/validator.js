const validator = {
  data() {
    return {
      validRules: {
        required: [{
          require: true,
          message: "不能为空",
          trigger: "blur"
        }],
        account: [{
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 8,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur"
          }
        ],
        nickname: [{
            required: true,
            message: "名字不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur"
          }
        ],
        mobile: [{
            required: true,
            message: "手机不能为空",
            trigger: "blur"
          },
          {
            validator: this.api.validateTel,
            message: "手机格式不对",
            trigger: "blur"
          }
        ]

      }
    }
  },
  created() {},
  methods: {},
  mounted: function () {}
}

export {
  validator
}
