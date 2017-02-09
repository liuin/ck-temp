//地图
var Map = new Object();
Map.width = 640;
Map.height = 320;
Map.obj = document.getElementById('canvas');
Map.ctx = Map.obj.getContext('2d');
Map.viewObjsCurrent = null;
Map.viewObjs = [];

Map.build = function() {
  var ctx = Map.ctx;
  Map.obj.width = Map.width;
  Map.obj.height = Map.height;
  ctx.fillStyle = "#eee";
}

Map.buildImg = function() {
  var data = Map.obj.toDataURL("image/jpeg");

  var img = new Image();
  img.src = data;

  img.onload = function() {
    img = $(img);
    img.appendTo('body');
  }

}

Map.objResetSelect = function() {
  for (var i = 0; i < Map.viewObjs.length; i++) {
    Map.viewObjs[i].selected = false;
  }
}

Map.reset = function() {
  var ctx = Map.ctx;
  ctx.clearRect(0, 0, Map.width, Map.height);
  ctx.fillStyle = "#eee";
}

Map.windowToCanvas = function(x, y) {
  var ca = Map.obj;
  var bbox = ca.getBoundingClientRect();
  return {
    x: (x - bbox.left) * (ca.width / bbox.width),
    y: (y - bbox.top) * (ca.height / bbox.height)
  };
}

Map.planObjs = function() {

  var getQueue = [];



  for (var i = 0; i < Map.viewObjs.length; i++) {

    for (var n = (i + 1); n < Map.viewObjs.length; n++) {
      var s = Map.viewObjs[n - 1].zIndex;

      var comp = Map.viewObjs[n].zIndex;

      if (s > comp) {

        var temp = Map.viewObjs.splice((n - 1), 1)[0];
        Map.viewObjs.push(temp);
      }
    }
  }

  for (var i = 0; i < Map.viewObjs.length; i++) {
    //console.log(Map.viewObjs[i].zIndex);
    Map.viewObjs[i].update();


  }
  //console.log(Map.viewObjs);
  //Engine.stop = true;



}

Map.obj.onclick = function(e) {
  var $this = Map;
  var pos = $this.windowToCanvas(e.clientX, e.clientY);
  var check = Map.checkClick(pos);

  if (check == false && Map.viewObjsCurrent) {
    Map.viewObjsCurrent.moveTo(pos.x, pos.y);
  }

  //hero1.moveTo(pos.x,pos.y);
  //hero1.selected = true;
}

Map.checkClick = function(pos) {
  var posX = pos.x;
  var posY = pos.y;

  var clickObj = null;
  var clickObjIndex = null;

  for (var i = 0; i < Map.viewObjs.length; i++) {
    var obj = Map.viewObjs[i];

    if (posX > (obj.position.x - obj.size.width / 2) && posX < (obj.position.x + obj.size.width / 2) && posY > (obj.position.y - obj.size.height) && posY < (obj.position.y)) {
      if (clickObj != null) {
        if (clickObj.zIndex < Map.viewObjs[i].zIndex) {
          clickObj = Map.viewObjs[i];
          clickObjIndex = i;
        }
      } else {
        clickObj = Map.viewObjs[i];
        clickObjIndex = i;
      }
      //return true
    }
  }

  if (clickObj != null) {
    clickObj.clickEvent(pos, clickObjIndex);
    return true
  }


  return false;
}

Map.build();

//构建精灵
function Sprite(url) {
  this.imgUrl = url;
  this.playspeed = 12;
  this.height = null;
  this.width = null;
  this.totleZhen = null;
  this.currentfsp = 0;
  this.imgReady = false;
  this.changeHeight = null;
  this.playspeedPro = 0;

  this.img = new Image();
  this.img.src = url;

  var $this = this;

  this.img.onload = function() {
    $this.imgReady = true;
  }
}

Sprite.prototype.draw = function(ca) {
  var $this = this;

  if (this.height == null) {
    return
  }

  $this.playspeedPro += (1 / Engine.fps);


  $this.currentfsp = ($this.playspeedPro % $this.playspeed) / ($this.playspeed) * $this.totleZhen.length;

  // $this.currentfsp = Math.floor($this.currentfsp * 100) / 100;

  // $this.currentfsp = $this.currentfsp % $this.totleZhen.length;

  var number = Math.floor($this.currentfsp);

  var getZhen = this.totleZhen[number].split(',');



  // ca.clearRect(-$this.width / 2, -$this.height, $this.width, $this.height);

  ca.drawImage($this.img, parseInt(getZhen[0]), parseInt(getZhen[1]), parseInt(getZhen[2]), parseInt(getZhen[3]), -$this.width / 2, -$this.height, $this.width, $this.height);
  // ca.drawImage($this.img, parseInt(getZhen[0])*number, parseInt(getZhen[1])*number,parseInt(getZhen[2]),parseInt(getZhen[3]),-$this.width/2,-$this.height,$this.width,$this.height);



}

