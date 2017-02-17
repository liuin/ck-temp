isArray = (function () {
  var toString = Object.prototype.toString,
    array = toString.call([]);
  return function (obj) {
    return obj != null && (obj instanceof Array || (typeof (obj) === "object" && !!obj.push && toString.call(obj) === array));
  };
}())


