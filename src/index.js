import _ from 'lodash';
import './style.css';
import { showWeather } from './websites/api';
import { storeUnit, unitOnload, storeWeather } from './websites/storage';


//Store units (C/F) in local storage
const unitToggle = document.querySelector('#checkbox');
unitToggle.addEventListener('click', storeUnit);

// Show units (C/F) onload from local storage
unitOnload();


// Store city in local storage and generate page UI
const searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', storeWeather);


// Generate page UI acc to information from local storage
showWeather();