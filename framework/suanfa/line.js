//线性表
function Line() {
  this.data = [];
  this.top = 0;
  this.end = 0;
  this.kkid = 0;
}

Line.prototype.in = function(str) {
  this.data.push(str);
  this.end++;
}

Line.prototype.get = function() {}

Line.prototype.find = function() {}

Line.prototype.out = function() {
  var out = this.data[this.end];
  this.end--;
  this.data.length = this.end;
}
