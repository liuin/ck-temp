var beautify = require('js-beautify');
var formatertyle = "";
var fs = require('fs');
var exec = require('child_process').exec;

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

});


