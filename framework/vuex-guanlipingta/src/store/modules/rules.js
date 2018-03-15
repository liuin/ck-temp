const rules = {
  data() {

    return {
      rules: {
        required: [{
          required: true,
          message: '请填写内容',
          trigger: 'blur'
        }],
        date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }],
        type: [{
          type: 'array',
          required: true,
          message: '请至少选择一个选项',
          trigger: 'change'
        }],
        pwdRep: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  }
}


export {
  rules
}
