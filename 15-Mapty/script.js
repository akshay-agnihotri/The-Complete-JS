'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

function success(pos) {
  const { latitude, longitude } = pos.coords;
  const map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// ON load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error, options);
}
