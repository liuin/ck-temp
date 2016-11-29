var container = $( '.container' );
var carousel = $( '.list-v' );
var item = $( '.list-v .item' );
var itemLength = $( '.list-v .item' ).length;

radius = Math.round( (250) / Math.tan( Math.PI / itemLength ));



TweenMax.set(container, {perspective:600})

TweenMax.set(carousel, {z:-(radius),rotationY:0,rotationX:0})


rY = 360 / itemLength;

for ( var i = 0; i < itemLength; i++ )
 {
  var $item = item.eq(i);
  //thanks @chrisgannon!        
  TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px",autoAlpha:1, delay:0});
    //animateIn( $item, $block )
}



TweenMax.set(carousel,{'top':0});

//TweenMax.to(carousel, 10,{'top':100,rotationY:100,ease: SteppedEase.config(12),onComplete:function  () {
//  alert('111222');
//}});

TweenMax.to(carousel, 10,{'top':100,rotationY:100,autoAlpha:.5,ease: Power0.easeNone, onComplete:function  () {
  alert('111222');
}});

TweenMax.to('#id', 10,{'top':100,rotationY:100,autoAlpha:.5,ease: Power0.easeNone, onComplete:function  () {
  
}});
