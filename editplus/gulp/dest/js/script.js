//const $ = require("./jquery.js");
//import "./swiper.js";
//import "../css/reset.css";
//import "../css/swiper.css";
//import "../css/style.css";

window.onload = function  () {
  
  var mySwiper = new Swiper('.swiper-container-1',{
    pagination: '.pagination1',
    paginationClickable: true,
    loop:false,
//    mode: 'vertical',
//    direction:'vertical',//3.1++
    slidesPerView: 'auto',
//    effect:'fade',
    //moveStartThreshold: 100
    //followFinger : false,
    onSlideChangeEnd: function  () {
    },
    onInit:function  (e) {
    
      $('.swiper-container .next').on('click',function  () {
        e.slideNext();
      })

      $('.swiper-container .prev').on('click',function  () {
        e.slidePrev();
      })
    }
   })
   console.log(mySwiper);
   
}

