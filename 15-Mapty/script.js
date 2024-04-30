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

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(distance, duration, coords) {
    this.distance = distance; // in min
    this.duration = duration; //in km
    this.coords = coords; //[lat,lng]
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #lat;
  #lng;
  constructor() {
    // As the page loads then the constructor function will trigger => _getPosition() => _loadMap()
    this._getPosition();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      );
    }
  }

  _loadMap(pos) {
    // Making a simple map
    const { latitude, longitude } = pos.coords;
    this.#map = L.map('map').setView([latitude, longitude], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#lat = e.latlng.lat;
    this.#lng = e.latlng.lng;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    e.preventDefault();
    // 1.on submit the form we have to make the input field empty
    inputDistance.value = inputDuration.value = inputCadence.value = '';
    // 2.on selecting the type 'cycling' then the 'Cadence' will appear[line no.82]

    const marker = L.marker([this.#lat, this.#lng], {
      draggable: true,
      maxWidth: 300,
      minWidth: 50,
      className: 'running-popup',
    }).addTo(this.#map);

    const popup = L.popup({
      maxWidth: 300,
      minWidth: 50,
      autoClose: false,
      closeOnEscapeKey: false,
      className: 'running-popup',
      closeOnClick: false,
    })
      .setLatLng([this.#lat, this.#lng])
      .setContent('Running')
      .openOn(this.#map);
  }
}

const app = new App();



