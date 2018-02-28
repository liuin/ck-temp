const mutations = {
  setState (state, [obj, otherState]) {
    if (otherState) {
      for (var i in obj) {
        if (i.indexOf('.') > -1) {
          var arr = i.split('.');
//          var objSelect = "";
//          for (var k = 0;  k<arr.length ; k++) {
//            objSelect = otherState[arr[k]];
//          }          
          otherState[arr[0]][arr[1]] = obj[i]
        }else {
          otherState[i] = obj[i]          
        }
      }
    } else {
      for (var n in obj) {
        state[n] = obj[n]
      }
    }
  }
}

export default mutations
