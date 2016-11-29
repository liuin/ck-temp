/*-- 
  anchor:cuki13
  use:ck-scroll
  come form:iscoll
 --*/

+(function($) {
  'use strict';
  var selectString = '[ckscroll]';

  //rAF动画函数
  var rAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60);};

  //浏览器相关
  var borws = {};
  function trans() {    
    var _elementStyle = document.createElement('div').style;
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
      transform,
      i = 0,
      l = vendors.length;
    for ( ; i < l; i++ ) {
      transform = vendors[i] + 'ransform';
      if ( transform in _elementStyle ) return (vendors[i].substr(0, vendors[i].length-1));
    }
    return false;
  }

  borws.ease = {
    quadratic: {
      style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fn: function (k) {
        return k * ( 2 - k );
      }
    }
  }

  borws.tran = trans();
  //获取当前时间
  borws.getTime = Date.now || function getTime () { return new Date().getTime(); };

  var evenType ={  
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2,

    pointerdown: 3,
    pointermove: 3,
    pointerup: 3,

    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3    
  }
  borws = $.extend({},borws,evenType);  

  function ckScroll(obj,options) {
    this.obj = obj;
    this.scroller = $(obj[0].children[0]);
    var defualts = {
      startX: 0,
      startY: 0,
      scrollY: false,
      scrollX: true,
      momentum: true,
      bounce: true,
      bounceTime: 600,
      moved : false
    };
    $.extend(this,defualts,options);

    this.x = 0;
    this.y = 0;
    this.nAnimateX = 0;
    this.nAnimateY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.endTime = 0;
    this.isSwpier = true;
    this.swpierLong = this.obj.width();
    this.swpierTomove = 50;
    this.swpierdDlr = 'no';
    this.axow = 'n';
    this.isMove = false;
    this.isSubMove = false;
    this.count = this.obj.find('.tag-section').length;
    this.currentCount = 0;
    
    this.obj.find('.tag-wrap-inner').width(this.swpierLong*this.count);

    this.init();
  }
  
  ckScroll.prototype.init = function  () {
    var $this = this;
    /*
    this.obj[0].addEventListener('touchstart',function  (e) {
      $this.start(e);      
    },true)

    this.obj[0].addEventListener('touchmove',function  (e) {
      $this.move(e);      
    },true)

    this.obj[0].addEventListener('touchend',function  (e) {
      $this.end(e);      
    },true)
    */
    this.obj.on('touchstart pointerdown',function  (e) {
      e.stopPropagation();
      $this.start(e);      
    })

    /*
    this.obj.on('touchmove',function  (e) {
      $this.move(e);
    })
    this.obj.on('touchend',function  (e) {
      $this.end(e);
    })
    */
    //this.scroller.on('touchmove',this.move())
    //this.scroller.on('touchend',this.end())
  }


  ckScroll.prototype.start = function  (e) {
    var $this = this;
    e = e.originalEvent;
    var point = e.touches ? e.touches[0] : e;    
    this.startX    = this.x;
    this.startY    = this.y;
    this.absStartX = this.x;
    this.absStartY = this.y;
    this.endTime = 0;
    this.pointX    = point.pageX;
    this.pointY    = point.pageY;
    this.moved = true;
    this.moveY = false;
    this.distX = 0;
    this.distY = 0;

    
    this.startTime = borws.getTime();

    this.obj.trigger('scrollStart');

    this.obj.on('touchmove pointermove',function  (e) {
      $this.move(e);
    })
    this.obj.on('touchend pointerup',function  (e) {
      $this.end(e);
    })

  }

  ckScroll.prototype.move = function  (e) {
    if (this.isSubMove == true) {
      return
    }
    if (this.moved == false) {
      return
    }    
    this.moved = true;

    this.isMove = true;


    if (this.axow == 'x') {
      e.preventDefault();
    }
    e = e.originalEvent;    
    var point = e.touches ? e.touches[0] : e,
        deltaX = point.pageX - this.pointX,
        deltaY = point.pageY - this.pointY,
        timestamp = borws.getTime(),
        newX, newY,
        absDistX, absDistY;
      
      this.pointX = point.pageX;
      this.pointY = point.pageY;
      //console.log(deltaX,deltaY,this.pointX);
       
      this.distX += deltaX;
      this.distY += deltaY;
      absDistX = Math.abs(this.distX);
      absDistY = Math.abs(this.distY);  
      
      // 必须移动10px才生效
      
      //if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
      if ( (absDistX < 10 && absDistY < 10) ) {
      //  return;
      }
      
    if (this.isSwpier) {
     if (absDistX > absDistY) {
        this.axow = 'x';
        e.preventDefault();
        
        /*
        if (this.currentCount > (this.count - 2)) {
          if (deltaX < 0) {
            deltaX = 0;
          }
        }
        */
       // console.log(this.swpierLong * (this.count-1));

        newX = this.x + deltaX;
        newY = this.y + deltaY;

        newX = (newX > 0)? 0 : newX;

        if ((-newX) >  this.swpierLong * (this.count-1)) {
          newX = -(this.swpierLong * (this.count-1));
        }

         // if (deltaX == 0) {
         //   this.moveY = true;
         // }

        this.translate(newX, newY);   
        this.obj.trigger('scroll');        

        return 
     }        
    }

      
      
    /*
      newX = this.x + deltaX;
      newY = this.y + deltaY;

    if (this.isSwpier){
      newX = (newX > 0)? 0 : newX;
    }
    this.translate(newX, newY);   
    */
  }

  ckScroll.prototype.end = function  (e) {
    var $this = this;
    e = e.originalEvent;
    this.moved = false;
    this.moveY = false;
    this.isMove = false;
    this.endTime = borws.getTime();

    var point = e.changedTouches ? e.changedTouches[0] : e,
        momentumX,
        momentumY,
        duration = borws.getTime() - this.startTime,
        newX = Math.round(this.x),
        newY = Math.round(this.y),
        distanceX = Math.abs(newX - this.startX),
        distanceY = Math.abs(newY - this.startY),
        time = 0,
        easing = '';
        
    momentumX = this.momentumScroll(this.x, this.startX, duration, this.maxScrollX, '0', undefined);
    momentumY = this.momentumScroll(this.y, this.startY, duration, this.maxScrollY, '0', undefined);

    newX = momentumX.destination;
    newY = momentumY.destination;

    var time = Math.max(momentumX.duration, momentumY.duration);

    //如果是切换
    if (this.isSwpier) {
      
      (this.x - this.startX > 0)? (this.swpierdDlr = 'left') : (this.swpierdDlr = 'right');
      var trun = this.x % this.swpierLong;  

      var count = parseInt(this.x / this.swpierLong);
      if ((Math.abs(trun) > this.swpierTomove) && (this.swpierdDlr == 'right')) {        
        this.currentCount = Math.abs(count)+1;
        if (this.currentCount > this.count) {
          return
        }        
        

        this.translate(-(Math.abs(count)+1)*this.swpierLong, newY, 300);
        this.obj.trigger('scrollEnd',this.currentCount);

      }else if(((this.swpierLong - Math.abs(trun)) > this.swpierTomove) && (this.swpierdDlr == 'left')){        
        this.currentCount = Math.abs(count);
        if (this.currentCount > this.count) {
          return
        }
        this.translate(-(Math.abs(count))*this.swpierLong, newY, 300);
        this.obj.trigger('scrollEnd',this.currentCount);
      }
      else if(this.swpierdDlr == 'right'){
        if (this.currentCount > this.count) {
          return
        }        

        this.translate(count*this.swpierLong, newY, 300);
      }else if(this.swpierdDlr == 'left'){
        if (this.currentCount > this.count) {
          this.translate(-(this.count)*this.swpierLong, newY, 300);
          return
        }
        this.translate(-(Math.abs(count) + 1)*this.swpierLong, newY, 300);
      }
      this.obj.unbind('touchmove pointermove');
      this.obj.unbind('touchend pointerend');
      this.axow = 'n';

      return false;
    }

    newX = (newX > 0)? 0 : newX;

    this.translate(newX, newY,time);

    this.obj.trigger('scrollEnd');    
  }


  //滚动效果
  ckScroll.prototype.momentumScroll = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
      var distance = current - start,
        speed = Math.abs(distance) / time,
        destination,
        duration;
      
      deceleration = deceleration === undefined ? 0.0006 : deceleration;

      destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
      duration = speed / deceleration;
      

      /*
      if ( destination < lowerMargin ) {
        destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if ( destination > 0 ) {
        destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }
      */
      return {
        destination: Math.round(destination),
        duration: duration
      };
    };

  ckScroll.prototype.scrollTo = function (x, y, time, easing) {
    easing = 'cubic-bezier(0.1, 0.57, 0.1, 1)';

    this.isInTransition = time > 0;

    if ( !time ) {
      //this._transitionTimingFunction(easing.style);
      //this._transitionTime(time);
      //this._translate(x, y);
    } else {
      this.translate(x, y, time);
    }
  }

  //动画
  ckScroll.prototype.animate = function (destX, destY, duration, easingFn) {
  var that = this,
    startX = this.x,
    startY = this.y,
    startTime = borws.getTime(),
    destTime = startTime + duration;


    function quadratic(k) {
				return k * ( 2 - k );
			}

  function step () {
    var now = borws.getTime(),
      newX, newY,
      easing;

    if ( now >= destTime ) {
      that.isAnimating = false;
      that.translate(destX, destY);

      return;
    }

    now = ( now - startTime ) / duration;
    easing = borws.ease.quadratic.fn(now);
    newX = ( destX - startX ) * easing + startX;
    newY = ( destY - startY ) * easing + startY;
    that.translate(newX, newY);

    if ( that.isAnimating ) {
      rAF(step);
    }
  }

  this.isAnimating = true;
  step();
},

  ckScroll.prototype.translate = function  (x,y,time) {
    if (this.scrollY == false) {
      this.y = y = 0;
    }
    if (time == undefined) {
      
      var style = {
        'transform' : 'translate(' + x + 'px,' + y + 'px)',
        'transition' : '0s'
      };
      this.scroller.css(style);
    }else {

      var style = {
        'transform' : 'translate(' + x + 'px,' + y + 'px)',
        'transition' : time + 'ms'
      };
      this.scroller.css(style);
    }
    this.x = x;
    this.y = y;
  }
  
  $(document).on('ckScroll',function  () {
    $(selectString).each(function () {
       //callsome
       $(selectString).data('ckScroll',new ckScroll($(this)));
    })
  })

})(jQuery);
