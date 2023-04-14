const cityName = document.querySelector('#city-name');
const errorPara = document.querySelector('.error');
const cityInput = document.querySelector('#location');

export default async function getWeather() {
    const citySearched = cityInput.value;
    const urlApi = `http://api.weatherapi.com/v1/current.json?key=b53f258c040d4673be784703231404&q=${citySearched}&aqi=no`
    try {
    const response = await fetch(urlApi);
    const currentData = await response.json();
    cityName.innerHTML = currentData.location.name;
    cityInput.value = '';
    errorPara.innerHTML=''
    console.log(currentData)
    }
    catch(error) {
        errorPara.innerHTML = 'City you are searching does not exist, please try again'
        cityInput.value = '';
        cityName.innerHTML = ''

    }
}