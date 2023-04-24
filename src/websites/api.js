import clear from '../backgrounds/clear.jpg';
import cloudy from '../backgrounds/cloudy.jpg';
import heavyRain from '../backgrounds/heavy-rain.jpg';

const cityName = document.querySelector('#city-name');
const errorPara = document.querySelector('.error');
const currentTime = document.querySelector('#current-hour');
const currentCondition = document.querySelector('#current-condition');
const currentIcon = document.querySelector('#current-icon');
const cityInput = document.querySelector('#location');
const currentTemp = document.querySelector('#current-temp');
const currentWind = document.querySelector('#current-wind');
const currentFeels = document.querySelector('#current-feels');
const currentHumidity = document.querySelector('#current-humidity');

export async function showWeather() {
    const citySearched = localStorage.getItem('cityChosen');
    const urlApi = `https://api.weatherapi.com/v1/current.json?key=b53f258c040d4673be784703231404&q=${citySearched}&aqi=no`;
    try {
        const response = await fetch(urlApi);
        const currentData = await response.json();
        showCurrentStatus(currentData);
    } catch (error) {
        showError(error);
    }
}

function showError(error) {
    errorPara.innerHTML = 'City you are searching does not exist, please try again';
    cityInput.value = '';
    cityName.innerHTML = '';
}

async function showCurrentStatus(currentData) {
    cityName.innerHTML = currentData.location.name;
    currentTime.innerHTML = currentData.location.localtime;
    currentCondition.innerHTML = currentData.current.condition.text;
    let iconLength = await currentData.current.condition.icon.length;
    let correctIcon = await currentData.current.condition.icon.slice(2, iconLength);
    currentIcon.src = await `https://${correctIcon}`;
    cityInput.value = '';
    errorPara.innerHTML = '';
    let unitsStored = localStorage.getItem('toggleTempUnits');
    if (unitsStored == 'false') {
        currentTemp.innerHTML = `<span> ${currentData.current.temp_c} </span><span>&#8451</span>`;
        currentWind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind ${currentData.current.wind_kph} kph`;
        currentFeels.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> <span>Feels like ${currentData.current.feelslike_c}</span><span>&#8451</span>`;
    } else {
        currentTemp.innerHTML = `<span>${currentData.current.temp_f}</span> <span>&#8457</span>`;
        currentWind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind ${currentData.current.wind_mph} mph`;
        currentFeels.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> <span>Feels like ${currentData.current.feelslike_f}</span><span>&#8457</span>`;
    }
    currentHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> <span>Humidity ${currentData.current.humidity}</span><span>%</span>`;
    setBackground(currentData);

    if (localStorage.getItem('toggleOptionChosen') === 'false') {
        dailyWeather(currentData);
        const dailyWeatherContainer = document.querySelector('.daily');
        dailyWeatherContainer.style.display = 'flex';
        const hourlyWeatherContainer = document.querySelector('.hourly');
        hourlyWeatherContainer.style.display = 'none';

        console.log('daily!');
    } else {
        startHoursApicreation();
        const dailyWeatherContainer = document.querySelector('.daily');
        dailyWeatherContainer.style.display = 'none';
        const hourlyWeatherContainer = document.querySelector('.hourly');
        hourlyWeatherContainer.style.display = 'flex';
        const optionToggle = document.querySelector('#checkbox2');
        optionToggle.checked = true;
    }
}

function setBackground(currentData) {
    let backImg = document.querySelector('body');
    // if (currentData.current.condition.text == 'Clear') {
    //     backImg.style.backgroundImage = 'url(clear)';
    // } else if (currentData.current.condition.text == 'Partly cloudy') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/partly-cloudy.jpg')";
    // } else if (currentData.current.condition.text == 'Sunny') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/sunny.jpg')";
    // } else if (currentData.current.condition.text == 'Mist') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/mist.jpg')";
    // } else if (currentData.current.condition.text == 'Overcast') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/overcast.jpg')";
    // } else if (currentData.current.condition.text == 'Patchy rain possible') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/patchy-rain.jpg')";
    // } else if (currentData.current.condition.text == 'Patchy rain possible') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/patchy-rain.jpg')";
    // } else if (currentData.current.condition.text == 'Cloudy') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/cloudy.jpg')";
    // } else if (currentData.current.condition.text == 'Moderate or heavy rain shower') {
    //     backImg.style.backgroundImage = "url('../src/backgrounds/heavy-rain.jpg')";
    // } else {
    backImg.style.backgroundImage = "url('../src/backgrounds/random.jpg')";
    // }
}

const dailyWeatherContainer = document.querySelector('.daily');
const hourlyWeatherContainer = document.querySelector('.hourly');

async function dailyWeather(a) {
    const citySearched = localStorage.getItem('cityChosen');
    const urlApi = `https://api.weatherapi.com/v1/forecast.json?key=b53f258c040d4673be784703231404&q=${citySearched}&days=7&aqi=no`;
    try {
        const response = await fetch(urlApi);
        const currentData = await response.json();

        //start For loop
        dailyWeatherContainer.innerHTML = '';
        for (const day of currentData.forecast.forecastday) {
            const d = new Date(day.date);
            let today = d.getDay();
            let todayName;
            switch (today) {
                case 0:
                    todayName = 'Sunday';
                    break;
                case 1:
                    todayName = 'Monday';
                    break;
                case 2:
                    todayName = 'Tuesday';
                    break;
                case 3:
                    todayName = 'Wednesday';
                    break;
                case 4:
                    todayName = 'Thursday';
                    break;
                case 5:
                    todayName = 'Friday';
                    break;
                case 6:
                    todayName = 'Saturday';
                    break;
            }

            const dayDiv = document.createElement('div');

            const dayName = document.createElement('div');
            dayName.classList.add('mid-size');
            dayName.textContent = todayName;
            const dayMaxTemp = document.createElement('div');
            const dayMinTemp = document.createElement('div');
            let unitsStored = localStorage.getItem('toggleTempUnits');
            if (unitsStored == 'false') {
                dayMaxTemp.innerHTML = `${day.day.maxtemp_c}&#8451`;
                dayMinTemp.innerHTML = `${day.day.mintemp_c}&#8451`;
            } else {
                dayMaxTemp.innerHTML = `${day.day.maxtemp_f}&#8457`;
                dayMinTemp.innerHTML = `${day.day.mintemp_f}&#8457`;
            }

            let iconLength = day.day.condition.icon.length;
            let correctIcon = day.day.condition.icon.slice(2, iconLength);

            const dayImg = document.createElement('img');
            dayImg.src = await `https://${correctIcon}`;
            dayDiv.appendChild(dayName);
            dayDiv.appendChild(dayMaxTemp);
            dayDiv.appendChild(dayMinTemp);
            dayDiv.appendChild(dayImg);
            dailyWeatherContainer.appendChild(dayDiv);
        }
        //end for loop

        //end of hour loop
    } catch (error) {
        showError(error);
        console.log('hey');
    }
}

