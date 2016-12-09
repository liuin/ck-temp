function Fragile(){
  this.easeType = ['Power3.easeIn','Power2.easeIn','Circ.easeIn'];
  this.getNumber = 12;
  this.containerObj = $('#containerhua');
  this.init();
}

Fragile.prototype.buildCut = function () {
  var type = (Math.floor(Math.random()*2) == 0)? 'hua-red' : 'hua-blue';
  var getPos = Math.floor(this.containerObj.width()*Math.random() + 100);
  var item = '<span class="hua '+ type +'" style="top: 10px;"></span>';
  item = $(item);
  item.css('left', getPos);
  item.appendTo(this.containerObj);
  this.animationMove(item);
}

Fragile.prototype.animationMove = function(obj) {
  var $Fragilethis = this;
  var getTimeY = Math.random()*7 + 3,
  ease = Math.floor(Math.random()*this.easeType.length),
  durX = Math.floor(Math.random()*300-150),
  $this = obj;
  // TweenMax.set(obj[0],{
  //   x:0
  // })
  var tm = TweenMax.to(obj[0],getTimeY,{
    y:500,
    x:durX,
    ease:this.easeType[ease],
    onComplete:function () {
      //完成回调
      obj.remove();
      $Fragilethis.buildCut();
    }
  })
  // var tm1 = TweenMax.to(obj[0],getTimeY,{
  //    opacity:0,
  //    delay:getTimeY-1
  // })
}

Fragile.prototype.init = function (){
  this.containerObj.empty();
  for (var i = 0; i < this.getNumber; i++) {
    this.buildCut();
  }

}

var Fragile1 = new Fragile();
