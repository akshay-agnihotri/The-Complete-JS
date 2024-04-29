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

// async function fetchReverseGeocodeData(lat, lng, marker) {
//   const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=5b361b367a794584bbb337eab81113aa`;

//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     // console.log(data.features[0].properties.address_line1);
//     marker
//       .bindPopup(`<b>${data.features[0].properties.address_line2}</b>`)
//       .openPopup();
//   } catch (error) {
//     console.error('Error fetching reverse geocode data:', error);
//     // You can handle errors here, such as logging them or showing to the user
//     return null; // or throw error if you want to handle it elsewhere
//   }
// }

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

function success(pos) {
  // Making a simple map
  const { latitude, longitude } = pos.coords;
  const map = L.map('map').setView([latitude, longitude], 14);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Adding a event listener to add Marker
  function onMapClick(e) {
    const { lat, lng } = e.latlng;
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
    // fetchReverseGeocodeData(lat, lng, marker);

    // marker.on('dragend', function (e) {
    //   const { lat, lng } = e.target._latlng;

    //   fetchReverseGeocodeData(lat, lng, marker);
    // });
    // marker.on('mouseover', function (e) {
    //   console.log(e.sourceTarget);
    // });
  }

  map.on('click', onMapClick);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// ON load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error, options);
}
