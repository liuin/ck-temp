function ckbrower() {

  if (!Array.prototype.indexOf) {
    alert('浏览器版本过低');
    return false
  } else {
    return true
  }
}

ckbrower();



//建立方块
function Block(number, point, pos) {
  this.number = number;
  this.point = point;
  this.check = false;
  this.stact = "empty";
  this.ckPoint = this.point.slice(0);
  this.close = false;
  this.ckPointRoot = [];
  this.size = 60;
  this.posShow = {};
  this.space = 10;
  this.pos = pos;
  this.baseDistance = "N";
  this.baseDistancePrevBlock = "N";
  this.range = 1;

  this.posShow.x = pos.y * this.size;
  this.posShow.y = pos.x * this.size;

  this.showIn();

}

Block.prototype.ckPointReset = function() {
  var ckp = this.point.slice(0);
  this.ckPoint = ckp;

  this.ckPointRoot = [];

  this.check = false;

}

Block.prototype.showIn = function() {

  var style = {
    'left': this.posShow.x + this.space * this.pos.y + (((this.pos.x % 2) == 0) ? 0 : ((2 * this.size + this.space) / 2 - this.size / 2)),
    'top': this.posShow.y,
    'width': this.size,
    'height': this.size,
    'position': 'absolute',
    'line-height': this.size + 'px'
  }

  var item = $('<div class="item" data-number="' + this.number + '">' + this.number + '</div>');

  //var item = $('<div class="item" data-number="'+ this.number +'"></div>');
  item.css(style);

  if (this.pos.current == true) {
    item.addClass('current');
  }

  $('#catrun').append(item);
}




function carCatch(row, col) {
  this.row = row; //行
  this.col = col; //列
  this.blocklist = [];
  this.getroot = [];
  this.toblock = "";
  this.formblock = "";
  this.isClose = false;
  this.lastCount = 12;
  this.proCount = 0;
  this.proCountEnd = 1000; //执行的最大量后释放内存,原来电脑也需要休息的
  this.checkRoot = [];
  this.baseMaxDistance = 0;
  this.baseMaxDistanceBlock = 0;
  this.currentPos = Math.floor(row / 2).toString() + '-' + Math.floor(col / 2).toString();
  this.bdMap(this.row, this.col);
  this.currentBlock = this.blocklist[this.currentPos];
}

carCatch.prototype.bdMap = function(row, col) { //建立地图
  for (var i = 0; i < row; i++) {
    for (var n = 0; n < col; n++) {
      var number = i.toString() + '-' + n.toString();
      var point = [];
      var pos = {};

      if (i % 2 == 0) {
        point[0] = ((n == 0) ? "-1" : i.toString() + '-' + (n - 1).toString());
        point[1] = ((n == 0) ? "-1" : ((i == 0) ? "-1" : (i - 1).toString() + '-' + (n - 1).toString()));
        point[2] = ((i == 0) ? "-1" : (((i - 1).toString() + '-' + n.toString())));
        point[3] = ((n == (col - 1)) ? "-1" : (i.toString() + '-' + (n + 1).toString()));
        point[4] = ((i == (row - 1)) ? "-1" : (i + 1).toString() + '-' + n.toString());
        point[5] = ((i == (row - 1)) ? "-1" : ((n == 0) ? "-1" : ((i + 1).toString() + '-' + (n - 1).toString())));
      } else {
        point[0] = ((n == 0) ? "-1" : i.toString() + '-' + (n - 1).toString());
        point[1] = ((i == 0) ? "-1" : (i - 1).toString() + '-' + n.toString());
        point[2] = ((i == 0) ? "-1" : ((n == (col - 1)) ? "-1" : ((i - 1).toString() + '-' + (n + 1).toString())));
        point[3] = ((n == (col - 1)) ? "-1" : (i.toString() + '-' + (n + 1).toString()));
        point[4] = ((i == (row - 1)) ? "-1" : ((n == (col - 1)) ? "-1" : (i + 1).toString() + '-' + (n + 1).toString()));
        point[5] = ((i == (row - 1)) ? "-1" : ((i + 1).toString() + '-' + n.toString()));
      }
      pos.x = i;
      pos.y = n;
      pos.current = false;

      //console.log((i.toString() + n.toString()),this.currentPos);
      if ((i.toString() + '-' + n.toString()) == this.currentPos) {
        pos.current = true;
      }

      var bdBlock = new Block(number, point, pos);
      this.blocklist.push(bdBlock);
    }
  }
  this.blocklist = toObject(this.blocklist);


  //console.log(this.blocklist);

  function toObject(o) { //数组转化为obj
    var obj = {};
    for (var i in o) {
      obj[o[i].number] = o[i];
    }
    return obj;
  }

}

carCatch.prototype.searchBlock = function() {
  //return

  //检查是否结束了
  var ifClose = 0;
  for (var i = 0; i < this.currentBlock.point.length; i++) {
    if (this.blocklist[this.currentBlock.point[i]].close == true) {
      ifClose++;
    }
  }

  if (ifClose > 5) {
    alert('恭喜你赢了');
    return
  }


  this.getroot.push(this.currentBlock.number);

  this.currentBlock.baseDistance = 0;
  this.checkBlock(this.currentBlock);
}

