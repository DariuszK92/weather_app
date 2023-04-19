import { showWeather } from "./api";

// Store units (F/C) in local storage
const unitToggle = document.querySelector('#checkbox');
export function storeUnit() {
    localStorage.setItem("toggleTempUnits", unitToggle.checked)
}

export function unitOnload() {
    let statusToggle = localStorage.getItem("toggleTempUnits");
    if(statusToggle=='false' || statusToggle==null){
        unitToggle.checked=false
    } else if(statusToggle=='true') {
        unitToggle.checked=true
    }
}


// Store chosen city in local storage and generate data

const cityInput = document.querySelector('#location');
export function storeWeather() {
    localStorage.setItem("cityChosen", cityInput.value);
    showWeather();
}
