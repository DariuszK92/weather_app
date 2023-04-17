const cityName = document.querySelector('#city-name');
const errorPara = document.querySelector('.error');
const cityInput = document.querySelector('#location');
const currentTime = document.querySelector('#current-hour')
const currentCondition = document.querySelector('#current-condition')
const currentIcon = document.querySelector('#current-icon')


export default function storeWeather() {
    localStorage.setItem("cityChosen", cityInput.value);
    showWeather();
}


 export async function showWeather() {
    const citySearched = localStorage.getItem('cityChosen');
    const urlApi = `http://api.weatherapi.com/v1/current.json?key=b53f258c040d4673be784703231404&q=${citySearched}&aqi=no`
    try {
    const response = await fetch(urlApi);
    const currentData = await response.json();
    showCurrentStatus(currentData);
    }
    catch(error) {
        showError();

    }
}


function showError() {
    errorPara.innerHTML = 'City you are searching does not exist, please try again'
    cityInput.value = '';
    cityName.innerHTML = ''
}

async function showCurrentStatus(currentData) {
    cityName.innerHTML = currentData.location.name;
    currentTime.innerHTML = currentData.location.localtime
    currentCondition.innerHTML= currentData.current.condition.text;
    let iconLength = await currentData.current.condition.icon.length;
    let correctIcon = await currentData.current.condition.icon.slice(2, iconLength)
    currentIcon.src  = await `http://${correctIcon}`;
    cityInput.value = '';
    errorPara.innerHTML='';
    console.log(currentData)
}


