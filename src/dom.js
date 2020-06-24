import City from './city';

const Dom = (() => {
  function addButtonFunctionality() {
    const searchButton = document.getElementById('search-button');
    searchButton.onclick = () => {
      City.getCity(form[0].value);
    };
  }

  const randomCities = [...document.getElementsByClassName('city')];

  function createWeatherInfo(cityInfo, index) {
    let cityDiv = document.getElementById(`city-${index}`);
    let infoDiv = document.createElement('div');
    infoDiv.classList.add(
      'd-flex',
      'flex-column',
      'info',
      'temp-wrapper',
      'position-relative'
    );

    let cityNameDiv = document.createElement('div');
    cityNameDiv.classList.add('title');
    cityNameDiv.innerHTML = cityInfo.name;

    infoDiv.appendChild(cityNameDiv);

    // Fahrenheit temp container

    let fahrenheitContainer = document.createElement('div');
    fahrenheitContainer.classList.add(
      'position-absolute',
      'w-100',
      'h-100',
      'd-flex',
      'flex-column'
    );

    let fahrenheitTemp = document.createElement('div');
    fahrenheitTemp.classList.add('fahrenheit-temp');
    fahrenheitTemp.innerHTML = cityInfo.tempF.temp;

    let minMaxDivF = document.createElement('div');

    let minTempF = document.createElement('div');
    minTempF.innerHTML = cityInfo.tempF.temp_min;

    let maxTempF = document.createElement('div');
    maxTempF.innerHTML = cityInfo.tempF.temp_max;

    minMaxDivF.append(minTempF, maxTempF);

    fahrenheitContainer.append(fahrenheitTemp, minMaxDivF);

    infoDiv.append(fahrenheitContainer);

    // Celsius temp container

    let celsiusContainer = document.createElement('div');
    celsiusContainer.classList.add(
      'position-absolute',
      'w-100',
      'h-100',
      'd-flex',
      'flex-column'
    );

    let celsiusTemp = document.createElement('div');
    celsiusTemp.classList.add('celsius-temp');
    celsiusTemp.innerHTML = cityInfo.tempF.temp;

    let minMaxDivC = document.createElement('div');

    let minTempC = document.createElement('div');
    minTempC.innerHTML = cityInfo.tempC.temp_min;

    let maxTempC = document.createElement('div');
    maxTempC.innerHTML = cityInfo.tempC.temp_max;

    minMaxDivC.append(minTempC, maxTempC);

    celsiusContainer.append(celsiusTemp, minMaxDivC);

    infoDiv.append(celsiusContainer);

    cityDiv.appendChild(infoDiv);
  }

  return { addButtonFunctionality, randomCities, createWeatherInfo };
})();

export default Dom;
