function Block(number, point) {
  this.number = number;
  this.point = point;
  this.check = false;
  this.stact = "empty";
  this.ckPoint = this.point.slice(0);
  this.ckPointRoot = [];
}

Block.prototype.ckPointReset = function  () {  
  var ckp = this.point.slice(0);
  this.ckPoint = ckp; 
}

var golabEnd = false; 

var blocklist = [];

var buildlist= [
  {
    "number":0,
    "point":[1,2,3,4,5,6]
  },
  {
    "number":1,
    "point":[0,2,6,-1,-1,-1]
  },
  {
    "number":2,
    "point":[0,1,3,7,-1,-1]
  },
  {
    "number":3,
    "point":[0,7,2,4,8,-1]
  },
  {
    "number":4,
    "point":[0,8,-1,3,5,-1]
  },
  {
    "number":5,
    "point":[0,6,-1,-1,4,-1]
  },
  {
    "number":6,
    "point":[0,-1,-1,1,5,-1]
  },
  {
    "number":7,
    "point":[2,3,-1,-1,-1,-1]
  },
  {
    "number":8,
    "point":[4,3,-1,1,-1,-1]
  }
];

for(var i in buildlist){
  blocklist[i] = new Block(buildlist[i].number,buildlist[i].point);
  //console.log(blocklist[i]);
}





function searchBlock(formnumber, tonumber ){
  var startblock = blocklist[formnumber];
  var toblock = blocklist[tonumber];
  toblock.stact = "end";

  var count = 0;

//  console.log(blocklist.length);
  var proCount = 0;
//  return
//  while(count < blocklist.length){
//    if(count != 0){
//      startblock.
//      
//    }
//    
//
//
//    count++;
//    
//  }

  var getroot = [];

  
  
//  for (var i = 0;  i< startblock.point.length ; i++) {
//    getroot[i] = [];
//    if (buildlist[startblock.point[i]].stact != "end") {     
//      getroot[i].push(buildlist[startblock.point[i]].number);
//      checkNext(buildlist[startblock.point[i]],getroot[i]);
//
//    }else {
//      getroot[i].push(buildlist[startblock.point[i]].number + " end");
//    }
//  }
  var count = 0;


 


  function checkBlock (ckBlock) {

    ckBlock.check = true;

    var getVal = ckBlock.ckPoint.shift();
   

   
    if ((getVal != -1) && blocklist[getVal].check != true && (ckBlock.ckPointRoot.indexOf(getVal) < 0)) { 
      
      getroot.push(getVal);

      ckBlock.ckPointRoot.push(getVal);

      if ((blocklist[getVal].stact != "end")) {
                
        //getroot.push(getVal);
        

        checkBlock(blocklist[getVal]);

      }else {
                        
        getroot.push("end");

        console.log(getroot);

        checkRoot(getroot);


      }

      
      
    } else {        
      //return
      //ckBlock.ckPointRoot.push(getVal);


      if (ckBlock.ckPoint.length > 0) {
        checkBlock(ckBlock);
      }else {

       

        var item = getroot.pop();
        
        blocklist[item].ckPointReset();

        blocklist[item].ckPointRoot = [];

        blocklist[item].check = false;

        checkRoot(getroot);
      }
    }
  }


  getroot.push(startblock.number);
  checkBlock(startblock);

  
  

  function checkRoot(root) {
    



    var item = root[(root.length-1)];
    
    if ((item != "end") && (item != toblock.number)) {

      
    if ((item == startblock.number) && (blocklist[startblock.number].ckPoint.length == 0) ) {      
      console.log('search end');
      golabEnd = true;
      return;        
    }
     

      
      
      for (var i = 0;  i<blocklist[item].ckPoint.length ; i++) {
        
        if (golabEnd == true) {
          break;
        }

      

        
        if (blocklist[item].ckPoint[i] > -1) {
          console.log(root,item,blocklist[item].ckPoint);
          checkBlock(blocklist[item]);
          break;  
        }

        

        if (i == (blocklist[item].ckPoint.length - 1)) {
          
          blocklist[item].ckPointReset();

          blocklist[item].ckPointRoot = [];

          blocklist[item].check = false;

          console.log(root,item,blocklist[item].ckPoint,blocklist[item].ckPointRoot);

          root.pop();
          checkRoot(root);
        }

      }

      
 
    }else {
      root.pop();
      checkRoot(root);
    }

  }


 // checkNext(startblock);

 
  
};



searchBlock(2,7);

