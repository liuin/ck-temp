=begin 
本文档是HBuilder预置的微信js sdk代码块的文件。注意不要把其他语言的设置放到这里来。
如果用户修改此文档，HBuilder升级后会覆盖用户的修改，建议进入菜单 工具→扩展代码块 扩展相应的代码块。
若修改本文档，需要重启才能生效。修改过程中注意备份。

脚本开源地址 https://github.com/dcloudio/HBuilderRubyBundle

1、编辑代码块
如果要新增一个代码块，复制如下一段代码到空白行，然后设定参数。
snippet "document.getElementById" do |s|            #'document.getElementById'是代码块的显示名字；
    s.trigger = "dgi"                               #'dgi' 是激活字符，比如输入dgi均会在代码提示时显示该代码块；
    s.expansion = "document.getElementById(\"$1\")" #expansion是设定该代码块的输出字符，其中$0、$1是光标的停留和切换位置。
                                                    #如果输出涉及到换行和tab，也需严格在这里使用换行和tab。
                                                    #输出双引号在前面加\来转义，输出$使用\$(单引号中)或\\$(双引号中)转义
    s.needApplyReContentAssist = true               #输入代码块后立即在$1位置激活代码提示助手
end

2、编辑按键命令
如果要新增一个按键操作命令，复制如下一段代码到空白行，然后设定参数。
  command t(:multicomment) do |cmd| #:首先起个名字,multicomment是名字
    cmd.key_binding = 'M1+M2+/' #这里绑定触发按键，这里是Ctrl+Shift+/
    cmd.input = :selection #输入内容是选中区域的内容
    cmd.invoke do |context|
      selection = ENV['TM_SELECTED_TEXT'] || ''
      # 如果选区长度大于0，则输出如下字符。回车符就使用真实回车。如下输出即在选中内容前后加上/* */的注释
      if selection.length > 0
        "/*
