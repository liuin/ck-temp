var List = require('./list');

var GENDER = {
  female: 0,
  male: 1
};

var Person = function (name, gender) {
  this.name = name;
  this.gender = gender;
};

var personList = new List();

personList.append(new Person('a', GENDER.male));
personList.append(new Person('b', GENDER.male));
personList.append(new Person('c', GENDER.female));
personList.append(new Person('d', GENDER.male));
personList.append(new Person('e', GENDER.male));
personList.append(new Person('f', GENDER.male));
personList.append(new Person('g', GENDER.female));
personList.append(new Person('h', GENDER.male));
personList.append(new Person('i', GENDER.female));
personList.append(new Person('j', GENDER.male));


var maleList = new List();
var femaleList = new List();



for (personList.front(); personList.curPos() < personList.length; personList.next()) {
  var cur = personList.curPos();
  var p = personList.getElement();
  if (p.gender === GENDER.male) {
    maleList.append(p);
  } else {
    femaleList.append(p);
  }
  if (cur === personList.length-1) {
    break;
  }
}

//console.log(maleList.toString());
//console.log(femaleList.toString());
maleList.pos = 10;
maleList.clear();

maleList.insert(new Person('liuin',GENDER.male))
maleList.insert(new Person('liuin1',GENDER.male),maleList.length - 1)
maleList.insert(new Person('liuin2',GENDER.male),maleList.length - 1)
maleList.insert(new Person('liuin3',GENDER.male),maleList.length - 1)
console.log(maleList);
