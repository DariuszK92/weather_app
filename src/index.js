import _ from 'lodash';
import './style.css';
import background from './background.jpg'
import storeWeather from './websites/api';
import { showWeather } from './websites/api';



const searchBtn = document.querySelector('#search');
const unitToggle = document.querySelector('#checkbox');

searchBtn.addEventListener('click', storeWeather);


function unitChosen() {
    let statusToggle = localStorage.getItem("toggleTempUnits");
    if(statusToggle=='false' || statusToggle==null){
        unitToggle.checked=false
    } else if(statusToggle=='true') {
        unitToggle.checked=true
    }
}

unitChosen();
showWeather();

function storeUnit() {
    localStorage.setItem("toggleTempUnits", unitToggle.checked)
}

unitToggle.addEventListener('click', storeUnit)