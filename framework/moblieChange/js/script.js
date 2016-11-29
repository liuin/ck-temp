$(document).ready(function() {
  //定义app 全局变量
  var myApp = new Framework7({});
  var mainView = myApp.addView('.container-view', {});
  
  //加载回调函数页面
  myApp.onPageInit('index', function (page) {    
    if ($('.pages .page[data-page="index"]').data('build') != true) {
      homeLoad();
    }
    $('.pages .page[data-page="index"]').data('build',true);
  });

  myApp.onPageInit('page3', function (page) {});
  
  //预加载某页
  var ajurl = 'indoor-page.html';
  mainView.router.load({
    //url : ajurl,
    //animatePages:true
  });

  function gotoUrl(gurl) {
    mainView.router.load({
      url : gurl,
      animatePages:true
    });    
  }

  //左边目录
  var getpanhd = $(window).height()- $('.panel-login').outerHeight() - $('.panel-bottom').outerHeight();
  $('.panel-list-block').height(getpanhd);

  $('.open-panel').on('tap',function  (e) {
    $('body').addClass('open-panel');
    setTimeout(
      function(){
        $('.panel-overlay').css('z-index','20');
        $('.panel.panel-left').css('z-index','25');  
        $('.panel-overlay').one('tap',function  (e) {
          e.stopPropagation();          
          $('.panel.panel-left').css('z-index','');  
          setTimeout(
            function(){
              $('body').removeClass('open-panel');    
              setTimeout(
                function(){
                  $('.panel-overlay').css('z-index','');
                }, 500)
            }, 200)
        })
      }, 500)
  })


  //点击事件
  $(document).on('tap', 'a', handleClicks);
  function handleClicks(e) {
    /*jshint validthis:true */
    var clicked = $(this);
    
    var url = clicked.attr('href');
    
    var isLink = clicked[0].nodeName.toLowerCase() === 'a';        
    // Check if link is external 
    if (isLink) {
        if (clicked.is(mainView.params.externalLinks) || url && url.indexOf('javascript:') >= 0) {
            if(url && clicked.attr('target') === '_system') {
                e.preventDefault();
                window.open(url, '_system');
            }
            return;
        }
    }
    if (isLink) {
      e.preventDefault();
    }
    
    var options = {
      url : url,
      animatePages:true
    }

    if (clicked.hasClass('back')){
      mainView.router.back(options);
    }else{
      mainView.router.load(options);
    }

        
    
  }


  //首页变量
  function homeLoad () {
    $(document).trigger('ckScroll');
    $(document).trigger('fixCktarget');

    var prevPage = 'first';
    var curPage = 0;

    $('.tag-section').height($(window).height()-80);
    $('.tag-section').width($(window).width());    

    
    $('#tag-wrap').on('loadBottom','.bottom-load',function  () {
      var getInd = $(this).parents('.tag-section').index();      
      var $cktarget = $('[data-cktarget]').eq(getInd).data('cktarget');
      $cktarget.ajaxLoad();
    })

    


    $('.tag-head-inner a').on('tap',function  (e) {
      if ($(this).hasClass('active')) {
        return false;
      }
      var getInd = $(this).index();

      e.stopPropagation();

    })


    $('#tag-wrap').on('click','a',function  (e) {
      e.stopPropagation();
      e.preventDefault();
      var urllink = $(this).attr('href');
      gotoUrl(urllink);

    })


    $('#tag-wrap').on('scrollEnd',function  () {
      var getInd = arguments[1];
      
      $('.tag-section .bottom-load').hide();
      $('.tag-section').eq(getInd).find('.bottom-load').show();

      if (getInd == prevPage) {
        prevPage = curPage;
        curPage = getInd;        
        $('.tag-head-inner a').eq(getInd).addClass('active').siblings().removeClass('active');
        return
      }

      if (prevPage == 'first') {
        $('[data-cktarget]').eq(getInd).trigger('click');
        prevPage = curPage;
        curPage = getInd;        

      }else{
        if (getInd != prevPage) {
          $('[data-cktarget]').eq(getInd).trigger('click');
          prevPage = curPage;
          curPage = getInd;          
          $('.tag-section').each(function (n) {
            if (n != prevPage && n != curPage) {
              $(this).find('.tag-section-info').empty();
              $(this).find('.load-tag').show();
            }
          })
        }else {
          $('.tag-head-inner a').eq(getInd).addClass('active').siblings().removeClass('active');
        }
      }
    })

    return false;
  }

  homeLoad();
})


