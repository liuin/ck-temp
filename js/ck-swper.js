+(function($){
 /**
  * Checks for CSS support.
  * @private
  * @param {Array} array - The CSS properties to check for.
  * @returns {Array} - Contains the supported CSS property name and its index or `false`.
  */
 function isStyleSupported(array) {
   var p, s, fake = document.createElement('div'), list = array;
   for (p in list) {
     s = list[p];
     if (typeof fake.style[s] !== 'undefined') {
       fake = null;
       return [ s, p ];
     }
   }
   return [ false ];
 }
 
 /**
  * Checks for CSS transition support.
  * @private
  * @todo Realy bad design
  * @returns {Number}
  */
 function isTransition() {
   return isStyleSupported([ 'transition', 'WebkitTransition', 'MozTransition', 'OTransition' ])[0];
 }
 
 /**
  * Checks for CSS transform support.
  * @private
  * @returns {String} The supported property name or false.
  */
 function isTransform() {
   return isStyleSupported([ 'transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ])[0];
 }
 
 $.fn.scollpic= function (options) {

   $(this).each(function  () {
     var $this = $(this);
     var defualts = {
       itemTag : "li",
       itemWidth : 157,
       itemHeight : 150,
       itemCount: 1,
       bigImg : 'off',
       loop : false,
       wrapClass :'scrollpic-wrap',
       parenWidth : 'auto',
       playSpeed : 3000,
       lazyload:false,
       autoPlay : true,
       type:'fade',
       fadeTime:1000
     };
 
     var opts = $.extend({},defualts,options);
     var animatePro = false;
     var itemLength = $this.find(opts.itemTag).length;
 
    
 
     var ifLoad = false; //是否加载
     var currentItemIndex = 0 ; //当前item索引
     if (opts.parenWidth == 'auto') {
       opts.parenWidth = parseInt(opts.itemCount * opts.itemWidth);
     }
 
     var $wrapObj=$('<div class="' + opts.wrapClass + '"></div>');
 
     $wrapObj.css({'position':'relative','height':opts.itemHeight});
 
     //加载箭头
     if (opts.itemWidth == 'auto') {
       opts.itemWidth = $(this).find(opts.sdiv).width();
     }
     
     $this.wrap($wrapObj);
 
     var $arrowPrev=$('<a href="javascript:void(0);" class="scroll-item-list-prev endprev st"><span class="v-h">prev</span></a>');
     var $arrowNext=$('<a href="javascript:void(0);" class="scroll-item-list-next st"><span class="v-h">next</span></a>');
 
     $this.parent().append($arrowPrev).append($arrowNext);
     


     $this.wrap('<div class="scroll-warp" style=" position:relative; height:' + opts.itemHeight + 'px; width:' + opts.parenWidth + 'px;"></div>');
  
     $arrowPrev.click(function  () {           
       if ($nav.find('a.current').prev().length > 0) {
        $nav.find('a.current').prev().trigger('click');
       }else {
         $nav.find('a').last().trigger('click');
       }
       //scoll('left',$this);
     });
 
     $arrowNext.click(function  () {
      
        moveloop();
        
     });

     function moveloop () {      
  
       if ($nav.find('a.current').next().length > 0) {
        $nav.find('a.current').next().trigger('click');
       }else {
         $nav.find('a').first().trigger('click');          
       }       
     }

      var liStyle={
        'position' : 'absolute',
        'left' : 0,
        'top':0
      }
      $this.find('li').css(liStyle).not('.current').hide();
     
     //页码
     var navItemCount = $this.find(opts.itemTag).length / opts.itemCount;
     function  nav() {
       var html = '<div class="banner-nav">';
       for (var i = 0; i < navItemCount; i++) {
         html += '<a class="' + (i == 0 ? 'current' : '' ) + ' sort-' + i + ' " data="'+ i +'" href="javascript:void(0);"><span>'+(i+1)+'</span></a>';
       }
       html += '</div>';
       return $(html);
     }
     var $nav = nav();
 
     $nav.appendTo($this.parent().parent());
     $nav.find("a").click(function  () {
        
       if ($(this).hasClass("current")) {
         return false;
       }else {

       if (animatePro == true) {
         return;
       }
       animatePro = true;

        var cur = $nav.find('a.current').index();
        $(this).addClass("current").siblings().removeClass("current");
         var ind = $(this).index();
         if (opts.type == "fade") {
          var ind = $(this).index();
          scrollFade($this,ind);
         
          return ;
         }
         
         if (opts.type == 'slide') {
           
           scrollSlide($this,ind,cur);
           return
         }
        
         
         var scrollWidth = $(this).index() * opts.itemCount * opts.itemWidth;
         scrollWidth = scrollWidth + (opts.itemCount * opts.itemWidth);
         scoll('nav', $this, scrollWidth,ind);
       }
     })
 
     //如果循环
     if (opts.loop == true) {
       var totleCount = $this.find(opts.itemTag).length;
       var $prevClone = $this.find(opts.itemTag + ':gt(' + (totleCount - opts.itemCount - 1) + ')').clone().addClass("clone");
       var $nextClone = $this.find(opts.itemTag + ':lt(' + opts.itemCount + ')').clone().addClass("clone");
       $nextClone.appendTo($this);
       $prevClone.prependTo($this);
     }
 
     //总长度
     var itemTotal=0; 
 
     $this.find(opts.itemTag).last().css("padding-right","0");
     $this.find(opts.itemTag).each(function  () {     
       itemTotal+=$(this).outerWidth();
     });

     /*
     if (opts.type == "fade") {
     }else {
       $this.css({'position':'relative','width':itemTotal});    
       
     }
     */
 
     //moblie tounch手机事件
     var currntp = 0;
     var pageX = 0;
     var ifchlick = false;
       
     $this.parents("."+opts.wrapClass).bind("touchstart",function  (e) {
        currntp = window.event.touches[0].pageX;
        ifchlick = true;
        //e.preventDefault();
      });
 
     $this.parents("."+opts.wrapClass).bind('touchend', function(e) {
       if (pageX == 0) {
         return true;
       }
       e.preventDefault();
       ifchlick = false;
       var widthStep = 10;
       
       if ((Math.abs(currntp - pageX) >= widthStep)) {
         if (currntp - pageX >= widthStep) {
           $arrowNext.trigger('click');          
         } else {          
           $arrowPrev.trigger('click');
         }
       }
       currntp = 0;
       pageX = 0;
     });
 
     $this.parents("."+opts.wrapClass).bind('touchmove', function(e) {
       e.preventDefault();
       if (ifchlick) {
         ifchlick = false;
         pageX = window.event.targetTouches[0].pageX;
       }else {
         return true;
       }
     });
     
     //点击显示大图

     $this.find(opts.itemBig).find("a").click(function  (e) {
       var $item = $(this);
       if (opts.bigImg && (opts.bigImg == 'off')) {
         return false;
       }else{
 
       if(ifLoad == true || $item.parent().hasClass('current')){ return false;}
 
       currentItemIndex = $this.find(opts.itemTag + '.current').index();
       
       if ((currentItemIndex!= -1) && (currentItemIndex!= 0) && (currentItemIndex!= ($this.find(opts.itemTag).length-1))) {
         var itemIndex = $item.parent().index();
         if (currentItemIndex > itemIndex) {
           $arrowPrev.trigger('click');
         }else {
           $arrowNext.trigger('click');
         }
       }
 
       $item.parent().siblings('li').removeClass('current');
       $item.parent().addClass('current');
 
       if (opts.bigImg) {
         showImg(opts.bigImg,$item.attr("href"),$item);
       }      
       e.preventDefault();
       }
     })
 
     //循环
     $this.data('onhover',false);
     $this.parent().parent().hover(function  () {
       $this.data('onhover',true);      
     },function  () {
       $this.data('onhover',false)
     })
 
     function loopMain() {
       if (opts.autoPlay == true) {
          $this.data('onhover');
         if ($this.data('onhover') == false) {           
           $arrowNext.trigger('click');
         }
       }
     }
     
     var timecount = setInterval(function  () {
       loopMain();
     }, opts.playSpeed);
     
     var ajaxLoad = $('<div id="loading" class="loading yh"><i></i><span>加载中...</span></div>');
     var showImg = function (obj,data,objlink) {
       var img = $('<img src="' + data + '" />');
       ajaxLoad.insertBefore(obj);
       ifload = true;
       
       if (img[0].complete) {
         if (opts.ppscollcallback) {
           opts.ppscollcallback(obj,objlink);
         }
         obj.hide().attr('src', data).fadeIn();
         ajax_load.detach();
         ifload = false;
 
       }else {
         img.load(function  () {
         if (opts.scollBack) {
           opts.scollBack(obj,objlink);
         }
         obj.hide().attr('src', data).fadeIn();
         ajaxLoad.detach();
         ifload = false;
         }).error(function(){
           ajaxLoad.detach();
           ifload = false;
         });
       }
     }
 
     var ifScroll = false;
 
     var scrollEg = isTransform() ? isTransform()  : 'left';
     
     var leftVal = 0;
 
     //预设循环模式
     function  loopRest() {
       if (opts.loop == true) {
         $this.css("transition","0"); 
         scrollObj($this, -(opts.itemCount*opts.itemWidth),'nav', function  () {
           $this.css("transition","0.5s");
         });
       }
     }
 
     function loopRestEnd() {
       if (opts.loop == true) {
         $this.css("transition","0"); 
         scrollObj($this, -(itemTotal - (opts.itemCount*opts.itemWidth)*2),'nav', function  () {
           $this.css("transition","0.5s");
         });
       }
     }
 
 
     loopRest();
 
     //滚动模式
     function  scrollObj(obj, value, navlong, callback) {
       return false;
       if (navlong) {
          leftVal = 0;
       }
       cssSet = {};
       if (scrollEg != 'left') {
         var noPos = obj.css("");
 
         switch (scrollEg) {
         case 'transform':
             cssSet = {'transform' : 'translateX(' + (leftVal + value) + 'px)'};
         break
         case 'WebkitTransform':
             cssSet = {'WebkitTransform' : 'translateX(' + (leftVal + value) + 'px)'};
         break
         case 'MozTransform':
             cssSet = {'MozTransform' : 'translateX(' + (leftVal + value) + 'px)'};
         break
         case 'OTransform':
             cssSet = {'OTransform' : 'translateX(' + (leftVal + value) + 'px)'};
         break
         case 'msTransform':
             cssSet = {'msTransform' : 'translateX(' + (leftVal + value) + 'px)'};
         break 
         default:
         }
         obj.css(cssSet).one('bsTransitionEnd', function(){
           ifScroll = false;
           leftVal += value;
           if (callback) {
             callback();
           }
           checkEnd();
         })
         if (navlong) {
           obj.emulateTransitionEnd(10);
         } 
         
       }else {
         obj.animate({
           "left": (leftVal + value)
         },function  () {
           ifScroll = false;
           leftVal += value;
           checkEnd();
         })
       }
     }

     //fade效果
     function scrollFade(obj,ind) {      
       obj.find('li').not(ind).fadeOut(opts.fadeTime);
       obj.find('li').eq(ind).fadeIn(opts.fadeTime,function  () {
        animatePro = false;
       }).addClass('current').siblings().removeClass('current');
     }
      
     //slider效果
     function scrollSlide(obj,ind,cur) {    

       if ((cur==0 && (ind == itemLength-1))) {
        goLeft(obj,ind,cur);
        return 
       }
       if (((cur == itemLength-1) && ind == 0)) {
        goRight(obj,ind,cur);
        return 
       }       
       var lrt = (ind - cur);       
       if (lrt > 0 ) {
         goRight(obj,ind,cur);
       }else {
         goLeft(obj,ind,cur);        
       }
     }

     function goRight (obj,ind,cur) {
       var style = {
         'left': opts.itemWidth
       }
       obj.find('li').eq(ind).css(style).show();
       obj.find('li').eq(ind).animate({
         'left':0
       },function  () {
        $(this).addClass('current').siblings().removeClass('current');
        checkLazy(ind);
        animatePro = false;
       })
       obj.find('li').eq(cur).animate({
        'left': -opts.itemWidth
       },function  () {
        $(this).removeClass('current').hide().css('left','0');
        
       })      
     }

     function goLeft (obj,ind,cur) {
       var style = {
         'left': -opts.itemWidth
       }
       obj.find('li').eq(ind).css(style).show();
       obj.find('li').eq(ind).animate({
         'left':0
       },function  () {
        checkLazy(ind);
        $(this).addClass('current').siblings().removeClass('current');
       })
       obj.find('li').eq(cur).animate({
        'left': opts.itemWidth
       },function  () {
        $(this).removeClass('current').hide().css('left','0');
        animatePro = false;
       })        
     }

     //监测layz
     function checkLazy(ind) {
      if (opts.lazyload == true ) {
        var nextImg = $this.find('li').eq(ind+1).find('img');        
        
        if (nextImg.length > 0) {
         
          layzLoadImg(nextImg);
        }

        var prevImg = $this.find('li').eq(ind-1).find('img');
        if (prevImg.length > 0) {
          layzLoadImg(prevImg);
        }
      }
     }

     function layzLoadImg (imgObj) {
      if (imgObj.data('load') != 'comp') {
         
         imgObj.data('load',true);
         var gSrc = imgObj.data('src');   
         
         if (gSrc == undefined) {
          return 
         }
         var img = $('<img src="' + gSrc + '" alt="" />');
         if (img[0].complete) {
           imgObj.attr('src',gSrc) ;
           img.remove();                     
         }else{
           img.load(function  () {
             imgObj.attr('src',gSrc) ;
             img.remove();
            
           })            
         }
       }       
     }
 
     //滚动函数
     function scoll(dir,obj,moveWidth,ind) {
       if (ifScroll == true) {
         return false;
       }
        



       ifScroll = true;
       if (dir=='left') {
         if (leftVal >= 0) {
           ifScroll = false;
           return false;
         }
         scrollObj(obj,opts.itemWidth);
       }
 
       if (dir=='right') {
         if (leftVal <= - (itemTotal-opts.parenWidth)) {
           ifScroll = false;
           return false;
         }
         scrollObj(obj,-opts.itemWidth);
       }
 
       if (dir == 'nav') {
         scrollObj(obj, -moveWidth,'nav');
       }
     }
 
     function checkEnd () {
       $this.parents("."+opts.wrapClass).find(".scroll-item-list-next").removeClass("endnext");
       $this.parents("."+opts.wrapClass).find(".scroll-item-list-prev").removeClass("endprev");
 
       if ($this.position().left >= 0 ) {
         $this.parents("."+opts.wrapClass).find(".scroll-item-list-prev").addClass("endprev");
         if (opts.loop = true) {
           loopRestEnd();
         }
       }
       if ($this.position().left <= - (itemTotal-opts.parenWidth) ) {
         $this.parents("."+opts.wrapClass).find(".scroll-item-list-next").addClass("endnext");
 
         if (opts.loop == true) {
           loopRest();
         }
 
       }
     }
   });
 };
 
 })(jQuery);