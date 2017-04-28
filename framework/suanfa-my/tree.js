//节点
function Node(data,id) {
  this.data = data || "empty";
  this.point = [];
  this.id = id || "empty";
}
//清空节点
Node.prototype.reset = function () {
  this.data = null;
  this.point = null;
  this.id = null;
  this.parentNode = null;
}

//构建树
function Tree() {
  this.head = null;
  this.totleStep = 0; //深度
}


//添加节点
Tree.prototype.addChidren = function (node, parentNode) {
  if (this.head == null) {
    this.head = node;
    // node.step = this.step = 1;
    return 
  }

  if (parentNode) {
    // node.step = parentNode.step + 1;
    node.parentNode = parentNode;
    parentNode.point.push(node);
  } else {
    console.log('请先输入父节点');
  }
}

//删除子节点
Tree.prototype.delChidren = function (node) {
  // debugger;
  if (node.parentNode != undefined) {
    for (var i = 0; i < node.parentNode.point.length; i++) {
      var element = node.parentNode.point[i];
      if (element.id == node.id) {
        node.parentNode.point.splice(element,1);
      }
    }
  } 
  if (node.point.length > 0) {
    for (var i = 0; i < node.point.length; i++) {
      node.point[i].reset();
    }
  }
  node.reset();
  return console.log('删除节点成功');
}



//移动节点
Tree.prototype.moveChidren = function (node, moveToNode) {
  moveToNode.point.push(node);
}

//从遍历树
Tree.prototype.outPutUpDown = function () {
  var treeNodes = [];
  
}

//获取父节下的全部子节点
Tree.prototype.getChirenNode = function (node) {
  var nodes = arguments[1] || [];
  if (!arguments[1]) {    
    nodes.push(this.head);
  }

  for (var i = 0; i < node.point.length; i++) {
    var element = node.point[i];
    // console.log(element, element.point.length);
    nodes.push(element);
    if (element.point.length > 0) {
      this.getChirenNode(element, nodes);
    }
  }

  return nodes;
}

//树排列(小的在左边,大的在右边)
Tree.prototype.sort = function () {

}

//打印当前树
Tree.prototype.print = function (lrt) {
  var lrt = lrt || 'upDown';
  switch (lrt) {
    case "upDown":
      
      break;
  
    default:
      break;
  }
}


//清空树
Tree.prototype.empty = function () {
  this.head = null;
  this.totleStep = 0;
}

var tree1 = new Tree();
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

tree1.addChidren(node1);
tree1.addChidren(node2,node1);
tree1.addChidren(node3,node1);
tree1.addChidren(node4,node2);
tree1.addChidren(node5,node2);