carCatch.prototype.checkReset = function() {
  for (var i in this.blocklist) {
    this.blocklist[i].baseDistance = "N";
    this.blocklist[i].baseDistancePrevBlock = "N";
    if (this.blocklist[i].check == true) {
      this.blocklist[i].check = false;
    }
  }

  this.baseMaxDistance = 0;
  this.baseMaxDistanceBlock = 0;

}

carCatch.prototype.randomStopBlock = function(count) {

  for (var i = 0; i < count; i++) {
    var getrow = Math.floor(this.row * Math.random()).toString();
    var getcol = Math.floor(this.col * Math.random()).toString();
    var number = getrow + '-' + getcol;
    this.setStopBlock(number);

  }

}


carCatch.prototype.setStopBlock = function(number) {

  var stopBlock = this.blocklist[number];

  if (stopBlock.pos.current == true) {
    return;
  }

  stopBlock.close = true;
  $('[data-number="' + number + '"]').addClass('stop');
}


carCatch.prototype.checkBlock = function(ckBlock) { //最短路径算法

  var $this = this;

  ckBlock.check = true;


  for (var i = 0; i < ckBlock.point.length; i++) {


    if ((ckBlock.point[i] != "-1")) {

      var bk = $this.blocklist[ckBlock.point[i]];

      if (bk.close != true) {
        //判断最短路径
        var distance = ckBlock.baseDistance + ckBlock.range;


        if ((bk.baseDistance == "N") || (distance < bk.baseDistance)) {
          bk.baseDistance = distance;
          bk.baseDistancePrevBlock = ckBlock.number;
        } else if (ckBlock.baseDistance > bk.baseDistance) {
          ckBlock.baseDistance = bk.baseDistance + 1;
          ckBlock.baseDistancePrevBlock = bk.number;
        }

        if (bk.baseDistance > $this.baseMaxDistance) {
          $this.baseMaxDistance = bk.baseDistance;
          $this.baseMaxDistanceBlock = bk;
        }

        if ((bk.check != true) && ($this.checkRoot.indexOf(ckBlock.point[i]) < 0)) {
          $this.checkRoot.push(ckBlock.point[i]);
        }
      }
    } else {



      $this.findRoot(ckBlock);

      return
    }
  }

  if ($this.checkRoot.length > 0) {
    var getBlock = $this.blocklist[$this.checkRoot.shift()];

    $this.checkBlock(getBlock);
  } else {
    //console.log($this.baseMaxDistanceBlock);
    //$this.checkReset();
    $this.findRoot($this.baseMaxDistanceBlock);
  }

}

carCatch.prototype.findRoot = function(obj) {
  var $this = this;
  if ($this.blocklist[obj.baseDistancePrevBlock].baseDistance != 0) {
    $this.findRoot($this.blocklist[obj.baseDistancePrevBlock]);
  } else {
    //移动路径          
    $this.moveBlock(obj);
  }
}


carCatch.prototype.resetCurrentPos = function(number) {
  var $this = this;
  $this.moveBlock(this.blocklist[number]);
}

carCatch.prototype.moveBlock = function(obj) {
  var $this = this;

  $this.checkReset();

  var prevCurrentPos = this.currentPos;
  this.blocklist[prevCurrentPos].pos.current = false;
  $this.checkRoot.length = 0;

  $('[data-number="' + prevCurrentPos + '"]').removeClass('current');

  this.currentPos = obj.number;
  this.currentBlock = obj;

  this.currentBlock.pos.current = true;
  $('[data-number="' + obj.number + '"]').addClass('current');

  if (this.currentBlock.point.indexOf('-1') > -1) {
    alert('你输了');
  }

}

var carCatch1 = new carCatch(9, 9);



//blocklist["6"].close = true;
//carCatch1.blocklist["02"].close = true;
//carCatch1.blocklist["11"].close = true;
//carCatch1.blocklist["21"].close = true;
//carCatch1.blocklist["30"].close = true;
//carCatch1.blocklist["12"].close = true;
//carCatch1.blocklist["13"].close = true;
//carCatch1.blocklist["33"].close = true;
//carCatch1.blocklist["41"].close = true;
//carCatch1.blocklist["42"].close = true;
//carCatch1.blocklist["43"].close = true;
//carCatch1.blocklist["30"].close = true;

var getCurrent = Math.floor(carCatch1.row / 2).toString() + '-' + Math.floor(carCatch1.col / 2).toString();

carCatch1.resetCurrentPos(getCurrent);
carCatch1.randomStopBlock(20);


//var stoparr = ["2-1","3-0","4-0","5-0","6-1","2-2","2-3","2-4","2-5","2-6","2-7","3-7","4-7","5-7","6-7","6-6","6-5","6-4","6-3","6-2"];

//for (var i = 0;  i<stoparr.length ; i++) {
//carCatch1.setStopBlock(stoparr[i]);
//}

//carCatch1.isClose = true;



//carCatch1.searchBlock();

$('#catrun').on('click', '.item', function() {
  if ($(this).hasClass('current')) {
    return
  }
  var getNumber = $(this).data('number');
  carCatch1.setStopBlock(getNumber);
  carCatch1.searchBlock();
})