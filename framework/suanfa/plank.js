//栈
function Plank() {
  this.data = [];
  this.top = 0;
}

Plank.prototype.in = function(str) {
  this.data[this.top] = str;
  this.top++;
};

Plank.prototype.out = function() {
  var val = this.data[this.top - 1];
  if (val == undefined) {
    return "empty";
  }
  this.top--;
  this.data.length = this.top;
  return val;
};

Plank.prototype.clear = function() {
  this.data.length = 0;
  this.top = 0;
}
