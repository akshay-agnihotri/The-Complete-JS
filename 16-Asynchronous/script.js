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