Sprite.prototype.resetFsp = function() {
  var $this = this;
  $this.currentfsp = 0;
  $this.playspeedPro = 0;
}



//构建英雄
function Hero() {
  this.lift = 100;
  this.type = "physics";
  this.skill = {
      "1": {
        "img": "",
        "introduct": "call file",
        "power": 100
      },
      "2": {
        "img": "",
        "introduct": "hello kity",
        "power": 100
      }
    },
    this.size = {
      width: 100,
      height: 130
    },

    this.moveSpeed = 150;
  this.bgColor = "f60";
  this.moveSpeedX = this.moveSpeed || 1.5;
  this.moveSpeedY = this.moveSpeed || 1.5;
  this.moveX = null;
  this.moveY = null;
  this.moveXDir = 1;
  this.moveYDir = 1;
  this.zIndex = 1;
  this.attackSpeed = 1.5;
  this.attackInTime = null;
  this.attackDistance = 50;
  this.direction = "left";
  this.normalPhysicsAttack = 20;
  this.normalMagicAttack = 20;
  this.physicsDefense = 0;
  this.magicDefense = 10;
  this.power = 0;
  this.selected = false;
  this.status = "waiter";
  this.position = {
    x: 10,
    y: 10
  }
  //this.plan();
  //将此加入场景
  Map.viewObjs.push(this);
}

Hero.prototype.checkAction = function() {
  var $this = this;

  if ($this.status == 'move') {
    return
  }

  if ($this.direction == "left") {
    $this.thisCkeckPosX = $this.position.x - $this.size.width / 2 - $this.attackDistance;
    $this.thisCkeckPosXWidth = $this.attackDistance;
    $this.thisCkeckPosY = $this.position.y - $this.size.height;
    $this.thisCkeckPosYHeight = $this.size.height;

    for (var i = 0; i < Map.viewObjs.length; i++) {
      var obj = Map.viewObjs[i];

      if ($this === obj) {
        continue;
      }

      var thisObjX = (obj.position.x - obj.size.width / 2);
      var thisObjXWidth = obj.size.width;
      var thisObjY = (obj.position.y - obj.size.height);
      var thisObjYHeight = obj.size.height;

      //判断矩形碰撞
      var ifImpoac = $this.checkRectImpoac($this.thisCkeckPosX, $this.thisCkeckPosY, $this.thisCkeckPosXWidth, $this.thisCkeckPosYHeight, thisObjX, thisObjY, thisObjXWidth, thisObjYHeight);

      //console.log(ifImpoac);

      //console.log($this.attackProTime);

      if (ifImpoac && ($this.attackProTime == undefined)) {
        $this.attack(obj);
      }
    }
  }

  if ($this.direction == "right") {

    $this.thisCkeckPosX = $this.position.x + $this.size.width / 2 + $this.attackDistance / 2;
    $this.thisCkeckPosXWidth = $this.attackDistance;
    $this.thisCkeckPosY = $this.position.y - $this.size.height;
    $this.thisCkeckPosYHeight = $this.size.height;

    for (var i = 0; i < Map.viewObjs.length; i++) {
      var obj = Map.viewObjs[i];

      if ($this === obj) {
        continue;
      }

      var thisObjX = (obj.position.x - obj.size.width / 2);
      var thisObjXWidth = obj.size.width;
      var thisObjY = (obj.position.y - obj.size.height);
      var thisObjYHeight = obj.size.height;



      //判断矩形碰撞
      var ifImpoac = $this.checkRectImpoac($this.thisCkeckPosX, $this.thisCkeckPosY, $this.thisCkeckPosXWidth, $this.thisCkeckPosYHeight, thisObjX, thisObjY, thisObjXWidth, thisObjYHeight);

      //console.log(ifImpoac);

      //console.log($this.attackProTime);

      if (ifImpoac && ($this.attackProTime == undefined)) {
        $this.attack(obj);
      }
    }
  }

}

//判断矩形碰撞
Hero.prototype.checkRectImpoac = function(x1, y1, w1, h1, x2, y2, w2, h2) {
  if ((x1 + w1) < x2) {
    return false;
  } else if ((x2 + w2) < x1) {
    return false;
  } else if ((y1 + h1) < y2) {

    return false;
  } else if ((y2 + h2) < y1) {

    return false;
  }
  return true;
}


