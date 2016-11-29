    //大写转小写
    function lowerCase (str) {
      var strCase = '';
      for (var i = 0;  i<str.length ; i++) {
        if ((str.charCodeAt(i) >= "A".charCodeAt()) && (str.charCodeAt(i) <= "z".charCodeAt())) {
          if ((str.charCodeAt(i) >= "A".charCodeAt()) && (str.charCodeAt(i) <= "Z".charCodeAt())) {
            strCase += String.fromCharCode(str.charCodeAt(i) + 32);            
          }else {
            strCase += str.charAt(i);            
          }
        }else {
          strCase += str.charAt(i);
        }
      }

      return strCase;
    }
