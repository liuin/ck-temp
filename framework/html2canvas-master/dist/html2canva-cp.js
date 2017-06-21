!function(e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var f;
    "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.html2canvas = e()
  }
}  //将参数e传到html2canvas变量中

(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    console.log(t);
    function s () {
//      console.log("s111");
    }
    return s;
  })({
    1:[]
  })
})