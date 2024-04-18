'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours : {
    [weekdays[3]]: {
      open: 12,
      close: 22,
    },
    [weekdays[4]]: {
      open: 11,
      close: 23,
    },
    [weekdays[5]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
/*
///////////////////////////
// Array Destructuring
const arr1 = [2, 3, 4];
const d = arr1[0];
const e = arr1[1];
const f = arr1[2];

// Array Destructuring
const [x, y, z] = arr1;
console.log(x, y, z);
console.log(arr1);

let [first, , second] = restaurant.categories;
console.log(first, second);

// let temp = first;
// first = second;
// second = first;

[first, second] = [second, first];
console.log(first, second);

// Recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested Destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p, q, r = 1] = [8, 9];


///////////////////////////////////////
// Destructuring Objects

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours : {
//     [weekdays[3]]: {
//       open: 12,
//       close: 22,
//     },
//     [weekdays[4]]: {
//       open: 11,
//       close: 23,
//     },
//     [weekdays[5]]: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },

//   order(starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

//   orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
//     console.log(
//       `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
//     );
//   },

//   orderPasta(ing1, ing2, ing3) {
//     console.log(
//       `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
//     );
//   },

//   orderPizza(mainIngredient, ...otherIngredients) {
//     console.log(mainIngredient);
//     console.log(otherIngredients);
//   },
// };

// Destructuring Objects

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Nested objects
const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);

// passing object in Method call and doing destructuring
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

///////////////////////////////////////
// The Spread Operator (...)

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); //1,2,7,8,9

const newArr = [1, 2, ...arr]; 
console.log(newArr); //1,2,7,8,9

console.log(...newArr);  //1 2 7 8 9
console.log(1, 2, 7, 8, 9);  //1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu); //['Pizza', 'Pasta', 'Risotto', 'Gnocci']

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu1); // ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // ['J', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str); // J o n a s
// console.log(`${...str} Schmedtmann`); //note that the ${} accept a single value inside it not multiple values

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3'),
];
console.log(ingredients);

// orderPasta(ing1, ing2, ing3) {
//   console.log(
//     `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
//   );
// },

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

*/