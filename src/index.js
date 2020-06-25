import './style.scss';
import 'bootstrap';
import City from './city';
import Dom from './dom';

const searchedCity = JSON.parse(localStorage.getItem('city'));
if (searchedCity) {
  if (
    searchedCity[0] === undefined
    || searchedCity.length === 0
    || searchedCity[0].cod === '404' || searchedCity[0].cod === '400'
  ) {
    Dom.errorMessage();
  } else {
    const cityInfo = {};
    cityInfo.tempF = searchedCity[0].main;
    cityInfo.tempC = searchedCity[1].main;
    cityInfo.weather = searchedCity[0].weather[0].main;
    cityInfo.weatherIcon = `http://openweathermap.org/img/wn/${searchedCity[0].weather[0].icon}@2x.png`;
    cityInfo.name = searchedCity[0].name;

    City.getImage(cityInfo.name).then((response) => {
      Dom.cityToDisplay(cityInfo, response.url);
    });
  }
}

City.displayRandomCity(Dom.randomCities);

City.displayingCapitals.forEach((city, index) => {
  City.getCity(city).then((response) => {
    if (response === 'error') {
      Dom.errorMessage(index);
    } else {
      const cityInfo = {};
      cityInfo.tempF = response[0].main;
      cityInfo.tempC = response[1].main;
      cityInfo.weather = response[0].weather[0].main;
      cityInfo.weatherIcon = `http://openweathermap.org/img/wn/${response[0].weather[0].icon}@2x.png`;
      cityInfo.name = response[0].name;

      Dom.createWeatherInfo(cityInfo, index);
    }
  });
});

Dom.addButtonFunctionality();
