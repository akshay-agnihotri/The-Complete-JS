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

// variables which need to be global to add marker in map
let map;
let lat;
let lng;

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

function success(pos) {
  // Making a simple map
  const { latitude, longitude } = pos.coords;
  map = L.map('map').setView([latitude, longitude], 14);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // 1.As the user clicks on map we have to remove the hidden class from 'form';
  // 2.As the user click on map then the focus on will be at the Distance input inside the form
  // 3.add an Event Listener on submiting the form
  map.on('click', function (e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    form.classList.remove('hidden');
    inputDistance.focus();
  });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// ON load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error, options);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // 1.on submit the form we have to make the input field empty
  inputDistance.value = inputDuration.value = inputCadence.value = '';
  // 2.on selecting the type 'cycling' then the 'Cadence' will appear[line no.82]

  const marker = L.marker([lat, lng], {
    draggable: true,
    maxWidth: 300,
    minWidth: 50,
    className: 'running-popup',
  }).addTo(map);

  const popup = L.popup({
    maxWidth: 300,
    minWidth: 50,
    autoClose: false,
    closeOnEscapeKey: false,
    className: 'running-popup',
    closeOnClick: false,
  })
    .setLatLng([lat, lng])
    .setContent('Running')
    .openOn(map);
});

inputType.addEventListener('change', function (e) {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
