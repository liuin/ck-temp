//单链表
function Node(data) {
  this.data = data;
  this.nextNode = undefined;
}


function Line() {
  this.head = new Node('head');
  this.length = 0;
}

Line.prototype.add = function(data, pos) { //在pos之后增加节点 如果没有pos 则在最后增加
  var node = new Node(data);
  if (this.length == 0) {
    this.head.nextNode = node;
  } else {
    var n;
    if (pos || (pos == 0)) {
      n = pos;
    } else {
      n = this.length;
    }
    var prevNode = this.getItem(n);
    var nextNode = prevNode.nextNode;
    prevNode.nextNode = node;
    node.nextNode = nextNode;
  }

  this.length++;

};

Line.prototype.getItem = function(pos) { //获取该节点的数据
  var curreNode = this.head;
  for (var i = 0; i <= pos; i++) {
    if (i == (pos)) {
      return curreNode;
    } else {
      curreNode = curreNode.nextNode;
    }
  }
};

Line.prototype.delItem = function(pos) { //删除该节点
  var prevNode = this.getItem(pos - 1);
  var node = prevNode.nextNode;
  var nextNode = node.nextNode;
  prevNode.nextNode = nextNode;
};

Line.prototype.clear = function() { //清空表
  this.length = 0;
  this.head = new Node('head');
};

Line.prototype.data = function() {
  var arr = [];
  var curreNode = this.head;
  for (var i = 0; i <= this.length; i++) {
    if (i != 0) {
      arr.push(curreNode.data);
    }
    curreNode = curreNode.nextNode;
  }
  return arr;
};

var line1 = new Line();
line1.add('one');
line1.add('two');
line1.add('three');
line1.add('tow-1', 3);
line1.add('tow-4', 3);

//line1.delItem(1);
console.log(line1.data());
