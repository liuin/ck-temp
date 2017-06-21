//队列
function Line() {
  this.data = [];
  this.top = 0;
  this.end = 0;
}

Line.prototype.in = function(str) {
  this.data[this.end] = str;
  this.end++;
}

Line.prototype.out = function() {
  var val = this.data[this.top];
  if (val == undefined) {
    return "empty";
  }
  this.data[this.top] = undefined;
  this.top++;
  return val;
}

Line.prototype.clear = function() {
  this.data.length = 0;
  this.top = 0;
  this.end = 0;
}

Line.prototype.length = function() {
  return this.end - this.top;
}

var line1 = new Line();