${1:#{selection}}
*/"
      end
    end
  end

=end

require 'ruble'

with_defaults :scope => "source.js" do   #=====JS代码块编辑===============================
  snippet "wx.error" do |s|
    s.trigger = "wxerror"
    s.description = "通过error接口处理失败验证，所有接口通过wx对象(也可使用jWeixin对象)来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：\n	1.success：接口调用成功时执行的回调函数。\n	2.fail：接口调用失败时执行的回调函数。\n	3.complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。\n	4.cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。\n	5.trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。\n以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：\n	1.调用成功时：\"xxx:ok\" ，其中xxx为调用的接口名\n	2.用户取消时：\"xxx:cancel\"，其中xxx为调用的接口名\n	3.调用失败时：其值为具体错误信息"
    s.expansion = "wx.error(function(res){
	// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	$0
});"
  end
  
  snippet "wx.ready" do |s|
    s.trigger = "wxready"
    s.description = "通过ready接口处理成功验证"
    s.expansion = "wx.ready(function(){
	// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	$0
});"
  end
  
  snippet "wx.config" do |s|
    s.trigger = "wxconfig"
    s.description = "通过config接口注入权限验证配置，所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用）。"
    s.expansion = "wx.config({
	debug: ${1:true/false}, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	appId: '$2', // 必填，公众号的唯一标识
	timestamp: ${3:0}, // 必填，生成签名的时间戳
	nonceStr: '$4', // 必填，生成签名的随机串
	signature: '$5',// 必填，签名
	jsApiList: ['${6:onMenuShareTimeline/onMenuShareAppMessage/onMenuShareQQ/onMenuShareWeibo/startRecord/stopRecord/onVoiceRecordEnd/playVoice/pauseVoice/stopVoice/onVoicePlayEnd/uploadVoice/downloadVoice/chooseImage/previewImage/uploadImage/downloadImage/translateVoice/getNetworkType/openLocation/getLocation/hideOptionMenu/showOptionMenu/hideMenuItems/showMenuItems/hideAllNonBaseMenuItem/showAllNonBaseMenuItem/closeWindow/scanQRCode/chooseWXPay/openProductSpecificView/addCard/chooseCard/openCard}'] // 必填，需要使用的JS接口列表
});"
  end
  
  snippet "wx.checkJsApi" do |s|
    s.trigger = "wxcheckjsapi"
    s.description = "判断当前客户端版本是否支持指定JS接口，checkJsApi接口是客户端6.0.2新引入的一个预留接口，第一期开放的接口均可不使用checkJsApi来检测"
    s.expansion = "wx.checkJsApi({
	jsApiList: ['${1:onMenuShareTimeline/onMenuShareAppMessage/onMenuShareQQ/onMenuShareWeibo/startRecord/stopRecord/onVoiceRecordEnd/playVoice/pauseVoice/stopVoice/onVoicePlayEnd/uploadVoice/downloadVoice/chooseImage/previewImage/uploadImage/downloadImage/translateVoice/getNetworkType/openLocation/getLocation/hideOptionMenu/showOptionMenu/hideMenuItems/showMenuItems/hideAllNonBaseMenuItem/showAllNonBaseMenuItem/closeWindow/scanQRCode/chooseWXPay/openProductSpecificView/addCard/chooseCard/openCard}'],
	success: function(res) {
		// 以键值对的形式返回，可用的api值true，不可用为false
		// 如：{\"checkResult\":{\"chooseImage\":true},\"errMsg\":\"checkJsApi:ok\"}
		$0
	}
});"
  end
  
  snippet "wx.onMenuShareTimeline" do |s|
    s.trigger = "wxonmenusharetimeline"
    s.description = "获取“分享到朋友圈”按钮点击状态及自定义分享内容接口"
    s.expansion = "wx.onMenuShareTimeline({
	title: '$1', // 分享标题
	link: '$2', // 分享链接
	imgUrl: '$3', // 分享图标
	success: function () { 
		// 用户确认分享后执行的回调函数
		$4
	},
	cancel: function () { 
		// 用户取消分享后执行的回调函数
		$5
	}
});"
  end
  
  snippet "wx.onMenuShareAppMessage" do |s|
    s.trigger = "wxonmenushareappmessage"
    s.description = "获取“分享给朋友”按钮点击状态及自定义分享内容接口"
    s.expansion = "wx.onMenuShareAppMessage({
	title: '$1', // 分享标题
	desc: '$2', // 分享描述
	link: '$3', // 分享链接
	imgUrl: '$4', // 分享图标
	type: '${5:link/music/video}', // 分享类型,music、video或link，不填默认为link
	dataUrl: '$6', // 如果type是music或video，则要提供数据链接，默认为空
	success: function () { 
		// 用户确认分享后执行的回调函数
		$8
	},
	cancel: function () { 
		// 用户取消分享后执行的回调函数
		$9
	}
});"
  end
  
  snippet "wx.onMenuShareQQ" do |s|
    s.trigger = "wxonmenushareqq"
    s.description = "获取“分享到QQ”按钮点击状态及自定义分享内容接口"
    s.expansion = "wx.onMenuShareQQ({
	title: '$1', // 分享标题
	desc: '$2', // 分享描述
	link: '$3', // 分享链接
	imgUrl: '$4', // 分享图标
	success: function () { 
		// 用户确认分享后执行的回调函数
		$5
	},
	cancel: function () { 
		// 用户取消分享后执行的回调函数
		$6
	}
});"
  end
  
  snippet "wx.onMenuShareWeibo" do |s|
    s.trigger = "wxonmenushareweibo"
    s.description = "获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口"
    s.expansion = "wx.onMenuShareWeibo({
	title: '$1', // 分享标题
	desc: '$2', // 分享描述
	link: '$3', // 分享链接
	imgUrl: '$4', // 分享图标
	success: function () { 
		// 用户确认分享后执行的回调函数
		$5
	},
	cancel: function () { 
		// 用户取消分享后执行的回调函数
		$6
	}
});"
  end
  
  snippet "wx.chooseImage" do |s|
    s.trigger = "wxchooseimage"
    s.description = "拍照或从手机相册中选图接口"
    s.expansion = "wx.chooseImage({
	success: function (res) {
		var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		$0
	}
});"
  end
  
  snippet "wx.previewImage" do |s|
    s.trigger = "wxpreviewimage"
    s.description = "预览图片接口"
    s.expansion = "wx.previewImage({
	current: '$1', // 当前显示的图片链接
	urls: [$2] // 需要预览的图片链接列表
});"
  end
  
  snippet "wx.uploadImage" do |s|
    s.trigger = "wxuploadimage"
    s.description = "上传图片接口"
    s.expansion = "wx.uploadImage({
	localId: '$1', // 需要上传的图片的本地ID，由chooseImage接口获得
	isShowProgressTips: ${2:1},// 默认为1，显示进度提示
	success: function (res) {
		var serverId = res.serverId; // 返回图片的服务器端ID
		$0
	}
});"
  end
  
  snippet "wx.downloadImage" do |s|
    s.trigger = "wxdownloadimage"
    s.description = "下载图片接口"
    s.expansion = "wx.downloadImage({
	serverId: '$1', // 需要下载的图片的服务器端ID，由uploadImage接口获得
	isShowProgressTips: ${2:1},// 默认为1，显示进度提示
	success: function (res) {
		var localId = res.localId; // 返回图片下载后的本地ID
		$0
	}
});"
  end
  
  snippet "wx.startRecord" do |s|
    s.trigger = "wxstartrecord"
    s.description = "开始录音接口"
    s.expansion = "wx.startRecord();"
  end
  
  snippet "wx.stopRecord" do |s|
    s.trigger = "wxstoprecord"
    s.description = "停止录音接口"
    s.expansion = "wx.stopRecord({
	success: function (res) {
		var localId = res.localId;
		$0
	}
});"
  end
  
  snippet "wx.onVoiceRecordEnd" do |s|
    s.trigger = "wxonvoicerecordend"
    s.description = "监听录音自动停止接口"
    s.expansion = "wx.onVoiceRecordEnd({
	// 录音时间超过一分钟没有停止的时候会执行 complete 回调
	complete: function (res) {
		var localId = res.localId; 
		$0
	}
});"
  end
  
  snippet "wx.playVoice" do |s|
    s.trigger = "wxplayvoice"
    s.description = "播放语音接口"
    s.expansion = "wx.playVoice({
	localId: '$1' // 需要播放的音频的本地ID，由stopRecord接口获得
});"
  end
  
  snippet "wx.pauseVoice" do |s|
    s.trigger = "wxpausevoice"
    s.description = "暂停播放接口"
    s.expansion = "wx.pauseVoice({
    localId: '$1' // 需要暂停的音频的本地ID，由stopRecord接口获得
});"
  end
  
  snippet "wx.stopVoice" do |s|
    s.trigger = "wxstopvoice"
    s.description = "停止播放接口"
    s.expansion = "wx.stopVoice({
	localId: '$1' // 需要停止的音频的本地ID，由stopRecord接口获得
});"
  end
  
  snippet "wx.onVoicePlayEnd" do |s|
    s.trigger = "wxonvoiceplayend"
    s.description = "监听语音播放完毕接口"
    s.expansion = "wx.onVoicePlayEnd({
	serverId: '$1', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
	success: function (res) {
		var localId = res.localId; // 返回音频的本地ID
		$0
	}
});"
  end
  
  snippet "wx.uploadVoice" do |s|
    s.trigger = "wxuploadvoice"
    s.description = "上传语音接口"
    s.expansion = "wx.uploadVoice({
	localId: '$1', // 需要上传的音频的本地ID，由stopRecord接口获得
	isShowProgressTips: ${2:1},// 默认为1，显示进度提示
	success: function (res) {
		var serverId = res.serverId; // 返回音频的服务器端ID
		$0
	}
});"
  end
  
  snippet "wx.downloadVoice" do |s|
    s.trigger = "wxdownloadvoice"
    s.description = "下载语音接口"
    s.expansion = "wx.downloadVoice({
	serverId: '$1', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
	isShowProgressTips: ${2:1},// 默认为1，显示进度提示
	success: function (res) {
		var localId = res.localId; // 返回音频的本地ID
		$0
	}
});"
  end
  
  snippet "wx.translateVoice" do |s|
    s.trigger = "wxtranslatevoice"
    s.description = "识别音频并返回识别结果接口"
    s.expansion = "wx.translateVoice({
	localId: '$1', // 需要识别的音频的本地Id，由录音相关接口获得
	isShowProgressTips: ${2:1}, // 默认为1，显示进度提示
	success: function (res) {
		alert(res.translateResult); // 语音识别的结果
		$0
	}
});"
  end
  
  snippet "wx.getNetworkType" do |s|
    s.trigger = "wxgetnetworktype"
    s.description = "获取网络状态接口"
    s.expansion = "wx.getNetworkType({
	success: function (res) {
		var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
		$0
	}
});"
  end
  
  snippet "wx.openLocation" do |s|
    s.trigger = "wxopenlocation"
    s.description = "使用微信内置地图查看位置接口"
    s.expansion = "wx.openLocation({
	latitude: ${1:0}, // 纬度，浮点数，范围为90 ~ -90
	longitude: ${2:0}, // 经度，浮点数，范围为180 ~ -180。
	name: '$3', // 位置名
	address: '$4', // 地址详情说明
	scale: ${5:1}, // 地图缩放级别,整形值,范围从1~28。默认为最大
	infoUrl: '$6' // 在查看位置界面底部显示的超链接,可点击跳转
});"
  end
  
  snippet "wx.getLocation" do |s|
    s.trigger = "wxgetlocation"
    s.description = "获取地理位置接口"
    s.expansion = "wx.getLocation({
	timestamp: ${1:0}, // 位置签名时间戳，仅当需要兼容6.0.2版本之前时提供
	nonceStr: '$2', // 位置签名随机串，仅当需要兼容6.0.2版本之前时提供
	addrSign: '$3', // 位置签名，仅当需要兼容6.0.2版本之前时提供，详见附录4
	success: function (res) {
		var longitude = res.longitude; // 纬度，浮点数，范围为90 ~ -90
		var latitude = res.latitude; // 经度，浮点数，范围为180 ~ -180。
		var speed = res.speed; // 速度，以米/每秒计
		var accuracy = res.accuracy; // 位置精度
		$0
	}
});"
  end
  
  snippet "wx.hideOptionMenu" do |s|
    s.trigger = "wxhideoptionmenu"
    s.description = "隐藏右上角菜单接口"
    s.expansion = "wx.hideOptionMenu();"
  end
  
  snippet "wx.showOptionMenu" do |s|
    s.trigger = "wxshowoptionmenu"
    s.description = "显示右上角菜单接口"
    s.expansion = "wx.showOptionMenu();"
  end
  
  snippet "wx.closeWindow" do |s|
    s.trigger = "wxclosewindow"
    s.description = "关闭当前网页窗口接口"
    s.expansion = "wx.closeWindow();"
  end
  
  snippet "wx.hideMenuItems" do |s|
    s.trigger = "wxhidemenuitems"
    s.description = "批量隐藏功能按钮接口"
    s.expansion = "wx.hideMenuItems({
	menuList: [$1] // 要隐藏的菜单项
});"
  end
  
  snippet "wx.showMenuItems" do |s|
    s.trigger = "wxshowmenuitems"
    s.description = "批量显示功能按钮接口"
    s.expansion = "wx.showMenuItems({
	menuList: [$1] // 要显示的菜单项
});"
  end
  
  snippet "wx.hideAllNonBaseMenuItem" do |s|
    s.trigger = "wxhideallnonbasemenuitem"
    s.description = "隐藏所有非基础按钮接口"
    s.expansion = "wx.hideAllNonBaseMenuItem();"
  end
  
  snippet "wx.showAllNonBaseMenuItem" do |s|
    s.trigger = "wxshowallnonbasemenuitem"
    s.description = "显示所有功能按钮接口"
    s.expansion = "wx.showAllNonBaseMenuItem();"
  end
  
  snippet "wx.scanQRCode" do |s|
    s.trigger = "wxscanqrcode"
    s.description = "调起微信扫一扫接口"
    s.expansion = "wx.scanQRCode({
	desc: '$1',
	needResult: ${2:0}, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	scanType: [\"qrCode\",\"barCode\"], // 可以指定扫二维码还是一维码，默认二者都有
	success: function (res) {
		var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		$0
	}
});"
  end
  
  snippet "wx.openProductSpecificView" do |s|
    s.trigger = "wxopenproductspecificview"
    s.description = "跳转微信商品页接口"
    s.expansion = "wx.openProductSpecificView({
	productId: '$1', // 商品id
	viewType: '$2' // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
});"
  end
  
  snippet "wx.chooseCard" do |s|
    s.trigger = "wxchoosecard"
    s.description = "调起适用于门店的卡券列表并获取用户选择列表"
    s.expansion = "wx.chooseCard({
	shopId: '$1', // 门店Id
	cardType: '$2', // 卡券类型
	cardId: '$3', // 卡券Id
	timeStamp: ${4:0}, // 卡券签名时间戳
	nonceStr: '$5', // 卡券签名随机串
	cardSign: '$6', // 卡券签名，详见附录6
	success: function (res) {
		var cardList= res.cardList; // 用户选中的卡券列表信息
		$0
	}
});"
  end
  
  snippet "wx.addCard" do |s|
    s.trigger = "wxaddcard"
    s.description = "批量添加卡券接口"
    s.expansion = "wx.addCard({
	cardList: [{
		cardId: '$1',
		cardExt: '$2'
	}], // 需要添加的卡券列表
	success: function (res) {
		var cardList = res.cardList; // 添加的卡券列表信息
		$0
	}
});"
  end
  
  snippet "wx.openCard" do |s|
    s.trigger = "wxopencard"
    s.description = "查看微信卡包中的卡券接口"
    s.expansion = "wx.openCard({
	cardList: [{
		cardId: '$1',
		code: '$2'
	}]// 需要打开的卡券列表
});"
  end
  
  snippet "wx.chooseWXPay" do |s|
    s.trigger = "wxchoosewxpay"
    s.description = "发起一个微信支付请求"
    s.expansion = "wx.chooseWXPay({
	timestamp: ${1:0}, // 支付签名时间戳
	noncestr: '$2', // 支付签名随机串
	package: '$3', // 订单详情扩展字符串
	paySign: '$4' // 支付签名
});"
  end
  
end
