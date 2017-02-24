<!DOCTYPE html>
<html lang="zh-CN">

  <head>
    <script type="text/javascript">
      function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          window.location.href = './wap/';
        } else {
          //window.location = 'index.html';
        }
      }

      browserRedirect();
    </script>
    <script type="text/javascript">
      (function() {
        'use strict';
        var Fixmobile = function() {
          this.viwep();
        }

        Fixmobile.width = 640;

        Fixmobile.prototype.viwep = function(e) {
          var phoneWidth = parseInt(window.screen.width),
            phoneScale = phoneWidth / Fixmobile.width,
            ua = navigator.userAgent,
            headmate;
          if (/Android (\d+\.\d+)/.test(ua)) {
            var version = parseFloat(RegExp.$1);
            // andriod 2.3
            if (version > 2.3) {
              document.write('<meta name="viewport" content="width=' + Fixmobile.width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
              // andriod 2.3以上
            } else {
              document.write('<meta name="viewport" content="width=' + Fixmobile.width + ', target-densitydpi=device-dpi">');
            }
            // 其他系统
          } else {
            document.write('<meta name="viewport" content="width=' + Fixmobile.width + ', user-scalable=no, target-densitydpi=device-dpi">');
          }
        }
        var newviewport = new Fixmobile();
      })();
    </script>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="description" content="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <!--[if lt IE 9]>
  <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->

    <!--[if IE]>
    <script type="text/javascript">
       var console = { log: function() {} };
    </script>
  <![endif]-->

    <title>website name</title>
  </head>

  <body class="yh">
    <noscript>
    <strong>你的浏览器似乎禁用了 JavaScript。</strong><br />您必须在浏览器中启用JavaScript才能使用本网站的功能。
  </noscript>
    <div class="container">

    </div>
    <script type="text/javascript" src="js/asset.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
  </body>

</html>