Hero.prototype.clickEvent = function(pos, number) {
  Map.objResetSelect();
  this.selected = true;

  if (Map.viewObjsCurrent == this) {
    this.moveTo(pos.x, pos.y);
  } else {
    Map.viewObjsCurrent = this;
  }
}

Hero.prototype.planMove = function() {
  var $this = this;
  var ca = Map.ctx;
  ca.fillStyle = this.bgColor;

  ca.save();
  ca.translate($this.position.x, $this.position.y);

  if (this.moveXDir == -1) {
    ca.scale(-1, 1);
  }


  if (this.SpriteMove != undefined) {
    this.SpriteMove.draw(ca);
  }



  if (this.selected == true) {
    ca.strokeStyle = "blue";

    ca.beginPath();
    ca.arc(0, 0, 10, 0, Math.PI * 2, true);
    ca.closePath();
    ca.fillStyle = "#000";
    ca.fill();

  }

  // ca.fillRect((-$this.size.width / 2), (-$this.size.height), ($this.size.width), ($this.size.height));

  // ca.fillStyle = "#fff";
  // ca.fillRect(($this.size.width / 4), (-$this.size.height / 1.1), ($this.size.width / 5), ($this.size.height / 5));


  ca.restore();

}


Hero.prototype.planWaiter = function() { //目前和planMove一样
  var $this = this;
  var ca = Map.ctx;
  ca.fillStyle = this.bgColor;

  ca.save();
  ca.translate($this.position.x, $this.position.y);

  if (this.moveXDir == -1) {
    ca.scale(-1, 1);
  }

  if (this.SpriteWatier != undefined) {
    this.SpriteWatier.draw(ca);
  }




  if (this.selected == true) {
    ca.strokeStyle = "blue";
    // ca.strokeRect(-($this.size.width / 2), (-$this.size.height), ($this.size.width), ($this.size.height));

    ca.beginPath();
    ca.arc(0, 0, 10, 0, Math.PI * 2, true);
    ca.closePath();
    ca.fillStyle = "#000";
    ca.fill();
  }

  // ca.fillRect((-$this.size.width / 2), (-$this.size.height), ($this.size.width), ($this.size.height));

  // ca.fillStyle = "#fff";
  // ca.fillRect(($this.size.width / 4), (-$this.size.height / 1.1), ($this.size.width / 5), ($this.size.height / 5));
  //
  // ca.beginPath();
  // ca.arc(0, 0, 10, 0, Math.PI * 2, true);
  // ca.closePath();
  // ca.fillStyle = "#000";
  // ca.fill();

  ca.restore();
}

Hero.prototype.moveTo = function(x, y) {
  this.status = "move";
  this.attackProTime = undefined;
  var distanceX = x - this.position.x;
  var distanceY = y - this.position.y;
  var distance = Math.floor(Math.sqrt(distanceX * distanceX + distanceY * distanceY));

  if (distanceX == 0 && distanceY == 0) {
    this.status = "waiter";
    this.attackProTime = undefined;
    return
  }

  this.moveSpeedX = distanceX / distance * this.moveSpeed;
  this.moveSpeedY = distanceY / distance * this.moveSpeed;

  this.moveX = x;
  this.moveY = y;

  if (this.moveX > this.position.x) {
    this.moveXDir = 1;
    this.direction = "right";
  } else {
    this.moveXDir = -1;
    this.direction = "left";
  }
  (this.moveY > this.position.y) ? (this.moveYDir = 1) : (this.moveYDir = -1);
}

Hero.prototype.moveToPro = function(fps) {

  var distanceX = this.position.x + this.moveSpeedX / fps - this.moveX;
  var distanceY = this.position.y + this.moveSpeedY / fps - this.moveY;

  var checkEnd = false;

  if (this.moveXDir > 0 && distanceX > 0) {
    checkEnd = true;
  }

  if (this.moveXDir < 0 && distanceX < 0) {
    checkEnd = true;
  }

  if (this.moveYDir > 0 && distanceY > 0) {
    checkEnd = true;
  }

  if (this.moveYDir < 0 && distanceY < 0) {
    checkEnd = true;
  }


  if (checkEnd) {
    this.position.x = this.moveX;
    this.position.y = this.moveY;
    //console.log(this.position);
    this.status = "waiter";
  } else {
    this.position.x += (this.moveSpeedX / fps);
    this.position.y += (this.moveSpeedY / fps);
  }

  this.zIndex = Math.floor(this.position.y);

  this.planMove();

}

