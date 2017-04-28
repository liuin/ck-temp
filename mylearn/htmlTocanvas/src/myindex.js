var utils = require('./basetoarraybuffer');

var cv1 = document.getElementById('canvas1');
var ctx = cv1.getContext('2d');
ctx.fillStyle = "#f00";
ctx.fillRect(0, 0, 50, 50);

var imageData = ctx.getImageData(0, 0, 50, 50);

for (var i = 0; i < 5000; i += 4) {
  imageData.data[i + 3] = 100;
}
ctx.putImageData(imageData, 0, 0);

var base64 = cv1.toDataURL("image/jpeg");



//var base64in = '4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAyADIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8+qKKK+SP6FCiiigAooooAKKKKACiva/+Ef0H/oCWH/gMn+FH/CP6D/0BLD/wGT/CvA/t6n/Iz9a/4hLjf+giP3M8Uor2v/hH9B/6Alh/4DJ/hR/wj+g/9ASw/wDAZP8ACj+3qf8AIw/4hLjf+giP3M8Uor2v/hH9B/6Alh/4DJ/hR/wj+g/9ASw/8Bk/wo/t6n/Iw/4hLjf+giP3M8Uor2v/AIR/Qf8AoCWH/gMn+FFH9vU/5GH/ABCXG/8AQRH7mX6KKK+YP3QKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z';

//console.log(base64);
//判断是中文
var s = '中文';
console.log(s.match(/[\u4e00-\u9fa5]$/g));

console.log(new RegExp(/[\u4e00-\u9fa5]/g).test('中文'));



var base64Array = utils.decode(base64);

//Int8Array：8位有符号整数，长度1个字节。
//Uint8Array：8位无符号整数，长度1个字节。
//Int16Array：16位有符号整数，长度2个字节。
//Uint16Array：16位无符号整数，长度2个字节。
//Int32Array：32位有符号整数，长度4个字节。
//Uint32Array：32位无符号整数，长度4个字节。
//Float32Array：32位浮点数，长度4个字节。
//Float64Array：64位浮点数，长度8个字节。

//console.log(base64Array);


//img = new Image(); 
//img.src = "img.jpg";