//view屏幕视图
class Screen {
  constructor(obj, x, y) {
    this.obj = obj;
    this.ctx = obj.getContext('2d');
    this.width = x;
    this.height = y;
    this.build();
  }

  static methor(x) { //静态类方法，直接调用
    console.log(this);
  }

  build() { //普通类方法
    this.obj.width = this.width;
    this.obj.height = this.height;
  }

  reset() {
    this.build();
  }
}

//建立canvas屏幕
//let screen1 = new Screen(document.getElementById('canvas'), 600, 600);


//建立地图
class Map {
  constructor(obj, x, y) {
    obj.width = x;
    obj.height = y;
    obj.reset();
    this.draw(obj, x, y);
  }
  draw(obj, x, y) {
    //绘制下边的地图
    let ctx = obj.ctx;
    ctx.beginPath();
    ctx.arc(0, y, x * 0.2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "#f60";
    ctx.fill();


    function draw() {

    }

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#555";
    ctx.stroke();


    ctx.moveTo(x * 0.07, y * 0.2);
    ctx.lineTo(x * 0.07, y * 0.76);
    ctx.lineTo(x * 0.13, y * 0.8);
    ctx.lineTo(x * 0.38, y * 0.529);
    ctx.lineTo(x * 0.07, y * 0.2);
    ctx.closePath();
    //    ctx.arcTo(x*0.15, y*0.78, x*0.21, y*1.7,30);
    ctx.strokeStyle = "#555";
    ctx.fillStyle = "#666";
    ctx.stroke();
    ctx.fill();

    ctx.restore();

    ctx.save();

    //    ctx.arc(x,y,x*0.2,0,Math.PI*2);
    //    ctx.fillStyle ="red";

    //    ctx.fill();

    return false;


    ctx.translate(400, 0);
    ctx.scale(-1, 1);
    //    ctx.translate(150,0);
    ctx.rotate((Math.PI / 180) * 0);
    ctx.setTransform(m11, m12, m21, m22, dx, dy);
    //    ctx.translate(-750,300);
    ctx.drawImage(obj.obj, 0, 0);
    ctx.restore();







  }
}

//let mapBig = new Map(screen1, 800, 800);



function draw5(id) {
  var canvas = document.getElementById(id);
  if (canvas == null)
    return false;


  var context = canvas.getContext("2d");
  context.save(); //保存了当前context的状态
  context.fillStyle = "#EEEEFF";
  context.fillRect(0, 0, 400, 300);

  context.fillStyle = "rgba(255,0,0,0.1)";
  //平移 缩放 旋转  1 2 3        
  context.translate(100, 100);
  context.scale(0.5, 0.5);
  context.rotate((Math.PI / 180) * 60);
  context.fillRect(0, 0, 100, 100);


  context.restore(); //恢复到刚刚保存的状态,保存恢复只能使用一次
  context.save(); //保存了当前context的状态
  context.fillStyle = "rgba(255,0,0,0.2)";
  //平移 旋转 缩放 1 3 2
  context.translate(100, 100);
  context.rotate(Math.PI / 4);
  context.scale(0.5, 0.5);
  context.fillRect(0, 0, 100, 100);

  context.restore(); //恢复到刚刚保存的状态
  context.save(); //保存了当前context的状态
  context.fillStyle = "rgba(255,0,0,0.3)";
  //缩放 平移 旋转 2 1 3 
  context.scale(0.5, 0.5);
  context.translate(100, 100);
  context.rotate(Math.PI / 4);
  context.fillRect(0, 0, 100, 100);

  context.restore(); //恢复到刚刚保存的状态
  context.save(); //保存了当前context的状态
  context.fillStyle = "rgba(255,0,0,0.4)";
  //缩放 旋转 平移  2 3  1 
  context.scale(0.5, 0.5);
  context.rotate(Math.PI / 4);
  context.translate(100, 100);
  context.fillRect(0, 0, 100, 100);

  context.restore(); //恢复到刚刚保存的状态
  context.save(); //保存了当前context的状态
  context.fillStyle = "rgba(255,0,0,0.5)";
  //旋转 平移 缩放  3 1 2 
  context.rotate(Math.PI / 4);
  context.translate(100, 100);
  context.scale(0.5, 0.5);
  context.fillRect(0, 0, 100, 100);

  context.restore(); //恢复到刚刚保存的状态
  context.save(); //保存了当前context的状态
  context.fillStyle = "rgba(255,0,0,1)";
  //旋转 缩放 平移   3 2 1 
  context.rotate(Math.PI / 4);
  context.scale(0.5, 0.5);
  context.translate(100, 100);
  context.fillRect(0, 0, 100, 100);

  //实验表明应该移动的是坐标轴
  //实验表明缩放的是坐标轴比例
  //实验表明旋转的是坐标轴
  //综合上述，因此平移 缩放 旋转 三者的顺序不同都将画出不同的结果
}

draw5('canvas')