/*-- 
  anchor:cuki13
  use:data-cktarget

 --*/

+(function($) {

  'use strict';
  var selectString = '[data-cktarget]';  

  function Cktarget(obj) {
    this.obj = obj;
    this.addClass = 'active';
    this.index = obj.index();
    this.targetObj = $(obj.data('cktarget'));
    this.ajaxPro = false;
    this.loadObj = this.targetObj.parents('.tag-section').find('.load-tag');
    this.ajaxUrl = obj.data('ckurl');
    this.curPage = 0;
    this.parenObj = $(obj.data('parentClass'));
    this.totlePage = obj.data('totlepage');
    this.end = false;
    this.isRefresh = true;
    this.refreshMove = 0;
    this.refreshRange = 30;
    this.refreshObj = this.targetObj.parents('.tag-section').find('.refresh-tag');
    this.scrollAppend = true;
    this.refreshPro = false;
    this.parentScroll = $('[ckscroll]').data('ckScroll');

    var $this = this;

    //点击事件
    this.obj.on('click',function  (e) {

     if ($this.obj.hasClass($this.addClass) || $this.ajaxPro) {
      return false;
     }else {      
       //var $cktarget = $('[data-cktarget]').eq(getInd).data('cktarget');
       var getInd = $this.obj.index();      
       //var $cktarget = $('[data-cktarget]').eq(getInd).data('cktarget');
       $this.parentScroll.translate(-getInd*$('#tag-wrap').width(),0,300);
       $this.obj.addClass($this.addClass).siblings().removeClass($this.addClass);
       $this.curPage = 0;
       $this.end = false;
       $('.tag-part-more').find('a').removeClass('end');
       if ($this.ajaxUrl != '' && (!$this.end)) {        
        $this.ajaxLoad();
       }else {
         $this.showIn();           
       }
     }

     return false;
    })

    //滚动加载
    if (this.scrollAppend) {
      $this.scrollAp();
    }

    if (this.isRefresh) {
      this.upRefresh();
    }


  }

  Cktarget.prototype.scrollAp = function  () {    

  }


  Cktarget.prototype.upRefresh = function  () {    
    var $this = this,
    $targetObj = $this.targetObj,
    pageTop = 0,
    isTop = false;

    $targetObj.on('touchstart MSPointerDown pointerdown',function  (e) {
      tgStart (e);
    })
/*
    $targetObj.on('touchmove MSPointerMove pointermove',function  (e) {
      tgMove(e);
    })
*/

    function tgStart (e) {
      
      
      if ($targetObj.parents('.tag-section').scrollTop() == 0 ) {
        if ($this.parentScroll.isMove == true) {
          return
        }
        isTop = true;
        pageTop = window.event.touches[0].pageY;        
        $targetObj.bind('touchmove',function  (e) {
          tgMove(e);
        });        
        $targetObj.bind('touchend',function  (e) {
          tgEnd(e);
        });
      }else {
        isTop = false;
      }
    }
    
    function tgMove (e) {    
      if ($this.parentScroll.isMove == true) {
        return
      }
      if (isTop == true) {        
        //e.preventDefault();
        //e.stopPropagation();         
        var move = window.event.touches[0].pageY - pageTop;      
        if (move < 3) {
           //isTop = false;
           //resetEvent ()
        }else {
            isTop = true;
            move = (move/Math.sqrt(move)) * 3.5;
            $this.parentScroll.isSubMove = true;
            e.preventDefault();
            e.stopPropagation();        
            var style = {
              'transform' : 'translate(0px,' + move + 'px)',
              'transition' : '0s'
            };
            $this.refreshMove = move;
            
            if (move > $this.refreshRange) {
              $this.refreshObj.html('松开刷新').addClass('open');
            }else {
              $this.refreshObj.html('下拉刷新').removeClass('open');            
            }         
            $targetObj.css(style);         
        }
      }else {        
        resetEvent()       
      }   
    }   



    function tgEnd (e) {
      isTop = false;
      $this.parentScroll.isSubMove = false;
      
      resetEvent();

      $this.refreshEnd();
    }

    function resetEvent () {
      var style = {
        'transform' : 'translate(0px,' + 0 + 'px)',
        'transition' : '.3s'
      };
      $targetObj.css(style);

      //$targetObj.unbind('touchmove MSPointerMove pointermove');
      //$targetObj.unbind('touchend MSPointerUp pointerup');      
      $targetObj.unbind();        

      $targetObj.on('touchstart MSPointerDown pointerdown',function  (e) {    
        if ($this.refreshPro == true) {
          
        }else {
          tgStart(e);       
        }
      })
    }
  }

  Cktarget.prototype.refreshEnd = function  () {
    var $this = this;
    if (($this.refreshMove > $this.refreshRange) && ($this.refreshPro == false)) {
      $this.refreshAppend();
    }    
  }

  Cktarget.prototype.refreshBack = function  () {
    var $this = this,
      $targetObj = $this.targetObj;

    $targetObj.on('touchstart MSPointerDown pointerdown',function  (e) {                         
       if ($this.refreshPro == true) {           
       }else {                  
       }      
     })
  }

  Cktarget.prototype.refreshAppend = function  () {
    var $this = this,
    $targetObj = $this.targetObj,
    getUrl = $this.obj.data('refresh');

    $.ajax({
      type: "GET",
      url: getUrl,
      dataType: 'html',
      success: function(data){
        setTimeout(
          function(){
            $this.refreshPro = false;
            $this.refreshObj.html('下拉刷新');
            $this.refreshObj.removeClass('refresh-load');
            
            var $data = $(data).show();

            $targetObj.prepend($data);

            var style = {
              'transform' : 'translate(0px,' + 0 + 'px)',
              'transition' : '.3s'
            };
            $targetObj.css(style);

            $this.refreshMove = 0;
          
            //$this.refreshBack();

          }, 1000)
      },
      error:function  () {
        alert('很抱歉加载错误,请刷新页面');
      },
      beforeSend:function  () {
        $this.refreshPro = true;
        $this.refreshObj.addClass('refresh-load');
        $this.refreshObj.html('下拉加载中...');
        var style = {
          'transform' : 'translate(0px,' + $this.refreshRange + 'px)',
          'transition' : '.3s'
        };
        $targetObj.css(style);
      }
    });
  }



  Cktarget.prototype.ajaxLoad = function  () {     

    var $this = this;
    
    if ($this.end) {     
      return false
    }
    var url = $this.ajaxUrl + '?p =' + $this.curPage;
    var arg = arguments[0];
    
    $this.ajaxPro = true;
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        success: function(data){
          if ($this.curPage == 0) {
            $this.targetObj.empty();
          }                        
          $this.targetObj.append(data);          

          if ($this.curPage == ($this.totlePage - 1)) {            
            $this.end = true;
          }else {
            $this.curPage++;
          }
          
          $this.showIn(); 
          $this.afterAjax();
          $this.loadObj.fadeOut();
          $this.ajaxPro = false;          
        },
        error:function  () {
        },
        beforeSend:function  () {
            if (arg != 'moreload') {
              $this.loadObj.show();
            }
        }
    });      
  }

  Cktarget.prototype.afterAjax = function  () {
    if (this.end == true) {
      this.targetObj.next('.bottom-load').hide();      
    }else {
      this.targetObj.next('.bottom-load').show();      
    }
    this.targetObj.prev('.refresh-tag').show();

    this.targetObj.trigger('afterAppend');
  }

  Cktarget.prototype.showIn = function  () {
    if (this.targetObj.hasClass(this.addClass)) {
      return false;
    }
    this.parenObj.addClass(this.addClass).fadeIn().siblings().removeClass(this.addClass).hide();
  }



  function addClassFx() {
    $(selectString).each(function () {
      $(this).data('cktarget',new Cktarget($(this)));
    })
    $(selectString).eq(0).trigger('click');
  }

  $(document).on('fixCktarget',function  () {
    addClassFx();
  })

})(jQuery);