'use strict';

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
/*
const  countriesContainer = document.querySelector(".countries");

const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);

  
      const html = `
    <article class="country">
      <img class="country__img" src="${data.flags['svg']}" />
      <div class="country__data">
        <h3 class="country__name">${data.name['common']}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} M people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
        <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  };
  
  getCountryData('india');
  getCountryData('usa');
  getCountryData('germany');
  getCountryData('france');
 */

///////////////////////////////////////
// Welcome to Callback Hell
/*
const countriesContainer = document.querySelector('.countries');

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    const html = `
      <article class="country">
        <img class="country__img" src="${data.flags['svg']}" />
        <div class="country__data">
          <h3 class="country__name">${data.name['common']}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

    //////////////////request-2////////////////////
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/name/${data.borders[0]}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);

      const html = `
        <article class="country">
          <img class="country__img" src="${data2.flags['svg']}" />
          <div class="country__data">
            <h3 class="country__name">${data2.name['common']}</h3>
            <h4 class="country__region">${data2.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data2.population / 1000000
            ).toFixed(1)} M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data2.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data2.currencies)[0].name
            }</p>
          </div>
        </article>
      `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
    ///////////////////////////////////////////
  });
};
getCountryData('france');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

///////////////////////////////////////
// Consuming Promises
/*
const countriesContainer = document.querySelector('.countries');
const renderCountryData = function (data) {
  const html = `
      <article class="country">
        <img class="country__img" src="${data.flags['svg']}" />
        <div class="country__data">
          <h3 class="country__name">${data.name['common']}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
    `;
  //restcountries.com/v3.1/name/${data.borders[0]}
  https: countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (promise) {
//       return promise.json();
//     })
//     .then(function (response) {
//       renderCountryData(response[0]);
//     });
// };

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(promise => promise.json())
    .then(response => renderCountryData(response[0]));
};

getCountryData('france');
*/

//////////////////////////////////
// Chaining Promises
/*
const countriesContainer = document.querySelector('.countries');
const renderCountryData = function (data) {
  const html = `
      <article class="country">
        <img class="country__img" src="${data.flags['svg']}" />
        <div class="country__data">
          <h3 class="country__name">${data.name['common']}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountryData(data[0]);

      if (!data[0].borders[0]) return;
      return fetch(`https://restcountries.com/v3.1/name/${data[0].borders[0]}`);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountryData(data[0]);
    });
    
};
getCountryData('france');
*/

//////////////////////////////
// Handling Rejected Promises
/*
const countriesContainer = document.querySelector('.countries');
const renderCountryData = function (data) {
  const html = `
      <article class="country">
        <img class="country__img" src="${data.flags['svg']}" />
        <div class="country__data">
          <h3 class="country__name">${data.name['common']}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountryData(data[0]);

      if (!data[0].borders[0]) return;
      return fetch(`https://restcountries.com/v3.1/name/${data[0].borders[0]}`);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountryData(data[0]);
    })
    .catch(err => alert(`oops there is something wrong:${err}`))
    .finally(() => countriesContainer.style.opacity = 1);
};
getCountryData('france');
*/


//////////////////////////////
// Throwing Errors Manually
/*
const countriesContainer = document.querySelector('.countries');
const renderCountryData = function (data) {
  const html = `
      <article class="country">
        <img class="country__img" src="${data.flags['svg']}" />
        <div class="country__data">
          <h3 class="country__name">${data.name['common']}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      if(!response.ok) throw new Error('Country not found');
      return response.json();
    })
    .then(function (data) {
      renderCountryData(data[0]);

      if (!data[0].borders) throw new Error('No neighbour country exist');
      return fetch(`https://restcountries.com/v3.1/name/${data[0].borders[0]}`);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountryData(data[0]);
    })
    .catch(err => alert(`something went wrong: ${err}`))
    .finally(() => countriesContainer.style.opacity = 1);
};
// getCountryData('abcd');
getCountryData('australia');
*/


///////////////////////////////////////
// Coding Challenge #1
/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

///////////////////////////////////////
// The Event Loop in Practice
/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/


///////////////////////////////////////
// Building a Simple Promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
*/

//////////////////////////////
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));