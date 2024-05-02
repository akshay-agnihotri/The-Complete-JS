'use strict';

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

  constructor(distance, duration, coords, type) {
    this.distance = distance; // in min
    this.duration = duration; //in km
    this.coords = coords; //[lat,lng]
    this.type = type; //running or cycling
  }
  _setDiscription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.discription = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence, type) {
    super(distance, duration, coords, type);
    this.cadence = cadence;
    this.calcPace();
    this._setDiscription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(distance, duration, coords, elevationGain, type) {
    super(distance, duration, coords, type);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDiscription();
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
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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

  _hideForm() {
    // form.style.display = 'none';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(function () {
      form.style.display = 'grid';
    }, 1000);
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, 14, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
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
      .setContent(`${workout.discription}`)
      .openOn(this.#map);
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.discription}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
    `;

    form.insertAdjacentHTML('afterend', html);
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    this.#workouts = JSON.parse(localStorage.getItem('workouts'));

    this.#workouts.forEach((work) => {
      this._renderWorkout(work);
    })
  }

  _newWorkOut(e) {
    e.preventDefault();
    //1.check if the input values are correct or not if not then show alert otherwise create an workout object
    const checkValidInput = function (...inputs) {
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
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    // 3.On selecting the type 'cycling' then the 'Cadence' will appear[have done in constructor function in line 3]

    // 4.push the data of workout object into the array
    this.#workouts.push(workout);

    // 5.Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //6.Render workout in a list
    this._renderWorkout(workout);

    //7.hiding the form
    this._hideForm();

    //8.storing the data into local storage
    this._setLocalStorage();
  }
}

const app = new App();
