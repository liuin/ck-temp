/*
 data-img = "autoIn" //框内适应
 data-img = "autoOut maxwidth maxheight imgwidth imgheight nofix resize" //框外适应
 maxwidth 框长度 window  以窗口为准
 maxheight 框高度 window 以窗口为准
 nofix 最大到图片原图
 fix 最大到框
 resize 当改变屏幕时候自动适用
*/
;(function() {
 'use strict';
 var string = '[data-img]';
 function autoImg (el) {}
 autoImg.prototype.autoIn = function  (el,maxwidth,maxheight) {
   var $this = $(el);
  // $this.load(function  () {
     var zoom = $this.width()/$this.height();
     var zoom1 = maxwidth/maxheight;
     if (zoom > zoom1) {
       var style = {
         'width' : maxwidth,
         'height': maxwidth/zoom,
         'margin-top' : (maxheight - maxwidth/zoom) / 2
       }
       $this.css(style);
     }else {
       var style = {
         'width' : maxheight*zoom,
         'height': maxheight,
         'margin-left' : (maxwidth - maxheight*zoom) / 2
       }
       $this.css(style);
     }
  // })
 }
 autoImg.prototype.autoOut = function  (el,maxwidth,maxheight,ifFix) {
   var $this = $(el);
  // $this.load(function  () {
     var zoom = $this.width()/$this.height();
     var zoom1 = maxwidth/maxheight;
     var imgWidth = $this.attr('width');
     var imgHeight = $this.attr('height');
     var fixWdith = 0;
     var fixHeight = 0;
     if (zoom > zoom1) {

       if (ifFix == 'nofix') {
         fixHeight =  (imgHeight > maxheight) ? maxheight : imgHeight;
       }else {
         fixHeight = maxheight;
       }

       var style = {
         'width' : fixHeight*zoom,
         'height': fixHeight,
         'margin-left' : (maxwidth - fixHeight*zoom) / 2,
         'margin-top' : (maxheight - fixHeight ) /2
       }
       $this.css(style);
     }else {

       if (ifFix == 'nofix') {
         fixWdith =  (imgWidth > maxwidth) ? maxwidth : imgWidth;
       }else {
         fixWdith = maxwidth;
       }

       var style = {
         'width' : fixWdith,
         'height': fixWdith/zoom,
         'margin-top' : (maxheight - fixWdith/zoom) / 2,
         'margin-left' : (maxwidth - fixWdith ) /2
       }
       $this.css(style);
     }
 }

$(document).ready(function() {
  var autoImg1 = new autoImg();
  $(string).each(function () {
    var $this = $(this);
    var attrpro = $(this).attr('data-img').split(' ');

    var getWidth = (attrpro[1] == 'window') ? $(window).width() : attrpro[1];
    var getHeight = (attrpro[2] == 'window') ? $(window).height() : attrpro[2];

    switch (attrpro[0]) {
    case 'autoIn':
      autoImg1.autoIn($(this),getWidth,getHeight,attrpro[3]);
      if (attrpro[4] == 'resize') {
       $(window).resize(function(){
          getWidth = (attrpro[1] == 'window') ? $(window).width() : attrpro[1];
          getHeight = (attrpro[2] == 'window') ? $(window).height() : attrpro[2];

          autoImg1.autoIn($this,getWidth,getHeight,attrpro[3]);
       })
      }
    break
    case 'autoOut':
      autoImg1.autoOut($(this),getWidth,getHeight,attrpro[3]);
      if (attrpro[4] == 'resize') {
         $(window).resize(function(){
           getWidth = (attrpro[1] == 'window') ? $(window).width() : attrpro[1];
           getHeight = (attrpro[2] == 'window') ? $(window).height() : attrpro[2];

           autoImg1.autoOut($this,getWidth,getHeight,attrpro[3]);
         })
      }
    break
    default:
    }
  })
 })
})(jQuery);
