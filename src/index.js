import _ from 'lodash';
import './style.css';
import { showWeather } from './websites/api';
import { storeUnit, unitOnload, storeWeather, storeOptionChosen } from './websites/storage';
import randomBackground from './backgrounds/random.jpg';

//Store units (C/F) in local storage
const unitToggle = document.querySelector('#checkbox');
unitToggle.addEventListener('click', storeUnit);

//Store hourly/daily option in local storage
const optionToggle = document.querySelector('#checkbox2');
optionToggle.addEventListener('click', storeOptionChosen);

// Show units (C/F) onload from local storage
unitOnload();

// Store city in local storage and generate page UI
const searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', storeWeather);

//Set background
const backgroundHolder = document.querySelector('.background-holder');

(function setBackground() {
    backgroundHolder.src = randomBackground;
})();

// Generate page UI acc to information from local storage
showWeather();
