var mySwiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  direction: 'vertical',
  //effect: 'scale',
  grabCursor: true,
  cube: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 20,
    shadowScale: 0.94
  },
  coverflow: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  onSlideChangeEnd: function (swp) {
    if (mySwiper.activeIndex == 2) {
      mySwiper.params.onlyExternal = true;
    } else {
      mySwiper.params.onlyExternal = false;
    }

  }
});


$('.swiper-move-page')
  .on('swipeUp', function (e) {
    if ($('#flipper').hasClass("flip")) {
      mySwiper.slideNext();
    } else {
      $('#flipper').addClass('flip');
      setTimeout(
        function(){
          $(".back").css("z-index","2");
          $(".front").css("z-index","3");
        }, 500)

    }
  })
  .on('swipeDown', function (e) {
    if ($('#flipper').hasClass("flip")) {
      $('#flipper').removeClass('flip');
      setTimeout(
        function(){
          $(".back").css("z-index","3");
          $(".front").css("z-index","2");
        }, 500)
    }else{
      mySwiper.slidePrev();
    }

  })
$('#arrow-down').on('tap',function(){
  if(mySwiper.params.onlyExternal == false){
    mySwiper.slideNext();
  }else{
    $(".swiper-move-page").trigger('swipeUp');
  }
})

$('#loading').fadeOut();

//ckbxo
$(".form-checkbox").formCheckbox();
