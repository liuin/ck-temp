var buf = new Buffer('AB,C');
var json = JSON.stringify(buf,'',"\t");

console.log(json);