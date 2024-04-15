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

*/
