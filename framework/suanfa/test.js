//数组操作

//reduce用法
function add(runningTotal, currentValue) {
   //console.log(arguments);
   return runningTotal + currentValue; 
}
 
var nums = [1,2,3,4,5,6,7,8,9,10,11];
var sum = nums.reduce(add);
//console.log(sum); // 显示 55

//reduceRight
function concat(accumulatedString, item) { 
   return accumulatedString + item; 
} 
 
var words = ["the ", "quick ","brown ", "fox "]; 
var sentence = words.reduceRight(concat); 
//console.log(sentence);


//newgrades
function curve(grade) { 
   return grade += 5; 
} 
 
var grades = [77, 65, 81, 92, 83]; 
var newgrades = grades.map(curve); 

//map
function first(word) { 
   return word[0]; 
}
var words = ["for","your","information"]; 
var acronym = words.map(first); 


//filter 过滤
function passing(num) { 
   return num >= 60; 
} 

var grades = []; 
for (var i = 0; i < 20; ++i) { 
   grades[i] = Math.floor(Math.random() * 101); 
} 
var passGrades = grades.filter(passing); 

//创建二维数组
Array.prototype.matrix = function(numrows, numcols, initial) {  //行.列 ,默认值
   var arr = []; 
   for (var i = 0; i < numrows; ++i) { 
      var columns = []; 
      for (var j = 0; j < numcols; ++j) { 
         columns[j] = initial; 
      } 
   arr[i] = columns; 
   }    
   return arr; 
}

var k = [];
k = k.matrix(3,4,5);


//列表
function List() { 
   this.listSize = 0; 
   this.pos = 0; 
   this.dataStore = []; // 初始化一个空数组来保存列表元素 
   this.clear = clear; 
   this.find = find; 
   this.toString = toString; 
   this.insert = insert; 
   this.append = append; 
   this.remove = remove; 
   this.front = front; 
   this.end = end; 
   this.prev = prev; 
   this.next = next; 
   this.length = length; 
   this.currPos = currPos; 
   this.moveTo = moveTo; 
   this.getElement = getElement; 
   this.length = length; 
   this.contains = contains;
}

function append(element) { 
   this.dataStore[this.listSize++] = element; 
}


function length() { 
   return this.listSize; 
}
