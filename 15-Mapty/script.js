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

  constructor(distance, duration, coords,type) {
    this.distance = distance; // in min
    this.duration = duration; //in km
    this.coords = coords; //[lat,lng]
    this.type = type; //running or cycling
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence,type) {
    super(distance, duration, coords,type);
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
  constructor(distance, duration, coords, elevationGain,type) {
    super(distance, duration, coords,type);
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
  #workouts = [];

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

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords, {
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
      className: `${workout.type}-popup`,
      closeOnClick: false,
    })
      .setLatLng(workout.coords)
      .setContent('Running')
      .openOn(this.#map);
  }

  _newWorkOut(e) {
    e.preventDefault();
    //1.check if the input values are correct or not if not then show alert otherwise create an workout object
    const checkValidInput = function (...inputs) {
      // for (let i = 0; i < inputs.length; i++)
      //   if ((!Number.isFinite(inputs[i])) || (inputs[i] == 0) ) return false;
      // return true
      return inputs.every(input => Number.isFinite(input));
    };

    const allPositive = function (...inputs) {
      return inputs.every(input => input > 0);
    };

    // get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout;
    //creating a 'coords' array
    const coords = [this.#lat, this.#lng];

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !checkValidInput(cadence, distance, duration) ||
        !allPositive(cadence, distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running(distance, duration, coords, cadence, type);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !checkValidInput(elevation, distance, duration) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling(distance, duration, coords, elevation, type);
    }

    // 2.on submit the form we have to make the input field empty
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // 3.On selecting the type 'cycling' then the 'Cadence' will appear[have done in constructor function in line 3]

    // 4.push the data of workout object into the array
    this.#workouts.push(workout);

    // 5.Render workout on map as marker
    this._renderWorkoutMarker(workout);
  }
  
}

const app = new App();
