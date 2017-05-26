//stack
var Stack = function () {
  this.items = [];
  this.top = 0;
};

Object.defineProperty(Stack.prototype, 'length', {
  value: this.top
});

Stack.prototype.push = function (item) {
  this.items[this.top++] = item;
};

Stack.prototype.pop = function (item) {
  return this.items[--this.top];
};

Stack.prototype.peek = function (item) {
  return this.items[this.top-1];
};


//塔罗盘移动
var tlp = function (numb) {
  this.numb = numb;
  this.tlpA =[];
  this.tlpB =[];
  this.tlpC =[];
  this.tlpA.ind = 'A';
  this.tlpB.ind = 'B';
  this.tlpC.ind = 'C';

  for (var i = 0;  i<this.numb ; i++) {
    this.tlpA.push(i+1);
  }
  this.tCount(this.numb,this.tlpA,this.tlpB,this.tlpC);
};

tlp.prototype.tCount = function  (numb,tA,tB,tC) {
  if (numb == 1) {
    this.moveTo(numb,tA,tC);
  }else {       
    this.tCount(numb-1,tA,tC,tB);
    this.moveTo(numb,tA,tC);
    this.tCount(numb-1,tB,tA,tC);
  }
};


var Stack1 = new Stack();

tlp.prototype.moveTo = function  (numb,Ts,TsEnd) {
//  var numb = Tstart.shift();
//  Tend.splice(0,0,numb);
    console.log('number ' +numb+ ' form ' +Ts.ind + ' to ' + TsEnd.ind);    
//    Stack1.push('number ' +numb+ ' form ' +Ts.ind + ' to ' + TsEnd.ind);
}


var tlp1 = new tlp(2);


while (Stack1.top != 0) {
  var data = Stack1.pop();
//  console.log(data);
}

