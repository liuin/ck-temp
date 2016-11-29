function check1(arr, n) {
  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      if ((arr[i] == arr[j]) || Math.abs(arr[i] - arr[j]) == j - i) {
        return false;
      }
    }
  }
  return true;
}



function queen1(count) {
  var arr = [];
  var root = 0;
  var countState = count;

  function loopArr(rootArr) {
    for (arr[rootArr] = 1; arr[rootArr] <= countState; arr[rootArr]++) {
      if (rootArr == (countState - 1)) {

        if (!check1(arr, countState)) {

        } else {
          console.log(arr);
        }
        continue;

      } else {
        loopArr(rootArr + 1);
      }

    }
  }
  loopArr(root);

}




queen1(4);
