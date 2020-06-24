import './style.scss';
import 'bootstrap';
import City from './city';
import Dom from './dom';

Dom.addButtonFunctionality;

City.displayRandomCity(Dom.randomCities);

City.displayingCapitals.forEach((city, index) => {
  City.getCity(city).then((response) => {
    let cityInfo = {};
    cityInfo.tempF = response[0].main;
    cityInfo.tempC = response[1].main;
    cityInfo.weather = response[0].weather[0].main;
    cityInfo.name = response[0].name;

    Dom.createWeatherInfo(cityInfo, index);
  });
});
