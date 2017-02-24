/* ========================================================================
 * Bootstrap: Animation.js v3.2.0
 * http://getbootstrap.com/javascript/#Animations
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== 
 $.support.Animation && $parent.hasClass('fade') ?
      $parent
        .one('bsAnimationEnd', removeElement)
        .emulateAnimationEnd(150) :
removeElement()
 
 */


+function ($) {
  'use strict';

  // CSS Animation SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function AnimationEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitAnimation : 'webkitAnimationEnd',
      MozAnimation    : 'mozAnimationEnd',
      OAnimation      : 'oanimationend',
      Animation       : 'animationend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-Animations
  $.fn.emulateAnimationEnd = function (duration) {
    //var called = false
    var $el = this
    
    //$(this).one('bsAnimationEnd', function () { called = true })
    //console.log(called);
    if (!$.support.animation) {
      var callback = function () { $el.trigger('bsAnimationEnd') }
      setTimeout(callback, duration);
    }
    /*
    $(this).one('bsAnimationEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.animation.end) }
    setTimeout(callback, duration)
    */
    return this
  }

  $(function () {
    $.support.animation = AnimationEnd()

    if (!$.support.animation) return

    $.event.special.bsAnimationEnd = {
      bindType: $.support.animation.end,
      delegateType: $.support.animation.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);