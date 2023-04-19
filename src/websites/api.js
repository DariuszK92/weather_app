
const cityName = document.querySelector('#city-name');
const errorPara = document.querySelector('.error');
const currentTime = document.querySelector('#current-hour')
const currentCondition = document.querySelector('#current-condition')
const currentIcon = document.querySelector('#current-icon')
const cityInput = document.querySelector('#location');
const currentTemp = document.querySelector('#current-temp')
const currentWind = document.querySelector('#current-wind')
const currentFeels = document.querySelector('#current-feels')
const currentHumidity = document.querySelector('#current-humidity')



 export async function showWeather() {
    const citySearched = localStorage.getItem('cityChosen');
    const urlApi = `http://api.weatherapi.com/v1/current.json?key=b53f258c040d4673be784703231404&q=${citySearched}&aqi=no`
    try {
    const response = await fetch(urlApi);
    const currentData = await response.json();
    showCurrentStatus(currentData);
    }
    catch(error) {
        showError(error);

    }
}

function showError(error) {
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
    let unitsStored = localStorage.getItem('toggleTempUnits');
    if(unitsStored == "false"){
        currentTemp.innerHTML = `<span> ${currentData.current.temp_c} </span><span>&#8451</span>`;
        currentWind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind ${currentData.current.wind_kph} kph`;
        currentFeels.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> <span>Feels like ${currentData.current.feelslike_c}</span><span>&#8451</span>`;
    } else {
        currentTemp.innerHTML = `<span>${currentData.current.temp_f}</span> <span>&#8457</span>`;
        currentWind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind ${currentData.current.wind_mph} mph`;
        currentFeels.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> <span>Feels like ${currentData.current.feelslike_f}</span><span>&#8457</span>`;
    };
    currentHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> <span>Humidity ${currentData.current.humidity}</span><span>%</span>`;
    setBackground(currentData);
    hourlyWeather();

}

function setBackground(currentData){
    let backImg = document.querySelector('body');
    if(currentData.current.condition.text == "Clear"){
        backImg.style.backgroundImage= "url('../src/backgrounds/clear.jpg')"
     } else if(currentData.current.condition.text == "Partly cloudy"){
        backImg.style.backgroundImage= "url('../src/backgrounds/partly-cloudy.jpg')"
     } else if(currentData.current.condition.text == "Sunny"){
        backImg.style.backgroundImage= "url('../src/backgrounds/sunny.jpg')"
     } else if(currentData.current.condition.text == "Mist"){
        backImg.style.backgroundImage= "url('../src/backgrounds/mist.jpg')"
     } else if(currentData.current.condition.text == "Overcast"){
        backImg.style.backgroundImage= "url('../src/backgrounds/overcast.jpg')"
     } else if(currentData.current.condition.text == "Patchy rain possible"){
        backImg.style.backgroundImage= "url('../src/backgrounds/patchy-rain.jpg')"
     } else if(currentData.current.condition.text == "Patchy rain possible"){
        backImg.style.backgroundImage= "url('../src/backgrounds/patchy-rain.jpg')"
     } else if(currentData.current.condition.text == "Cloudy"){
        backImg.style.backgroundImage= "url('../src/backgrounds/cloudy.jpg')"
     } else if(currentData.current.condition.text == "Moderate or heavy rain shower"){
        backImg.style.backgroundImage= "url('../src/backgrounds/heavy-rain.jpg')"
     }

      else {
        backImg.style.backgroundImage= "url('../src/backgrounds/random.jpg')"
    }
}


async function hourlyWeather() {
    const citySearched = localStorage.getItem('cityChosen');
    const urlApi = `http://api.weatherapi.com/v1/forecast.json?key=b53f258c040d4673be784703231404&q=${citySearched}&days=7&aqi=no`
    try {
    const response = await fetch(urlApi);
    const currentData = await response.json();
    console.log(currentData)
    }
    catch(error) {
        showError(error);

    }
}