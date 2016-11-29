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
  this.isClose = false;
  this.lastCount = 12;
  this.proCount = 0; 
  this.proCountEnd = 1000; //执行的最大量后释放内存,原来电脑也需要休息的
  this.baseRoot = []; 
  this.baseLongRoot = [];
  this.currentPos = Math.floor(row/2).toString() + '-' + Math.floor(col/2).toString();
  this.bdMap(this.row,this.col);

  

  this.currentBlock = this.blocklist[this.currentPos];

}

carCatch.prototype.bdMap = function  (row, col) {  //建立地图
  for (var i = 0;  i < row ; i++) {
    for (var n = 0;  n < col ; n++) {
      var number = i.toString() + '-' + n.toString();
      var point = [];
      var pos = {};      

      if (i % 2 == 0) {

        point[0] = ((n == 0) ? "-1" : i.toString() + '-' +  (n - 1).toString());
        point[1] = ((n == 0) ? "-1" : ((i==0)? "-1" : (i - 1).toString() + '-' + (n-1).toString()));
        point[2] = ((i == 0) ? "-1" :  (((i - 1).toString() + '-' + n.toString())));
        point[3] = ((n == (col-1)) ? "-1" : (i.toString() + '-' + (n + 1).toString()));
        point[4] = ((i == (row - 1)) ? "-1" :  (i + 1).toString() + '-' + n.toString());
        point[5] = ((i == (row - 1)) ? "-1" : ((n==0) ? "-1" : ((i + 1).toString() + '-' + (n-1).toString())));

        
      }else {        
        point[0] = ((n == 0) ? "-1" : i.toString() + '-' + (n - 1).toString());
        point[1] = ((i == 0) ? "-1" : (i - 1).toString() + '-' + n.toString());
        point[2] = ((i == 0) ? "-1" :  ((n == (col-1)) ? "-1" : ((i - 1).toString() + '-' + (n + 1).toString())));
        point[3] = ((n == (col-1)) ? "-1" : (i.toString() + '-' + (n + 1).toString()));
        point[4] = ((i == (row - 1)) ? "-1" :  ((n == (col - 1)) ? "-1" : (i + 1).toString() + '-' + (n + 1).toString()));
        point[5] = ((i == (row - 1)) ? "-1" : ((i + 1).toString() + '-' + n.toString()));
      }

      pos.x = i;
      pos.y = n;
      pos.current = false;
      
      //console.log((i.toString() + n.toString()),this.currentPos);
      if ((i.toString() + '-' + n.toString()) == this.currentPos) {
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

  //检查是否结束了
  var ifClose = 0;
  for (var i = 0;  i<this.currentBlock.point.length ; i++) {
    if (this.blocklist[this.currentBlock.point[i]].close == true) {
      ifClose++;
    }
  }

  if (ifClose > 5) {
    alert('恭喜你赢了');
    return
  }
  

  this.getroot.push(this.currentBlock.number);
  this.checkBlock(this.currentBlock);    
}

carCatch.prototype.randomStopBlock = function  (count) {
  
  for (var i = 0;  i<count ; i++) {
    var getrow = Math.floor(this.row * Math.random()).toString();
    var getcol = Math.floor(this.col * Math.random()).toString();
    var number = getrow + '-' + getcol;
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


carCatch.prototype.checkBlockClose = function  (ckBlock) {  //最长路径算法

  var $this = this;
  this.proCount++;

  var getVal;

  
   
  if (ckBlock.close == true) {    
    this.getroot.splice(this.getroot.indexOf(ckBlock.number));
    this.checkRoot(this.getroot);
    return
  }



  




  
  if (ckBlock.ckPoint.length > 0 && (this.getroot.length < 4)) {
    ckBlock.check = true;
   
    getVal = ckBlock.ckPoint.shift();


    var ifRepeat = 0; //check if repeat
    var getValBlock = this.blocklist[getVal];

    if (getValBlock.point.indexOf("-1") > -1) {
      this.checkRoot(this.getroot);
      return            
    }
        
    for (var i = 0;  i<getValBlock.point.length ; i++) {     
      if ((this.blocklist[getValBlock.point[i]].check == true)) {
        ifRepeat++;
      }
    }

    if (ifRepeat > 1) {
     this.checkRoot(this.getroot);
     return      
    }



    if (this.blocklist[getVal].check != true) {
      this.getroot.push(getVal);
      ckBlock.ckPointRoot.push(getVal);
      if (this.getroot.length > this.baseLongRoot.length) {
         this.baseLongRoot = this.getroot.slice(0);
      }
    } else {
      this.checkRoot(this.getroot);
      return
    }

  
    if (this.proCount > this.proCountEnd) {
     this.proCount = 0;       
     setTimeout(
       function(){
        return $this.checkBlockClose($this.blocklist[getVal]);
       }, 10)       
     }else {
       return $this.checkBlockClose($this.blocklist[getVal]);       
     }

   } else {

    
   
     this.getroot.push("end");
     //this.baseLongRoot = this.getroot.slice(0);
     //this.lastCount = (this.lastCount > this.getroot.length)? (this.getroot.length - 1)  : (this.lastCount - 1);
     //this.lastCount = (this.lastCount > this.getroot.length)? (this.getroot.length)  : (this.lastCount);

     if (this.getroot.length > this.baseLongRoot.length) {
        this.baseLongRoot = this.getroot.slice(0);
     }     

 

     console.log(this.getroot);   
     

     this.getroot.pop();
     this.getroot.pop();
     this.checkRoot(this.getroot); 

   }

}

carCatch.prototype.checkBlock = function  (ckBlock) {  //最短路径算法

  if (this.isClose == true) {
    return this.checkBlockClose(ckBlock);
  }



  var $this = this;
  this.proCount++;

  var getVal;
  
 
  if (ckBlock.close == true) {
    this.getroot.splice(this.getroot.indexOf(ckBlock.number));
    this.checkRoot(this.getroot);
    return
  }
  
  
  ckBlock.check = true;



  
  if (ckBlock.point.indexOf("-1") < 0) {

    var ifRepeat = 0;

    
    for (var i = 0;  i<ckBlock.point.length ; i++) {
      if (this.blocklist[ckBlock.point[i]].check == true) {
        ifRepeat++;
      }
    }

    if (ifRepeat > 1) {
      ckBlock.check = false;
      this.getroot.splice(this.getroot.indexOf(ckBlock.number));
      //console.log(this.getroot,ckBlock);
      this.checkRoot(this.getroot);
      return
    }   


    getVal = ckBlock.ckPoint.shift();
    

    if (this.blocklist[getVal].check != true && (ckBlock.ckPointRoot.indexOf(getVal) < 0)) {

      this.getroot.push(getVal);
      ckBlock.ckPointRoot.push(getVal);


      if (this.lastCount <= this.getroot.length) {
        var item = this.getroot.splice(this.lastCount - 1);   
        return this.checkRoot(this.getroot);
      }
      
      
     

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
    //this.lastCount = (this.lastCount > this.getroot.length)? (this.getroot.length)  : (this.lastCount);
    console.log(this.getroot);
    ckBlock.ckPointReset();
    this.checkRoot(this.getroot);    

  }
}

carCatch.prototype.checkRoot = function  (root) {

  if (this.baseLongRoot.length > 5 && this.isClose == true) {
    return this.moveBlock();
  }


  if (root.length < 1) {

    if (this.isClose == true) {
      return this.moveBlock();
    }    

    //console.log(this.blocklist);  
    if (this.baseRoot.length == 0) {

      console.log('没有最佳路径,已经被堵住了');
      //alert('恭喜你赢了');
      this.isClose = true;

      this.searchBlock();

      return
    }else {
      console.log('检查完成,最短路径之一:' + this.baseRoot);
    }
    //this.baseRoot = [];
    this.lastCount = 12;
    
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

  if (this.isClose == true) {
    var getPos = this.baseLongRoot[1];
    
    this.resetCurrentPos(getPos);
    this.baseLongRoot = [];    

  }else {

    var getPos = this.baseRoot[1];
    
    this.resetCurrentPos(getPos);

    this.baseRoot = [];

    if (this.blocklist[getPos].point.indexOf('-1') > -1) {
      alert('你输了');
    }

  }




}


var carCatch1 = new carCatch(9,9);



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

var getCurrent = Math.floor(carCatch1.row/2).toString() + '-' + Math.floor(carCatch1.col/2).toString() ;

carCatch1.resetCurrentPos(getCurrent);
//carCatch1.randomStopBlock(20);


//var stoparr = ["2-1","3-0","4-0","5-0","6-1","2-2","2-3","2-4","2-5","2-6","2-7","3-7","4-7","5-7","6-7","6-6","6-5","6-4","6-3","6-2"];

//for (var i = 0;  i<stoparr.length ; i++) {
  //carCatch1.setStopBlock(stoparr[i]);
//}

//carCatch1.isClose = true;



//carCatch1.searchBlock();

$('#catrun').on('click', '.item',function  () {
  if ($(this).hasClass('current')) {
    return
  }
  var getNumber = $(this).data('number');
  carCatch1.setStopBlock(getNumber);
  carCatch1.searchBlock();
})




