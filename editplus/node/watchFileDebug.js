var fs = require('fs');
var exec = require('child_process').exec;


fs.watch('E:/xampp/htdocs/ck-temp/framework/html2canvas-master/src', {
  persistent: true, // 设为false时，不会阻塞进程。
  recursive: false
}, function(event, filename) {
  if (event === 'change') {
    if (filename) {
      exec('E:/xampp/htdocs/ck-temp/framework/html2canvas-master/src/' + filename, function(error, stdout, stderr) {
        // command output is in stdout
        console.log(filename);
        console.log(stdout);
      });

    }
  }
});