Hero.prototype.update = function() {
  var $this = this;
  $this.checkAction(); //检测是否碰撞

  if ($this.prevCurrentState != $this.status) {

    switch ($this.status) {
      case 'move':
        if ($this.SpriteMove) {
          $this.SpriteMove.currentfsp = 0;
        }
        break;
      case 'waiter':
        if ($this.SpriteWatier) {
          $this.SpriteWatier.currentfsp = 0;
        }
        break;
      case 'attack':
        if ($this.SpriteAttack) {
          $this.SpriteAttack.currentfsp = 0;
        }
        break;
    }

    $this.prevCurrentState = $this.status;
  }

  // $this.prevCurrentState = $this.status;


  if ((typeof $this.checkStaues) == 'function') {
    $this.checkStaues();
  }

  switch ($this.status) {
    case 'move':
      $this.moveToPro(Engine.fps);
      break

    case 'attack':
      $this.attackPro(Engine.fps);
      break

    case 'waiter':
      this.planWaiter();
      break

    default:

  }
}


Hero.prototype.attack = function(enemy) {
  if (typeof enemy == "undefined") {
    this.status = "waiter";
    return
  }

  this.status = "attack";

  var measure = (this.normalPhysicsAttack > this.normalMagicAttack) ? this.normalPhysicsAttack : this.normalMagicAttack;

  var type = this.type;

  switch (type) {
    case 'physics':
      measure -= enemy.physicsDefense;
      break
    case 'magic':
      measure -= enemy.magicDefense;
      break
    default:
  }

  this.attackMeasure = measure;
  this.enemy = enemy;
  this.enemyMeasure = measure;
  this.attackInOut = false;
}

Hero.prototype.attackPro = function(fps) {
  var $this = this;
  var speed = 1 / fps;

  //前摆
  // this.planMove();

  var ca = Map.ctx;

  if ($this.attackInTime == null) {
    $this.attackInTime = $this.attackSpeed / 1.5
  }

  ($this.attackProTime === undefined) ? $this.attackProTime = speed: $this.attackProTime += speed;
  // console.log($this.attackProTime);
  //画攻击
  ca.save();
  ca.translate($this.position.x, $this.position.y);
  //ca.beginPath();


  // ca.fillStyle = 'rgba(255, 0, 0, ' + $this.attackProTime / $this.attackSpeed + ')';


  if (this.moveXDir == -1) {
    ca.scale(-1, 1);
  }

  if (this.SpriteAttack != undefined) {
    this.SpriteAttack.draw(ca);
  }


  // if ($this.direction == "left") {
  //   //ca.arc(-$this.size.width/1.15,-$this.size.height/1.15,10,0,Math.PI*2,true);
  //   ca.fillRect(-$this.size.width / 1.15 - 5, -$this.size.height / 1.15, 30, $this.size.height / 1.15);
  // }
  //
  // if ($this.direction == "right") {
  //   //ca.arc($this.size.width/1.15,-$this.size.height/1.15,10,0,Math.PI*2,true);
  //   ca.fillRect($this.size.width / 1.15 - 25, -$this.size.height / 1.15, 30, $this.size.height / 1.15);
  // }

  ca.restore();

  if ($this.attackProTime > $this.attackInTime && ($this.attackInOut == false)) {
    $this.enemy.lift -= $this.enemyMeasure;
    $this.attackInOut = true;
    if ($this.enemy.lift <= 0) {
      $this.enemy.status = 'dead';
      $this.enemy.position.x = -9999;
      $this.enemy.position.y = -9999;
      delete $this.enemy;
    }
  }

  //后摆
  //this.planMove();

  if ($this.attackProTime > $this.attackSpeed) {
    $this.attackProTime = undefined;
    $this.status = "waiter";
  }


}


Hero.prototype.dead = function() {
  console.log('dead');
  var $this = this;
  for (var i = 0; i < Map.viewObjs.length; i++) {
    //console.log(Map.viewObjs[i].zIndex);
    var obj = Map.viewObjs[i];
    if ($this == obj) {
      Map.viewObjs.splice(i);
    }
  }
  delete $this;

}


function Attack() {
  this.power = null;
}


function changeToZhen(totleheight, cutHeight, width, height) {
  var arr = [];
  for (var i = 0; i < Math.floor(totleheight / cutHeight); i++) {
    var a = '0,' + i * cutHeight + ',' + width + ',' + height + '';
    arr.push(a);
  }
  return arr;
}