async function startHoursApicreation() {
    const citySearched = localStorage.getItem('cityChosen');
    const urlApi = `https://api.weatherapi.com/v1/forecast.json?key=b53f258c040d4673be784703231404&q=${citySearched}&days=7&aqi=no`;
    try {
        const response = await fetch(urlApi);
        const currentData = await response.json();
        const inputCurrentHour = new Date(currentData.current.last_updated);
        let hourNow = inputCurrentHour.getHours();
        let hoursLeftToday = 23 - parseInt(hourNow);
        let hoursLeftTomorrow = 23 - parseInt(hoursLeftToday);
        let todayLeftHours = [];
        let tomorrowLeftHours = [];
        todayLeftHours.push(currentData.forecast.forecastday[0].hour.slice(hoursLeftTomorrow, 24));
        tomorrowLeftHours.push(
            currentData.forecast.forecastday[1].hour.slice(0, hoursLeftTomorrow)
        );
        hourlyWeatherContainer.innerHTML = '';
        createHoursAPI(todayLeftHours);
        createHoursAPI(tomorrowLeftHours);
    } catch (error) {
        showError(error);
        console.log('hey');
    }
}

function createHoursAPI(array) {
    for (const hours of array) {
        for (const hour of hours) {
            const oneHourDiv = document.createElement('div');
            const d = new Date(hour.time);
            let thisHour = d.getHours();
            const currentHour = document.createElement('div');
            currentHour.classList.add('mid-size');
            currentHour.innerText = `${thisHour}:00`;
            const currentHourTemperature = document.createElement('div');
            let tempUnits = localStorage.getItem('toggleTempUnits');
            if (tempUnits == 'false') {
                currentHourTemperature.innerHTML = `${hour.temp_c}&#8451`;
            } else {
                currentHourTemperature.innerHTML = `${hour.temp_f}&#8457`;
            }
            let hourIconLength = hour.condition.icon.length;
            let correctHourIcon = hour.condition.icon.slice(2, hourIconLength);
            const currentHourIcon = document.createElement('img');
            currentHourIcon.src = `https://${correctHourIcon}`;
            oneHourDiv.appendChild(currentHour);
            oneHourDiv.appendChild(currentHourTemperature);
            oneHourDiv.appendChild(currentHourIcon);
            hourlyWeatherContainer.appendChild(oneHourDiv);
        }
    }
}
