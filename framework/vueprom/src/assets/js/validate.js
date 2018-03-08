import Vue from "vue"
import verify from "vue-verify-plugin"

var rules={
    required:{
        test:/\S+/,
        message: '请输入内容'
    },
    mobile:{
		test:/(^1[34578]\d{9}$)|(^\s*$)/,
		message:"手机号码格式不正确"
	},
	tel:{
		test:/(^1[3|4|5|7|8]\d{9}$)|(^0\d{2,3}-?\d{7,8}$)|(^\s*$)/,
		message:"固话格式不正确"
	},
	email: {
        test: /(.+@.+\..+)|(^\s*$)/,
        message: '邮箱格式错误'
    },
    url: {
        test: /(^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[:?\d]*)\S*$)|(^\s*$)/,
        message: 'URL 格式错误'
    }
}
Vue.use(verify,{
    //blur:true,
    rules:rules
})