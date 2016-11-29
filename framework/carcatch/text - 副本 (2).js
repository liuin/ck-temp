function ckbrower () {

  if (!Array.prototype.indexOf)
  {
    alert('浏览器版本过低');
    return false
  }else {
    return true
  }

}

ckbrower ();



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

  this.posShow.x = pos.y * this.size;
  this.posShow.y = pos.x * this.size;
  

  this.showIn();


}

Block.prototype.ckPointReset = function  () {  
  var ckp = this.point.slice(0);
  this.ckPoint = ckp; 

  this.ckPointRoot = [];

  this.check = false;
  
}

Block.prototype.showIn = function  () {


  var style = {
    'left':this.posShow.x + this.space*this.pos.y + (((this.pos.x % 2) == 0)? 0 : ((2*this.size+ this.space)/2 - this.size/2)),
    'top':this.posShow.y,
    'width': this.size,
    'height': this.size,
    'position' : 'absolute',
    'line-height': this.size+'px'
  }
  var item = $('<div class="item" data-number="'+ this.number +'">'+ this.number +'</div>');
  //var item = $('<div class="item" data-number="'+ this.number +'"></div>');
  item.css(style);

  if (this.pos.current == true) {
    
    item.addClass('current');
  }

  $('#catrun').append(item);
}




function carCatch(row,col) {
  this.row = row; //行
  this.col = col; //列
  this.blocklist = [];
  this.getroot = [];
  this.toblock = "";
  this.formblock = "";
  this.lastCount = 12;
  this.proCount = 0; 
  this.proCountEnd = 1000; //执行的最大量后释放内存,原来电脑也需要休息的
  this.baseRoot = []; 
  this.currentPos = Math.floor(row/2).toString() + Math.floor(col/2).toString();
  this.bdMap(this.row,this.col);

  this.currentBlock = this.blocklist[this.currentPos];

}

carCatch.prototype.bdMap = function  (row, col) {  //建立地图
  for (var i = 0;  i < row ; i++) {
    for (var n = 0;  n < col ; n++) {
      var number = i.toString() + n.toString();
      var point = [];
      var pos = {};      

      if (i % 2 == 0) {

        point[0] = ((n == 0) ? "-1" : i.toString() +  (n - 1).toString());
        point[1] = ((n == 0) ? "-1" : ((i==0)? "-1" : (i - 1).toString() + (n-1).toString()));
        point[2] = ((i == 0) ? "-1" :  (((i - 1).toString() + n.toString())));
        point[3] = ((n == (col-1)) ? "-1" : (i.toString() + (n + 1).toString()));
        point[4] = ((i == (row - 1)) ? "-1" :  (i + 1).toString() + n.toString());
        point[5] = ((i == (row - 1)) ? "-1" : ((n==0) ? "-1" : ((i + 1).toString() + (n-1).toString())));

        
      }else {        
        point[0] = ((n == 0) ? "-1" : i.toString() + (n - 1).toString());
        point[1] = ((i == 0) ? "-1" : (i - 1).toString() + n.toString());
        point[2] = ((i == 0) ? "-1" :  ((n == (col-1)) ? "-1" : ((i - 1).toString() + (n + 1).toString())));
        point[3] = ((n == (col-1)) ? "-1" : (i.toString() + (n + 1).toString()));
        point[4] = ((i == (row - 1)) ? "-1" :  ((n == (col - 1)) ? "-1" : (i + 1).toString() + (n + 1).toString()));
        point[5] = ((i == (row - 1)) ? "-1" : ((i + 1).toString() + n.toString()));
      }

      pos.x = i;
      pos.y = n;
      pos.current = false;
      
      //console.log((i.toString() + n.toString()),this.currentPos);
      if ((i.toString() + n.toString()) == this.currentPos) {
        pos.current = true;
      }



      var bdBlock = new Block(number,point,pos);
      this.blocklist.push(bdBlock);
    }
  }
  this.blocklist = toObject(this.blocklist); 
  
  
  //console.log(this.blocklist);

  function toObject(o) { //数组转化为obj
    var obj = {};
    for(var i in o){
      obj[o[i].number] = o[i];
    }      
    return obj;
  }

}

carCatch.prototype.searchBlock = function  () { 
  //return
  this.getroot.push(this.currentBlock.number);
  this.checkBlock(this.currentBlock);
}

carCatch.prototype.randomStopBlock = function  (count) {
  
  for (var i = 0;  i<count ; i++) {
    var getrow = Math.floor(this.row * Math.random()).toString();
    var getcol = Math.floor(this.col * Math.random()).toString();
    var number = getrow + getcol;
    this.setStopBlock(number);

  }
  
}