var hero1 = new Hero();
var hero2 = new Hero();



hero1.SpriteMove = new Sprite('img/hero1-move.png');
hero1.SpriteMove.totleZhen = changeToZhen(1230, 123, 58, 123);
hero1.SpriteMove.playspeed = 8 / hero1.SpriteMove.totleZhen.length;



hero1.SpriteWatier = new Sprite('img/hero1-waiter.png');
hero1.SpriteWatier.totleZhen = changeToZhen(5290, 115, 79, 115);

hero1.SpriteWatier.playspeed = 200 / hero1.SpriteWatier.totleZhen.length;

hero1.SpriteAttack = new Sprite('img/hero1-attack.png');
hero1.SpriteAttack.totleZhen = changeToZhen(4650, 155, 126, 155);
hero1.SpriteAttack.totleZhen.length = 4;

hero1.attackSpeed = 0.7;
hero2.attackSpeed = 1;

hero1.SpriteAttack.playspeed = hero1.attackSpeed;



hero1.size.x = 60;
hero1.size.y = 123;

hero1.attackDistance = -25;
hero2.attackDistance = -25;


hero1.checkStaues = function() {
  if (hero1.status == 'waiter') {
    hero1.SpriteWatier.width = 79;
    hero1.SpriteWatier.height = 115;
  }

  if (hero1.status == 'move') {
    hero1.SpriteMove.width = 58;
    hero1.SpriteMove.height = 123;
  }

  if (hero1.status == 'attack') {
    hero1.SpriteAttack.width = 126;
    hero1.SpriteAttack.height = 155;
  }
}

hero1.position.x = 150;
hero1.position.y = 200;
hero1.moveTo(200, 200);




hero2.position.x = Map.obj.width - 100;
hero2.position.y = 200;

hero2.moveSpeed = 170;

hero2.moveTo(Map.obj.width - 200, 200);


hero2.SpriteMove = new Sprite('img/hero2-move.png');
hero2.SpriteMove.totleZhen = changeToZhen(960, 120, 72, 120);
hero2.SpriteMove.playspeed = 7 / hero2.SpriteMove.totleZhen.length;



hero2.SpriteWatier = new Sprite('img/hero2-waiter.png');
hero2.SpriteWatier.totleZhen = changeToZhen(2160, 135, 65, 135);
hero2.SpriteWatier.playspeed = 15 / hero2.SpriteWatier.totleZhen.length;

hero2.SpriteAttack = new Sprite('img/hero2-attack.png');
hero2.SpriteAttack.totleZhen = changeToZhen(4774, 154, 137, 154);
hero2.SpriteAttack.totleZhen.length = 5;
hero2.SpriteAttack.playspeed = hero2.attackSpeed;

hero2.size.x = 70;
hero2.size.y = 123;

hero2.checkStaues = function() {
  if (hero2.status == 'waiter') {
    hero2.SpriteWatier.width = 65;
    hero2.SpriteWatier.height = 135;
  }

  if (hero2.status == 'move') {
    hero2.SpriteMove.width = 72;
    hero2.SpriteMove.height = 120;
  }

  if (hero2.status == 'attack') {
    hero2.SpriteAttack.width = 137;
    hero2.SpriteAttack.height = 154;
  }
}



//Engine
var Engine = new Object();

Engine.now = new Date().getTime() || null;
Engine.lastTime = null;
Engine.stop = false;
Engine.fps = 60;


Engine.getFps = function() {
  if ((this.now - this.lastTime) > 1000) {
    this.fps = ((this.now - this.lastTime) / 1000).toFixed(2) * 100;
    if (this.fps < 30) {
      this.fps = 30;
    }
    $('#fps').html(this.fps);
    this.lastTime = this.now;
  }
}


Engine.requestAnimationFrame = function(callback) {
  if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
  else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
  else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
  else {
    return window.setTimeout(callback, 1000 / 60);
  }
}

Engine.view = function() {

}

Engine.animate = function(time) {
  var $this = Engine;

  if ($this.stop == true) {
    return Engine.requestAnimationFrame(Engine.animate);
  }

  $this.now = time || new Date().getTime();
  if ($this.lastTime == null) {
    $this.lastTime = $this.now;
  }
  $this.getFps();
  Map.reset();
  //hero1.update();
  // console.log(hero1.lift, hero2.lift);
  Map.planObjs();


  Engine.requestAnimationFrame(Engine.animate);
}




//Engine.animate.call(Engine)

Engine.requestAnimationFrame(Engine.animate);
