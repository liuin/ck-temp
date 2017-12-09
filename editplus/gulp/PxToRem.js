var beautify = require('js-beautify');
var fs = require('fs');
var exec = require('child_process').exec;

var options = process.argv;


var fit = 0.01; //默认是1/100倍数rem/px;

fs.readFile(options[3], 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  var getpx = data.replace(/:([\s]*)(-*)(.[0-9]*)(\..[0-9]*)?px/g, function() {
    var i = arguments[3];
    var sing = arguments[2];
    var n = arguments[4]? arguments[4].replace(".","") : "" ;
    
    i = (i*fit).toFixed(2);
    
    return ":" + sing + i + n + "rem";
  })

  fs.writeFile('copy.txt', getpx, 'ucs2', function (err) {
    if (err) throw err;
    console.log('写入完成');
    exec('clip<copy.txt',function  () {
      fs.unlink('copy.txt');      
    });
  });

  
});