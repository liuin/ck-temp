(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();
},{}],2:[function(require,module,exports){
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
},{"./basetoarraybuffer":1}]},{},[2]);
