#TITLE=js&jquery(learn)
#INFO
New Cliptext library
#SORT=y

#T=$(window).scrollTop(); 页面滚动距离
$(window).scrollTop();
$(window).scroll(function(){})
#T=$.browser.msie
$.browser.msie
#T=//列表图片滚动
//列表图片滚动
	initBackAndForward: function() {
		var sprev=$('#tl_prev');
		var snext=$('#tl_next');
		var thumb_list=$('#thumb_list');
		var thumbs_scroll_interval=false;
		var has_scrolled = 0;
		

		$('#tl_prev,#tl_next').hover(function  () {
			var direction = 'left';
			  if($(this).is('.tl_prev')) {
				direction = 'right';
			  };
			  thumbs_scroll_interval = setInterval(
				function() {
				has_scrolled++;
				// Don't want to stop the slideshow just because we scrolled a pixel or two
				

				var left = thumb_list.scrollLeft() + 1;
				if(direction == 'left') {
				left = thumb_list.scrollLeft() - 1;
				};
				console.log(has_scrolled,left);
				thumb_list.scrollLeft(left);
				},
				30
			  );
		},
		function  () {
			has_scrolled = 0;
			clearInterval(thumbs_scroll_interval);
		}).click(function () {
			var left='';
			if($(this).is('.tl_prev')) 
			{
				left = thumb_list.scrollLeft() + 100;
			}
			else 
			{
				left = thumb_list.scrollLeft() - 100;
			}
			thumb_list.animate({scrollLeft: left +'px'});
		})
    }
