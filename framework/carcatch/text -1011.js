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
    'position' : 'absolute'
  }
  var item = $('<div class="item" data-number="'+ this.number +'"></div>');
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
  this.proCountEnd = 3000; //执行的最大量后释放内存,原来电脑也需要休息的
  this.baseRoot = []; 
  this.currentPos = Math.floor(row/2).toString() + Math.floor(col/2).toString();
  this.bdMap(this.row,this.col);

  console.log(this.currentPos);
}

carCatch.prototype.bdMap = function  (row, col) {  //建立地图
  for (var i = 0;  i < row ; i++) {
    for (var n = 0;  n < col ; n++) {
      var number = i.toString() + n.toString();
      var point = [];
      var pos = {};      

      if (i % 2 == 0) {

        point[0] = ((n == 0) ? "-1" : i.toString() + (n - 1).toString());
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
  
  
  console.log(this.blocklist);

  function toObject(o) { //数组转化为obj
    var obj = {};
    for(var i in o){
      obj[o[i].number] = o[i];
    }      
    return obj;
  }

}

carCatch.prototype.searchBlock = function  (formnumber, tonumber) {
  var startblock = this.blocklist[formnumber];
  var toblock = this.blocklist[tonumber];

  if (toblock == undefined) {
    alert('找不到区域' + tonumber);
    return
  }

  this.formblock = startblock; 
  this.toblock = toblock; 

  toblock.stact = "end";

  this.getroot.push(startblock.number);
  this.checkBlock(startblock);
}



carCatch.prototype.checkBlock = function  (ckBlock) {
  var $this = this;
  this.proCount++;

  var $this = this;
  ckBlock.check = true;
  var getVal = ckBlock.ckPoint.shift();
 
  //console.log(getVal);

  if ((getVal != -1) && this.blocklist[getVal].check != true && (ckBlock.ckPointRoot.indexOf(getVal) < 0)) {
    
    this.getroot.push(getVal);

    ckBlock.ckPointRoot.push(getVal);
    

    if (this.lastCount <= this.getroot.length) {
      var item = this.getroot.splice(this.lastCount - 1);
      //console.log(this.getroot,this.lastCount);
      //console.log(this.getroot,item);      
      return this.checkRoot(this.getroot);
    }

    

    //console.log(this.lastCount,this.getroot.length);

    if ((this.blocklist[getVal].stact != "end")) {
              
      //getroot.push(getVal);

      if (ckBlock.close == true) {
        this.getroot.splice(this.getroot.indexOf(ckBlock.number));
        this.checkRoot(this.getroot);        
        return
      }
      //console.log(this.getroot);  


      if (this.proCount > this.proCountEnd) {
       this.proCount = 0;       
       setTimeout(
         function(){
           $this.checkBlock($this.blocklist[getVal]);
           //$this.checkRoot($this.getroot);
         }, 10)       
       }else {
         $this.checkBlock($this.blocklist[getVal]);       
       }

      
      
    }else {                      
      this.getroot.push("end");   
      this.baseRoot = this.getroot.slice(0);
      this.lastCount = (this.lastCount > this.getroot.length)? (this.getroot.length-1)  : (this.lastCount-1);
      console.log(this.getroot);
      return this.checkRoot(this.getroot);
      
    }
  } else {        

    if (ckBlock.ckPoint.length > 0) {
      return this.checkBlock(ckBlock);
    }else {     
      var item = this.getroot.pop();  
      this.blocklist[item].ckPointReset();
      return this.checkRoot(this.getroot);
    }
  }
}

carCatch.prototype.checkRoot = function  (root) {

  if (root.length < 1) {
    //console.log(this.blocklist);  
    if (this.baseRoot.length == 0) {
      console.log('没有最佳路径,已经被堵住了');
      
    }else {
      console.log('检查完成,最短路径之一:' + this.baseRoot);      
    }
    return;
  }

  var item = root[(root.length-1)];

  if ((item != "end") && (item != this.toblock.number)) {

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

//carCatch1.searchBlock("22","00");


