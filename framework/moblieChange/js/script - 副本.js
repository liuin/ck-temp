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

  myApp.onPageInit('page3', function (page) {
    
  });
  
  //预加载某页
  var ajurl = 'indoor-page.html';
  mainView.router.load({
    //url : ajurl,
    //animatePages:true
  });

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
      mainView.router.back(options)
    }else{
      mainView.router.load(options);
    }          
  }

  //首页变量
  function homeLoad () {
    $('.tag-section').height($(window).height()-80);
    $('.tag-section').width($(window).width());
    
    $('#tag-wrap').on('loadBottom','.bottom-load',function  () {
      
    })


    $('.tag-head-inner a').on('tap',function  (e) {
      if ($(this).hasClass('active')) {
        return false;
      }
      var getInd = $(this).index();

      e.stopPropagation();

      //tagScroll.goToPage(getInd, 0, 0);

      if (tagPageArr[0] == getInd) {
        $('#tag-wrap .tag-section').eq(getInd).hide().fadeIn();
        tagPageArr.reverse();
      }else {
        var getPage = $('#tag-wrap .tag-section').eq(getInd);
        loadAjax(getPage.data('ajaxurl'),getPage,ajaxBeforeCallback,ajaxAfterSuccess);
      }
      $(this).addClass('active').siblings().removeClass('active');      
    })


    return false;
    /*
    
    //tagPage
    tagPageArr = [0];
    tagSection = [];
    ininfPage = 10;
    refreshPro = false;
    refreshY = 0;
    currentPos = {
      x:0,
      y:0,
      dir:false,
      long:10
    }

    $('.tag-wrap-inner').width( $(window).width() * ($('.tag-wrap-inner > .tag-section').length));
    
    
    $('.tag-section').width($(window).width());
    

    return false;

    var tagScroll = new IScroll('#tag-wrap', {
      scrollX: true,
      scrollY: false,
      preventDefault:false,
      momentum: false,
      snap: true,
      bounce:false,
      scrollbars:false,
      mouseWheelSpeed:100
    });

    tagScroll.on('scrollEnd',function  (page) {
      var currentPageIndex = tagScroll.currentPage.pageX; 
      var currentPage = $('.tag-head-inner > a').eq(currentPageIndex);
      if(!(currentPage.hasClass('active'))){                
        currentPage.addClass('active').siblings().removeClass('active');
        var pageObj = $('#tag-wrap .tag-section').eq(currentPageIndex);
        var ajaxUrl = pageObj.data('ajaxurl');
        loadAjax(ajaxUrl,pageObj,ajaxBeforeCallback,ajaxAfterSuccess);
      }
    })



    function ajaxBeforeCallback(obj) {
      if (!(obj.data('isload') == true)) {              
        if (tagPageArr.length <2) {
          tagPageArr.push(obj.index());
        }else {
          $('#tag-wrap .tag-section').eq(tagPageArr[0]).find('.tag-section-inner .tag-section-info').empty();
          $('#tag-wrap .tag-section').eq(tagPageArr[0]).data('isload',false);
          obj.find('.load-tag').show();
          tagPageArr.shift();
          tagPageArr.push(obj.index());
        }
      }else {
        tagPageArr.reverse();
      }
    }

    function ajaxAfterSuccess(obj,data) {
      if (!(obj.data('isload') == true)) {
        obj.find('.tag-section-inner .tag-section-info').empty().hide().html(data).fadeIn();
        obj.data('isload',true).find('.load-tag').hide();
        
      }
    }

    $('.pages .page[data-page="index"]').data('build',true);

    */
  }

  homeLoad();

  //下拉刷新
  function refreshTag(url,obj) {
    var $this = obj;    
    loadAjax(url,obj,function  () {
      //before
      $this.next('.load-tag').show();
    },function  (obj,data) {
      var $data = $(data);
      $data.prependTo($this).hide().fadeIn('slow');  
      $this.next('.load-tag').hide();
    });
  }

  //滚动加载函数
  function ininfeData(url,obj) {
    var $this = obj;
    loadAjax(url,obj,function  (obj) {
      //before
     
      $this.next('.load-tag').show();
    },function  (obj,data) {
      //after
      $this.find('.tag-section-info').append(data);

      for (var i = 0;  i<tagSection.length ; i++) {
        tagSection[i].refresh();
      }
      
      $this.next('.load-tag').hide();
    })
  }

  function loadAjax(url,obj,beforeCallback,afterSuccess) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'text',
        success: function(data){
          if (afterSuccess) {
            afterSuccess(obj,data);
          }
        },
        error:function  () {
          alert('加载错误，请刷新页面');
        },
        beforeSend:function  () {
          if (beforeCallback) {
            beforeCallback(obj);
          }
        }
    });
  }


})