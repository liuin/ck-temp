//节点
function Node(data, id) {
  this.data = data || "empty";
  this.point = [];
  this.id = id || "empty";
}

//清空节点
Node.prototype.reset = function () {
  this.data = null;
  this.point = null;
  this.id = null;
}

//图
function Graph() {
  this.head = null;
}

//添加节点
Graph.prototype.addNode = function (node, arrNodeLink) {
  if (this.head == null) {
    this.head = node;
    return
  }

  if (arrNodeLink) {
    for (var i = 0; i < arrNodeLink.length; i++) {
      var element = arrNodeLink[i];
      element.point.push(node);
    }
  } else {
    console.log('请先输入父节点');
  }
}

//删除节点
Graph.prototype.delNode = function (node) {
  for (var i = 0; i < node.point.length; i++) {
    var element = node.point[i];
    for (var n = 0; n < element.point.length; n++) {
      var element1 = element.point[n];
      if (element1.id == node.id) {
        element1.point.splice(element, 1);
      }
    }
  }

  node.reset();
}

//遍历图(从某个节点开始)
Graph.prototype.print = function (node) {

  var node = node || this.head;

  var nodes = arguments[1] || [];
  if (!arguments[1]) {
    nodes.push(this.head);
  }

  for (var i = 0; i < node.point.length; i++) {
    var element = node.point[i];
    if (!element.hasCheck) {
      nodes.push(element);
      element.hasCheck = true;      
      if (element.point.length > 0) {
        this.print(element, nodes);
      }      
    }
  }

  return nodes;
}

//清空图
Graph.clear = function () {
  this.head = null;
}

var graph1 = new Graph();
var node1 = new Node();
node1.id = "1";
node1.data = "head";

var node2 = new Node();
node2.id = "2";
node2.data = "data2";

var node3 = new Node();
node3.id = "3";
node3.data = "data3";

var node4 = new Node();
node4.id = "4";
node4.data = "data4";

var node5 = new Node();
node5.id = "5";
node5.data = "data5";

graph1.addNode(node1);
graph1.addNode(node2,[node1]);
graph1.addNode(node3,[node1,node2]);