#T=arguments
arguments
#T=arguments.callee
arguments.callee
#T=async  ajxa同步效果
async : false
#T=colors[key] 取josnKEY值
colors[key]
#T=cookie 相关
function SetCookie(name,value)
{
    var Days = 30; 
    var exp  = new Date();   
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
#T=cookie.js
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


#T=document.readyState == "complete"||document.readyState == "loaded"
document.readyState == "complete"||document.readyState == "loaded"
#T=e.offsetX ? (e.offsetX) : e.layerX - canvasElem.offsetLeft;
var x = e.offsetX ? (e.offsetX) : e.layerX - canvasElem.offsetLeft;
var y = e.offsetY ? (e.offsetY) : e.layerY - canvasElem.offsetTop;
#T=e.target.tagName 去标签属性
e.target.tagName
#T=IE6,7,8 解除图片缓存问题  new Date().getTime()
$('<img alt="" />').attr('src',arryload[0].src+"?" + new Date().getTime()) 
#T=isValidname 验证判断中英文长度
function isValidcn(obj) {
	var char=obj.val();
	var len=obj.val().length;
	if (char.replace(/[\x00-\xff]/g,"**").length>3) {
		return true;
	}else {
		return false;
	}
}
#T=jquery autocomput
// by zhangxinxu 2010-06-17 welcome to visit my personal website http://www.zhangxinxu.com/
// mailAutoComplete.js v1.0 邮箱输入自动提示
// 2010-06-18 v2.0 使用CSS class类代替CSS对象，同时增强代码可读性
// 2010-06-18 v2.1 宽度自适应的添加
// 2010-06-18 v2.2 修复多个元素同时调用此方法的一些bug
// 2010-06-30 修改搜狐邮箱名的笔误
// 2010-06-30 修复中文回车内容为空的问题
// 2010-08-17 v3.0 重写邮件显示的核心方法，提高显示性能
// 2010-09-01 修复Firefox下点击列表无法取值的问题
// 2010-09-03 添加提示文字隐藏以及文字颜色变化
(function ($) {
    $.fn.mailAutoComplete = function (options) {
        var defaults = {
            boxClass: "mailListBox", //外部box样式
            listClass: "mailListDefault", //默认的列表样式
            focusClass: "mailListFocus", //列表选样式中
            markCalss: "mailListHlignt", //高亮样式
            zIndex: 1,
            autoClass: true, //是否使用插件自带class样式
            mailArr: ["qq.com", "gmail.com", "126.com", "163.com", "hotmail.com", "yahoo.com", "yahoo.com.cn", "live.com", "sohu.com", "sina.com"], //邮件数组
            textHint: false, //文字提示的自动显示与隐藏
            hintText: "",
            focusColor: "#333",
            blurColor: "#999"
        };
        var settings = $.extend({}, defaults, options || {});

        //页面装载CSS样式
        if (settings.autoClass && $("#mailListAppendCss").size() === 0) {
            $('<style id="mailListAppendCss" type="text/css">.mailListBox{border:1px solid #369; background:#fff; font:12px/20px Arial;}.mailListDefault{padding:0 5px;cursor:pointer;white-space:nowrap;}.mailListFocus{padding:0 5px;cursor:pointer;white-space:nowrap;background:#369;color:white;}.mailListHlignt{color:red;}.mailListFocus .mailListHlignt{color:#fff;}</style>').appendTo($("head"));
        }
        var cb = settings.boxClass, cl = settings.listClass, cf = settings.focusClass, cm = settings.markCalss; //插件的class变量
        var z = settings.zIndex, newArr = mailArr = settings.mailArr, hint = settings.textHint, text = settings.hintText, fc = settings.focusColor, bc = settings.blurColor;
        //创建邮件内部列表内容
        $.createHtml = function (str, arr, cur) {
            var mailHtml = "";
            if ($.isArray(arr)) {
                $.each(arr, function (i, n) {
                    if (i === cur) {
                        mailHtml += '<div class="mailHover ' + cf + '" id="mailList_' + i + '"><span class="' + cm + '">' + str + '</span>@' + arr[i] + '</div>';
                    } else {
                        mailHtml += '<div class="mailHover ' + cl + '" id="mailList_' + i + '"><span class="' + cm + '">' + str + '</span>@' + arr[i] + '</div>';
                    }
                });
            }
            return mailHtml;
        };
        //一些全局变量
        var index = -1, s;
        $(this).each(function () {
            var that = $(this), i = $(".justForJs").size();
            if (i > 0) { //只绑定一个文本框
                return;
            }
            var w = that.outerWidth(), h = that.outerHeight(); //获取当前对象（即文本框）的宽高
            //样式的初始化
            that.wrap('<span style="display:inline-block;position:relative;"></span>')
				.before('<div id="mailListBox_' + i + '" class="justForJs ' + cb + '" style="min-width:' + w + 'px;_width:' + w + 'px;position:absolute;left:-6000px;top:' + h + 'px;z-index:' + z + ';"></div>');
            var x = $("#mailListBox_" + i), liveValue; //列表框对象
            that.focus(function () {
                //父标签的层级
                $(this).css("color", fc).parent().css("z-index", z);
                //提示文字的显示与隐藏
                if (hint && text) {
                    var focus_v = $.trim($(this).val());
                    if (focus_v === text) {
                        $(this).val("");
                    }
                }
                //键盘事件
                $(this).keyup(function (e) {
                    s = v = $.trim($(this).val());
                    if (/@/.test(v)) {
                        s = v.replace(/@.*/, "");
                    }
                    if (v.length > 0) {
                        //如果按键是上下键
                        if (e.keyCode === 38) {
                            //向上
                            if (index <= 0) {
                                index = newArr.length;
                            }
                            index--;
                        } else if (e.keyCode === 40) {
                            //向下
                            if (index >= newArr.length - 1) {
                                index = -1;
                            }
                            index++;
                        } else if (e.keyCode === 13) {
                            //回车
                            if (index > -1 && index < newArr.length) {
                                //如果当前有激活列表
                                $(this).val($("#mailList_" + index).text());
                            }
                        } else {
                            if (/@/.test(v)) {
                                index = -1;
                                //获得@后面的值
                                //s = v.replace(/@.*/, "");
                                //创建新匹配数组
                                var site = v.replace(/.*@/, "");
                                newArr = $.map(mailArr, function (n) {
                                    var reg = new RegExp(site);
                                    if (reg.test(n)) {
                                        return n;
                                    }
                                });
                            } else {
                                newArr = mailArr;
                            }
                        }
                        x.html($.createHtml(s, newArr, index)).css("left", 0);
                        if (e.keyCode === 13) {
                            //回车
                            if (index > -1 && index < newArr.length) {
                                //如果当前有激活列表
                                x.css("left", "-6000px");
                            }
                        }
                    } else {
                        x.css("left", "-6000px");
                    }
                }).blur(function () {
                    if (hint && text) {
                        var blur_v = $.trim($(this).val());
                        if (blur_v === "") {
                            $(this).val(text);
                        }
                    }
                    $(this).css("color", bc).unbind("keyup").parent().css("z-index", 0);
                    x.css("left", "-6000px");

                });
                //鼠标经过列表项事件
                //鼠标经过
                $(".mailHover").live("mouseover", function () {
                    index = Number($(this).attr("id").split("_")[1]);
                    liveValue = $("#mailList_" + index).text();
                    x.children("." + cf).removeClass(cf).addClass(cl);
                    $(this).addClass(cf).removeClass(cl);
                });
            });

            x.bind("mousedown", function () {
                that.val(liveValue);
            });
        });
    };

})(jQuery);
#T=jquery-ease jquery的动画显示方式
/*
* jQuery EasIng v1.1.2 - http://gsgd.co.uk/sandbox/jquery.easIng.php
*
* Uses the built In easIng capabilities added In jQuery 1.1
* to offer multiple easIng options
*
* Copyright (c) 2007 George Smith
* Licensed under the MIT License:
*   http://www.opensource.org/licenses/mit-license.php
*/

// t: current time, b: begInnIng value, c: change In value, d: duration

jQuery.extend(jQuery.easing, {
	easeInQuad : function(x, t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad : function(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad : function(x, t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInCubic : function(x, t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic : function(x, t, b, c, d) {
		return c * (( t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic : function(x, t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	easeInQuart : function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart : function(x, t, b, c, d) {
		return -c * (( t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart : function(x, t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	easeInQuint : function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint : function(x, t, b, c, d) {
		return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint : function(x, t, b, c, d) {
		if((t /= d / 2) < 1)
			return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeInSine : function(x, t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	easeOutSine : function(x, t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	easeInOutSine : function(x, t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	easeInExpo : function(x, t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo : function(x, t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutExpo : function(x, t, b, c, d) {
		if(t == 0)
			return b;
		if(t == d)
			return b + c;
		if((t /= d / 2) < 1)
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc : function(x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc : function(x, t, b, c, d) {
		return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
	},
	easeInOutCirc : function(x, t, b, c, d) {
		if((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeInElastic : function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if(t == 0)
			return b;
		if((t /= d) == 1)
			return b + c;
		if(!p)
			p = d * .3;
		if(a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOutElastic : function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if(t == 0)
			return b;
		if((t /= d) == 1)
			return b + c;
		if(!p)
			p = d * .3;
		if(a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	easeInOutElastic : function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if(t == 0)
			return b;
		if((t /= d / 2) == 2)
			return b + c;
		if(!p)
			p = d * (.3 * 1.5);
		if(a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		if(t < 1)
			return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	easeInBack : function(x, t, b, c, d, s) {
		if(s == undefined)
			s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack : function(x, t, b, c, d, s) {
		if(s == undefined)
			s = 1.70158;
		return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack : function(x, t, b, c, d, s) {
		if(s == undefined)
			s = 1.70158;
		if((t /= d / 2) < 1)
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	easeInBounce : function(x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
	},
	easeOutBounce : function(x, t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	easeInOutBounce : function(x, t, b, c, d) {
		if(t < d / 2)
			return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
});
//example
obj.animate({'left':opts.scroll_width*w},800,'easeInOutExpo');
#T=lazyLoad图片延迟加载
/*
* Lazy Load - jQuery plugin for lazy loading images
*
* Copyright (c) 2007-2009 Mika Tuupola
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
*   http://www.appelsiini.net/projects/lazyload
*
* Version:  1.5.0
*
*/
(function ($) {
    $.fn.lazyload = function (options) {
        var settings = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window
        };
        if (options) {
            $.extend(settings, options);
        }
        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function (event) {
                var counter = 0;
                elements.each(function () {
                    if ($.abovethetop(this, settings) ||
$.leftofbegin(this, settings)) {
                        /* Nothing. */
                    } else if (!$.belowthefold(this, settings) &&
!$.rightoffold(this, settings)) {
                        $(this).trigger("appear");
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(elements, function (element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        }
        this.each(function () {
            var self = this;
            //我就把这里的一段代码删除了
            /* When appear is triggered load original image. */
            $(self).one("appear", function () {
                if (!this.loaded) {
                    $("<img />")
.bind("load", function () {
    $(self)
.hide()
.attr("src", $(self).attr("original"))
[settings.effect](settings.effectspeed);
    self.loaded = true;
})
.attr("src", $(self).attr("original"));
                };
            });
            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);
        return this;
    };
    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */
    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.rightoffold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.abovethetop = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };
    $.leftofbegin = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */
    $.extend($.expr[':'], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    });
})(jQuery);

<script type="text/javascript">
        $(function () {
            $("img").lazyload();
        });
    </script>


<img src="/Content/images/grey.gif" original="http://192.168.0.36:8010/real.jpg" onerror="this.src='/Content/images/grey.gif';" />

#T=load js 加载JS
function loadJs(file){
    var scriptTag = document.getElementById('loadScript');
    var head = document.getElementsByTagName('head').item(0);
    if(scriptTag) head.removeChild(scriptTag);
    script = document.createElement('script');
    script.src = file+".js";
    script.type = 'text/javascript';
    script.id = 'loadScript';
    head.appendChild(script);
} 
#T=Math.round 4舍5入
Math.round
#T=parent window的内置对象
parent：
该变量指的是包含当前分割窗口的父窗口。如果在一个窗口内有分割窗口，而在其中一个分割窗口中又包含着分割窗口，则第2层的分割窗口可以用parent变量引用包含它的父分割窗口。
#T=parent.$.fancybox.close();
parent.$.fancybox.close();
#T=randomColor() 随机背景颜色
function randomColor() {
	//16进制方式表示颜色0-F
	var arrHex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var strHex = "#";
	var index;
	for(var i = 0; i < 6; i++) {
		//取得0-15之间的随机整数
		index = Math.round(Math.random() * 15);
		strHex += arrHex[index];
	}
	return strHex;
}
#T=window.open 弹出页面
onclick="window.open('<?php echo $this->getUrl('shoe-size'); ?>','Size_Table','width=1000,height=auto,left=100,menubar=no,scrollbars=yes')" 
#T=地址跳转window.location.href='http://local.kimos.com/kimos/index.php';
window.location.href='http://local.kimos.com/kimos/index.php';
#T=复制粘贴板
function setcopy_gettext(txt){
		window.document.clipboardswf.SetVariable('str', txt);
 }
var floatwin = function(){
	alert('copy success');
//    document.getElementById('clipinner').style.display = 'none';
}
#T=关键词高亮动态解析
/**
* 关键词高亮动态解析
*
* @author Saturn
* @since  1.0.0
* @return void
*/
var Highlighter = {
	highlight: function(b, a) {
		b = b.replace(/(^\s*)|(\s*$)/g, "");
		if (!b || b.length == 0) {
			return;
		}
		var c = new RegExp("(" + b.split(/\s+/).join("(?!;)|") + "(?!;))", "ig");
		if ("undefined" == typeof(a)) {
			return;
		}
		for (i in a) {
			if (a[i].innerHTML) {
				a[i].innerHTML = a[i].innerHTML.replace(c, '<span style="color:#d84600;">$1</span>');
			}
		}
	}
};

#T=手机自适应 以640为准
<script type="text/javascript">
	var e={androidShowPage:function(){var e=document.documentElement.clientWidth,t=(e/320<2)?(e/320):2;document.body.style.zoom=t},iosShowPage:function(){var e=document.documentElement.clientWidth,t=(e/320<2)?(e/320):2;document.body.style.zoom=t,document.body.style.fontSize=Math.floor(t*100)+"%"}};navigator.userAgent.toLowerCase().indexOf("mac os x")!=-1?(window.addEventListener("load",function(){e.iosShowPage()},!1),window.addEventListener("orientationchange",function(){e.iosShowPage()},!1)):(window.addEventListener("load",function(){e.androidShowPage()},!1),window.addEventListener("orientationchange",function(){e.androidShowPage()},!1));
</script>
#T=滚动相册设置
var refesh='';

	var galleries = $('.ad-gallery').adGallery({
		slideshow:{
			speed: 10000
		},
		callbacks:{
			init: function(){
				hovereffer();
				refesh=this;
			},
			afterImageVisible: function  () {
				hovereffer();
			}
		}
	});
#T=获取页面可见区域总宽
$('body').height();
#T=几秒后返回
<script type="text/javascript">
<!--
	var getId404=document.getElementById("sec_404");
	function subTime (num_g) {		
		if (num_g==0) {
			window.location.href='http://www.lanye.com.au/';
		}else {
			var n=num_g-1;
			getId404.innerHTML=n;
			setTimeout(function  () {subTime(n);},1000);
		}
	}
	subTime(6);
//-->
</script>
#T=记时器
function countTime() {
	var ss = $("#count_time").html();
	if (ss.length == 2 && ss.substr(0, 1) == 0) {
		ss = ss.substr(1, 1);
	}
	ss = parseInt(ss);
	sec = ss - 1;
	if (sec <= 0)
		sec = 60;
	if (sec >= 0) {
		if (sec < 10)
			msg = "0" + sec;
		else
			msg = sec;
		$("#count_time").html(msg);
		if (isFirst) {
			//取得照片信息
			myLiz.beautyGril.getPhotoInfo(myLiz.beautyGril.getGril); 
		}
		else {
			if (sec == 60) {
				//加载美女
				myLiz.beautyGril.showPhotoInfo();
				myLiz.beautyGril.getGril++;
				myLiz.beautyGril.getPhotoInfo(myLiz.beautyGril.getGril);
			}
		}
	}
	window.setTimeout(function() { countTime() }, 1000);
}
#T=兼容IE和Firefox获得keyBoardEvent对象
e = (e) ? e : ((window.event) ? window.event : "");
var key1 = e.keyCode?e.keyCode:e.which; 
#T=判断email是否有效
function isValidEmail(obj){
var value = $.trim($(obj).val());
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
	}
#T=判断是IE6
if (!window.XMLHttpRequest) {
								
							}
#T=判断是否为空
function isValidEmpty (obj) {
	if ($(obj).val()=='';) {
		return true;
	}else {
		return false;
	}
}
#T=取对象OBJ里面的索引和值
itembox, parentvar[itembox]
#T=让fade后IE7文字不变模糊
$(this).removeAttr('filter');
#T=让层居中
//让层居中
	function obj_pos_center(obj, obj_size) {
		var m_left=-(obj.innerWidth())/2;
		var m_top = '';
		if (!window.XMLHttpRequest) {
		var objtop=$(window).scrollTop()+($(window).height()-obj.height()>0?$(window).height()-obj.height(): 60)/2;
		obj.css({'top':objtop+'px','position':'absolute',"margin-left":m_left,"z-index":"1010"});
		}else {
		var gettop=0;
		if ($(window).height()<obj.height()) {
			gettop=$(window).scrollTop()+30;
			var objtop=$(window).height()+$(window).scrollTop()+30;
			obj.css({'top':'50%','left':'50%','position':'absolute',"margin-left":m_left + 'px',top:gettop+'px'});			
		}else {
			if (obj_size) {
				m_left = obj_size.goleft;
				m_top = obj_size.gotop;
			}else {
				m_top = -obj.height()/2;
			}
			gettop=($(window).height()-obj.height())/2;
			obj.css({"position":"fixed",'top':'50%','left':'50%',"margin-left": m_left + 'px',"margin-top": m_top + 'px'});
			//obj.css({top:gettop+'px'},600);
		}
		}
		obj.css({"z-index":"1010"});
	}
#T=图片预加载
var img = '<img />';
img = $(img);
img.attr("src","../Handler/InvoiceImage.ashx?filePath=" + data.data.invoiceImg);

if (img.complete) {
	
}else {
	img.load(function  () {
		
	})
}
#T=为了防止网站被iframe的安全处理
<script>function bust(){document.write='';window.top.location=window.self.location;setTimeout(function(){document.body.innerHTML='';},0);window.self.onload=function(evt){document.body.innerHTML='';};}if(window.top !== window.self){try{if (window.top.location.host){}else{bust();}}catch(ex){bust();}}</script>  
#T=语法高亮
	<script type="text/javascript">
	<!--
		/**
			关键词高亮动态解析
		*/
			var Highlighter = {
				highlight: function(b, a) {
					b = b.replace(/(\s*)|(\s*$)/g, "");
					if (!b || b.length == 0) {
						return;
					}
					var c = new RegExp("(" + b.split(/\s+/).join("(?!;)|") + "(?!;))", "ig");
					if ("undefined" == typeof(a)) {
						return;
					}
					for (i in a) {
						if (a[i].innerHTML) {
							a[i].innerHTML = a[i].innerHTML.replace(c, '<span style="color:#d84600;">$1</span>');
						}
					}
				}
		};
		//关键词
		var keyword = "HD"; 
		$(document).ready(function() {
			Highlighter.highlight(keyword,$(".prolist"));
		})
	//-->
	</script>
#