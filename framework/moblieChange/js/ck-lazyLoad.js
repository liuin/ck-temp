/*-- 
  anchor:cuki13
  use:LazyLoad
 --*/

+(function($) {
  'use strict';
  var selectString = '[cklazyload]';

  function LazyLoad() {
    this.run();
  }

  LazyLoad.prototype.delayload = function  () {
    var $this = this;
    
    $(selectString).each(function () {
      
      var imgItem = $(this),
          eleTop = imgItem.offset().top,
          eleHeight = imgItem.outerHeight(),
          winTop = $(window).scrollTop(),
          winHeight = $(window).height()      
      if(winTop === 0){ //修正chrome下取不到的問題
          winTop = document.body.scrollTop;
      }
            
      //加载正确的图片,条件是屏幕范围内并且要防止重复设置
      if (eleTop < winTop + winHeight && eleTop + eleHeight > winTop && imgItem.data('lazyload') == undefined) {
          //加载开动        
          $this.reloadImg(imgItem);
      }      
    })
  }

  LazyLoad.prototype.reloadImg = function  (obj) {
    var gSrc = obj.data('src');
    var img = $('<img src="'+ gSrc +'" alt="" />');
    if (img[0].complete) {
      obj.attr('src',gSrc);
    }else {
      img.load(function  () {
        obj.attr('src',gSrc);
      })
    }   
    obj.data('lazyload','compelete');
  }

  LazyLoad.prototype.run = function  (obj) {
    var $this = this;
    setInterval(
      function(){
        
        $this.delayload();
      },400
    )
  }

  $(document).ready(function() {
    new LazyLoad();  
  })


})(jQuery);