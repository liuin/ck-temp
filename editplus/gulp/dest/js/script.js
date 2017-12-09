document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



window.onload = function  () {
  $('#loading').fadeOut();
}

$(document).ready(function() {

  var myScroll = new IScroll('#wrapper',{
    bounce:true,
    click:true,
    preventDefault: false
  });

  var myScroll2 = new IScroll('#wrapper1',{
    bounce:true,
    click:true,
    preventDefault: true
  });

  $('.section-1 a.a1').on('click',function  () {
    $("#poprule").data('ck.pokbk').open();

    $('.poprule .back').one('click',function  () {
      $("#poprule").data('ck.pokbk').close();
    })
  })

  $('.taglink a').on('click',function  (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      return false;
    }
    $(this).addClass('active').siblings().removeClass('active');
    var ind = $(this).index();
    $(this).parents('.section').find('.tagbox .tagitem').hide().eq(ind).fadeIn();
  })

})





/** 
* extend 弹出框
* @author cuki13
 
  $(obj).popbk();
  $("#popbk2").data('ck.pokbk').open();
  $("#popbk2").data('ck.pokbk').close();
*/

+(function($){
  var dataString = '[data-box="popbk"]';
 
  var Popbk = function  (el, number ,options) {
  this.el = $(el)
  this.id = number
  this.options = $.extend({}, this.defualts, options); 
  }
  
  Popbk.defualts = {};

  Popbk.prototype.build = function  (el) {
  var $this = $(el);

  $this.show();
  $this.wrap('<div class="popbk-wrap-'+ this.id +' popbk-wrap fade" ></div>');
  $this.wrap('<div class="popbk-'+ this.id +' popbk" ></div>');

  var sClose = "<a class='close'><span class='ar'>X</span></a>";
  sClose = $(sClose);
  sClose.insertAfter($this);
  var ml = $this.width()/2;   
 
  var mlstyle={
//    "margin-left" : -ml,
//    "width":$this.width(),
//    "height":$this.height()

  }
  $this.parent(".popbk").css(mlstyle);
  var wh = $this.height();
  if ($(window).height() < wh) {
    $this.parent(".popbk").css("top","30px");
  }else {
    $this.parent(".popbk").css({
//    "margin-top":-wh/2,
//    "top":'50%'
    });
  } 
  $this.parent(".popbk").find(".close").on('click',function  () {
    $this.data('ck.pokbk').close();
  })  
  $this.parents(".popbk-wrap").hide().on('click',function  (e) {
    if ($(e.target).hasClass('popbk-wrap')) {
    $this.data('ck.pokbk').close();    
    }
  });
  }


  Popbk.prototype.rebuild = function  () {
    var $this = this;
    var $thisObj = $this.el;


    $this.el.height('auto');
  
    var ml = $this.el.width()/2;   
  
    var mlstyle={
    "margin-left" : -ml,
    "width":$this.el.width(),
    "height":$this.el.height()

    }
    $this.el.parent(".popbk").css(mlstyle);
    
    setTimeout(
    function(){
      $(this)[0].offsetWidth;
      var wh = $this.el.height();  

      if ($(window).height() < wh) {
      $this.el.parent(".popbk").css("top","30px");
      }else {
      $this.el.parent(".popbk").css({
        "margin-top":-wh/2,
        "top":'50%'
      });
      }
    }, 10)
    
    
 

  }

  Popbk.prototype.open = function  () {
  this.close;
  var $this = this.el;
  if ($this.length) {
    $this.parents(".popbk-wrap").show();
    $this.parents(".popbk-wrap")[0].offsetWidth;
    setTimeout(
    function(){
      $this.parents(".popbk-wrap").addClass("in");
      $('body').css('overflow','hidden');      
    }, 300)


  }
  }

  Popbk.prototype.close = function  () {
  $('body').css('overflow','auto');
  var $this = this.el;
  var $parent = $this.parents(".popbk-wrap");
  if ($.support.transition && $parent.hasClass('fade')) {
    $parent.removeClass("in");
    $parent.one('bsTransitionEnd', function  () {
      $parent.hide();
    }).emulateTransitionEnd(400);
  }else {
    $parent.hide();
  }
  $this.trigger('callbackClose');
  $('body').css('overflow','auto');
  }

  function Plugin(option) {
  return this.each(function (n) {
    if ($(this).html() == undefined) {
    return 
    }
    var $this   = $(this)
    var data  = $this.data('ck.pokbk')
    var number = $this.attr('id') || n 
    var options = typeof option == 'object' && option
    if (!data) $this.data('ck.pokbk', (data = new Popbk(this,number)))
    if (option == 'build') data.build($(this))
    else if (option) data.setState(option)
  })
  }

  $(document).ready(function() {
    var $this = $(dataString);
    
    if ($this.data('ck.pokbk') == undefined) {
      Plugin.call($this,'build');
    }
      
  })



  $.fn.popbk = function  () {
  var $this = $(this);    
  
  if ($this.data('ck.pokbk') == undefined) {
    Plugin.call($this,'build');
  }  
  }

})(jQuery);


/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== 
 $.support.transition && $parent.hasClass('fade') ?
    $parent
    .one('bsTransitionEnd', removeElement)
    .emulateTransitionEnd(150) :
removeElement()
 
 */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
  var el = document.createElement('bootstrap')

  var transEndEventNames = {
    WebkitTransition : 'webkitTransitionEnd',
    MozTransition  : 'transitionend',
    OTransition    : 'oTransitionEnd otransitionend',
    transition     : 'transitionend'
  }

  for (var name in transEndEventNames) {
    if (el.style[name] !== undefined) {
    return { end: transEndEventNames[name] }
    }
  }

  return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
  var called = false
  var $el = this
  $(this).one('bsTransitionEnd', function () { called = true })
  var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
  setTimeout(callback, duration)
  return this
  }

  $(function () {
  $.support.transition = transitionEnd()

  if (!$.support.transition) return

  $.event.special.bsTransitionEnd = {
    bindType: $.support.transition.end,
    delegateType: $.support.transition.end,
    handle: function (e) {
    if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
    }
  }
  })

}(jQuery);
