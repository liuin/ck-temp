/*-- 
  anchor:cuki13
  use:ckLoadAppend
 --*/

+(function($) {
  'use strict';
  var selectString = '[ckLoadAppend]';

  function ckLoadAppend() {
    this.run();
  }

  ckLoadAppend.prototype.delayload = function  () {
    var $this = this;
    
    $(selectString).each(function () {
      
      if ($(this).is(':hidden')) {
        //return false;
      }else {
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
          $(this).trigger('loadBottom');
        }        
      }
      
    })
  }

  ckLoadAppend.prototype.run = function  (obj) {
    var $this = this;
    setInterval(
      function(){        
        $this.delayload();
      },400
    )
  }

  $(document).ready(function() {
    new ckLoadAppend();
  })


})(jQuery);