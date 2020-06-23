import './style.scss';
import 'bootstrap';
import City from './city';

const searchButton = document.getElementById('search-button');

const form = document.getElementById('form');
searchButton.onclick = () => {
  City.getCity(form[0].value);
};
