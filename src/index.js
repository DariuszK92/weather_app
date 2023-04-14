import _ from 'lodash';
import './style.css';
import background from './background.jpg'
import { doc } from 'prettier';
import getWeather from './websites/api';



const searchBtn = document.querySelector('#search');



searchBtn.addEventListener('click', getWeather)