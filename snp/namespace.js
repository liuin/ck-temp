var _namespace = function (ns) {
  var a = ns.split("."),
    p = window, i;
  for (i = 0; i < a.length; i++) {
    p[a[i]] = p = p[a[i]] || {};
  }
  return p;
}
gs = _namespace("com.greensock.opdk.dfdf");