var beautify = require('js-beautify');
var formatertyle = "";
var fs = require('fs');
var exec = require('child_process').exec;
var request = require('request');
 
var options = process.argv;
formatertyle = beautify.js;

switch (options[2]) {
case 'js':
  formatertyle = beautify.js;
break
case 'css':
  formatertyle = beautify.css;
break
case 'html':
  formatertyle = beautify.html;
break
default:
}

//console.log(options[2]);

if (options[2] == 'php' || options[2] == 'phtml') {
  options[2] = 'html';
  formatertyle = beautify.html;
}


options[3] = options[3].replace(/\\/g,"\\\\")

//console.log(options[3]);

fs.readFile(options[3], 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
//    console.log(beautify.html(data, { indent_size: 2 }));
    var getDate = formatertyle(data, { indent_size: 2 });


      switch (options[2]) {
      case 'css':
        getDate = getDate.replace(/[\n|\r]/g, "");
        getDate = getDate.replace(/(\s{2,})/g, "");
        getDate = getDate.replace(/}/g, "}\n");
        getDate = getDate.replace(/}\n(\/\*)/g, "}\n\n$1");
        getDate = getDate.replace(/(\*\/)/g, "$1\n");
      break
      case 'html':
        
        

      break
      default:
      }

//    console.log(getDate);
//    var dadfe="fdsdfsf12121 3434344gfg gdfgdg";

    //由于Node.js仅支持如下编码：utf8, ucs2, ascii, binary, base64, hex
    fs.writeFile('copy.txt', getDate, 'ucs2', function (err) {
      if (err) throw err;
      console.log('写入完成');
      exec('clip<copy.txt',function  () {
        fs.unlink('copy.txt');      
      });
    });

//    fs.writeFileSync(options[3], getDate, function (err) {
//      if (err) throw err;
//      console.log('It\'s saved!');
//    });

});


 
// request({
//         method: 'POST',
//         uri:'E:\\xampp\\htdocs\\byd-1130\\index.phtml',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//             "loginname":"lixing1@0101005",
//             "pw":"aebc3ebee2f0c8b08b43d26c2b0055b19caeaf4a",
//             "res":"web"
//         })
//     }, function (err, result, body) {
//         console.log(body);
////         body = JSON.parse(body);
//         copyToClipboard(body, function (text, stdout) {
//             console.log('token copy successed!', text, stdout);
//         })
// });


  // 简单的复制文本到剪切板的函数，参数依次是文本，成功回调
//  var copyToClipboard = function(text, func) {
//      // 这种复制出来后最后有个换行符，不合要求
//      'echo ' + text + ' | clip';
//      // 这种复制出来最后有个空格，还将就
////      ' ${temp} 
////  clip < ${temp} 
////  del ${temp}
////  `;
////  // 这句加入批处理，会导致报错，虽然能执行(复制)成功。原因应该是，del批处理文件自身的时候，nodejs还在使用他
////  // 'del "%~f0"';
////      var cmdFile = 'ttzkxlcjv.cmd';
////      fs.writeFile(cmdFile, str);
////    exec(cmdFile, function(err, stdout, stderr) {
////      if (err || stderr) return console.log(err, stdout, stderr);
////      // 用nodejs删除文件
////      fs.unlink(cmdFile);
////      func(text, stdout);
////    });
//  };
 