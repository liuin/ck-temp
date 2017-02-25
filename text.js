function log() {
  if (window.console) {
    // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
    Function.apply.call(console.log, console, arguments)
  }
}

var serialize = Object.prototype.toString;

var k = '1212';
var s = serialize.call(k);

console.log(s);