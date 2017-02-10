//节点
function Node() {
  this.data = "empty";
  this.point = [];
  this.id = "empty";
}

//构建树
function Tree() {
  this.head = null;
  this.totleStep = 0; //深度
}


//获取某处的节点
Tree.prototype.getNode = function (step,count) {
  return 
}


//添加节点
Tree.prototype.addChidren = function (node, parentNode) {
  if (this.head == null) {
    this.head = node;
    node.step = this.step = 1;
    return 
  }

  if (parentNode) {
    node.step = parentNode.step + 1;
    parentNode.point.push(node);
  } else {
    console.log('请先输入父节点');
  }
}

//删除子节点
Tree.prototype.delChidren = function (node) {
  if (node.point.length > 0) {
    for (var i = 0; i < node.point.length; i++) {
      delete node;
    }
  }
  delete node;
}

//移动节点
Tree.prototype.moveChidren = function (node, moveToNode) {
  moveToNode.point.push(node);
}

//从上到下遍历树
Tree.prototype.outPutUpDown = function () {
  var treeNodes = [];
  
}

//获取父节下的全部子节点
Tree.prototype.getChirenNode = function (node) {
  var nodes = [];
  for (var i = 0; i < node.point.length; i++) {
    var element = node[point.length];
    nodes.push(element);
  }

  return nodes;
}

//从左到右遍历树
Tree.prototype.outPutLtr = function () {

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