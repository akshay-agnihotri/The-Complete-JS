'use strict';

///////////////////////////////////////
// Scoping in Practice
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial); // millenial has functional scope
    // console.log(add(2, 3));  function also have block scpe in JS it will give reference error
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
console.log(age);
printAge();

///////////////////////////////////////
// Hoisting and TDZ in Practice

// Variables
console.log(me);  //undefined
console.log(job);  // Uncaught ReferenceError: Cannot access 'job' before initialization
console.log(year); // Uncaught ReferenceError: Cannot access 'job' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1991;


// Functions
console.log(addDecl(2, 3)); // 5
console.log(addExpr(2, 3)); // Uncaught ReferenceError: Cannot access 'addExpr' before initialization
console.log(addArrow);  // undefined
console.log(addArrow(2, 3)); // script.js:60 Uncaught TypeError: addArrow is not a function (here we are actually doing something like undefined(2,3) )

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;



// Example
if(!numProducts) deleteShoppingCart();  // if(!undefined) => if(true)

var numProducts = 10;

function deleteShoppingCart(){
    console.log('All products deleted');
}
// o/p => All products deleted


var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);


///////////////////////////////////////
// The this Keyword in Practice
console.log(this); //window

//for normal function call ' this ==> undefined ' in strict mode
const calcAge = function (birthYear) {
  console.log(2037 - birthYear); //46
  console.log(this); //undefined
};
// calcAge(1991);

// in arrow function this ==> parent scope me this ki value
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear); //46
  console.log(this); //window
};
calcAgeArrow(1991);


// when method is called using object then this ===> object
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;  //method borrowing
matilda.calcAge();


const f = matilda.calcAge
f()  //undefined bcz it is a regular function call



const akshay = {
  myFirstName:'akshay',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(this.year);
  },
  greet: () => console.log(`Hey ${this.myFirstName}`)  //window.myFirstName  == undefined
};

akshay.greet()


var myFirstName = 'tripathi';
console.log(window.myFirstName); //tripathi

const akshay = {
  myFirstName:'akshay',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(this.year);
  },
  greet: () => console.log(`Hey ${this.myFirstName}`)  //tripathi
};

akshay.greet()


const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); //window
    function isMillenial() {
      console.log(self); 
      console.log(self.year >= 1981 && self.year <= 1996);
    }
    isMillenial(); //regular function call "this == undefined"
  },
};
jonas.calcAge(); //object calling a method


const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();  // arrowfunction call
  },

};
jonas.calcAge();


// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
console.log(addExpr(2, 5));
console.log(addExpr(2, 5, 8, 12));

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);


///////////////////////////////////////
// Objects vs. primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age); //31
console.log(oldAge); //30

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend);
// {name: 'Jonas', age: 27}
console.log('Me', me);
//{name: 'Jonas', age: 27}


// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
*/