carCatch.prototype.setStopBlock = function  (number) {
  var stopBlock = this.blocklist[number];

  if (stopBlock.pos.current == true) {
    return;
  }

  stopBlock.close = true;
  $('[data-number="'+ number +'"]').addClass('stop');
}



carCatch.prototype.checkBlock = function  (ckBlock) {
  var $this = this;
  this.proCount++;

  ckBlock.check = true;
  var moveltr = "";
  var currentBlock = this.currentBlock;
  var getVal;
  
 
  if (ckBlock.close == true) {
    this.getroot.splice(this.getroot.indexOf(ckBlock.number));
    this.checkRoot(this.getroot);
    return
  }
  


  
  if (ckBlock.point.indexOf("-1") < 0) {
    getVal = ckBlock.ckPoint.shift();


    if (this.blocklist[getVal].check != true && (ckBlock.ckPointRoot.indexOf(getVal) < 0)) {

      this.getroot.push(getVal);
      ckBlock.ckPointRoot.push(getVal);


      if (this.lastCount <= this.getroot.length) {
        var item = this.getroot.splice(this.lastCount - 1);   
        return this.checkRoot(this.getroot);
      }
      
      //$this.checkBlock($this.blocklist[getVal]);



      if (this.proCount > this.proCountEnd) {
       this.proCount = 0;       
       setTimeout(
         function(){
          return $this.checkBlock($this.blocklist[getVal]);
         }, 10)       
       }else {
         return $this.checkBlock($this.blocklist[getVal]);       
       }


    }else {
      

      if (ckBlock.ckPoint.length > 0) {
        return this.checkBlock(ckBlock);
      } else {     
        var item = this.getroot.pop();  
        this.blocklist[item].ckPointReset();
        this.checkRoot(this.getroot);
      }

    }
    
  } else {   

    this.getroot.push("end");
    this.baseRoot = this.getroot.slice(0);
    this.lastCount = (this.lastCount > this.getroot.length)? (this.getroot.length - 1)  : (this.lastCount - 1);
    console.log(this.getroot);
    ckBlock.ckPointReset();
    this.checkRoot(this.getroot);    

  }
}

carCatch.prototype.checkRoot = function  (root) {
  
  if (root.length < 1) {
    //console.log(this.blocklist);  
    if (this.baseRoot.length == 0) {
      console.log('没有最佳路径,已经被堵住了');
      alert('恭喜你赢了');
      return
    }else {
      console.log('检查完成,最短路径之一:' + this.baseRoot);      
    }
    //this.baseRoot = [];
    this.lastCount = 12;
    console.log(this.currentBlock);
    this.moveBlock();

    return;
  }

  var item = root[(root.length-1)];

  
 // console.log(item,this.blocklist[item]);
    
  //console.log(item,this.blocklist[item]);
  if (item != "end" && this.blocklist[item].point.indexOf("-1") < 0) {

    if (this.blocklist[item].ckPoint.length > 0) {
      this.checkBlock(this.blocklist[item]);
    }else {
      this.blocklist[item].ckPointReset();

      root.pop();
      this.checkRoot(root);        
    }
  }else {
    root.pop();
    this.checkRoot(root);
  }
}

carCatch.prototype.resetCurrentPos = function  (number) {
  var prevCurrentPos = this.currentPos;
  this.blocklist[prevCurrentPos].pos.current = false;

  $('[data-number="'+ prevCurrentPos +'"]').removeClass('current');

  this.currentPos = number;
  this.currentBlock = this.blocklist[number];
  this.currentBlock.pos.current = true;

  $('[data-number="'+ number +'"]').addClass('current');

}

carCatch.prototype.moveBlock = function  () {  
  var getPos = this.baseRoot[1];
  console.log(getPos);
  this.resetCurrentPos(getPos);

  this.baseRoot = [];

  if (this.blocklist[getPos].point.indexOf('-1') > -1) {
    alert('你输了');
  }


}


var carCatch1 = new carCatch(12,12);



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

var getCurrent = Math.floor(carCatch1.row/2).toString() + Math.floor(carCatch1.col/2).toString() ;

carCatch1.resetCurrentPos(getCurrent);
carCatch1.randomStopBlock(10);


//carCatch1.setStopBlock("12");


//carCatch1.searchBlock();

$('#catrun').on('click', '.item',function  () {
  var getNumber = $(this).data('number');
  carCatch1.setStopBlock(getNumber);

  carCatch1.searchBlock();
})




