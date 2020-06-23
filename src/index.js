import './style.scss';
import 'bootstrap';
import City from './city';

const searchButton = document.getElementById('search-button');

const form = document.getElementById('form');
searchButton.onclick = () => {
  City.getCity(form[0].value);
};

const randomCities = document.getElementsByClassName('city');

City.displayRandomCity([...randomCities]);

[...randomCities].forEach((city, index) => {
  let cityInfo = City.cityObject(index, null, 'C');
  let infoDiv = document.createElement('div');
  infoDiv.classList.add('d-flex', 'flex-column', 'info');

  let cityNameDiv = document.createElement('div');
  cityNameDiv.classList.add('title');
});
