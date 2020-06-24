import City from './city';

const Dom = (() => {
  function changeActive(button) {
    [...document.getElementsByClassName('nav-link')].forEach((link) => {
      link.classList.remove('active');
    });

    button.classList.add('active');
  }

  function switchHidden(div) {
    [...document.getElementsByClassName('temp-container')].forEach(
      (container) => {
        if (container.id === div) {
          container.classList.remove('hidden');
        } else {
          container.classList.add('hidden');
        }
      }
    );
  }

  function addButtonFunctionality() {
    const searchButton = document.getElementById('search-button');
    searchButton.onclick = () => {
      City.getCity(form[0].value).then((response) => {
        City.saveCity(response);
      });
    };

    const celsiusButton = document.getElementById('celsius-select');
    celsiusButton.onclick = () => {
      changeActive(celsiusButton);
      switchHidden('celsius');
    };

    const fahrenheitButton = document.getElementById('fahrenheit-select');
    fahrenheitButton.onclick = () => {
      changeActive(fahrenheitButton);
      switchHidden('fahrenheit');
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
      'position-relative',
      'weather-info-container'
    );

    let cityNameDiv = document.createElement('div');
    cityNameDiv.classList.add('title');
    cityNameDiv.innerHTML = `${cityInfo.name} <img src = '${cityInfo.weatherIcon}' alt="">`;

    infoDiv.appendChild(cityNameDiv);

    createInfoCards(infoDiv, cityInfo);

    cityDiv.appendChild(infoDiv);
  }

  function createInfoCards(parentDiv, cityInfo) {
    // Fahrenheit temp container

    let fahrenheitContainer = document.createElement('div');
    fahrenheitContainer.classList.add(
      'position-absolute',
      'w-100',
      'h-100',
      'd-flex',
      'flex-column',
      'hidden',
      'temp-container',
      'fahrenheit'
    );
    fahrenheitContainer.setAttribute('id', 'fahrenheit');

    let fahrenheitTemp = document.createElement('div');
    fahrenheitTemp.classList.add('fahrenheit-temp');
    fahrenheitTemp.innerHTML = `${Math.floor(cityInfo.tempF.temp)} °F`;

    let minMaxDivF = document.createElement('div');
    minMaxDivF.classList.add(
      'd-flex',
      'flex-column',
      'justify-content-between',
      'minmax-temp'
    );

    let minTempF = document.createElement('div');
    minTempF.innerHTML = `min: ${Math.floor(cityInfo.tempF.temp_min)} °F`;

    let maxTempF = document.createElement('div');
    maxTempF.innerHTML = `max: ${Math.floor(cityInfo.tempF.temp_max)} °F`;

    minMaxDivF.append(minTempF, maxTempF);

    fahrenheitContainer.append(fahrenheitTemp, minMaxDivF);

    parentDiv.append(fahrenheitContainer);

    // Celsius temp container

    let celsiusContainer = document.createElement('div');
    celsiusContainer.classList.add(
      'position-absolute',
      'w-100',
      'h-100',
      'd-flex',
      'flex-column',
      'temp-container',
      'celsius'
    );
    celsiusContainer.setAttribute('id', 'celsius');

    let celsiusTemp = document.createElement('div');
    celsiusTemp.classList.add('celsius-temp');
    celsiusTemp.innerHTML = `${Math.floor(cityInfo.tempC.temp)} °C`;

    let minMaxDivC = document.createElement('div');
    minMaxDivC.classList.add(
      'd-flex',
      'flex-column',
      'justify-content-between',
      'minmax-temp'
    );

    let minTempC = document.createElement('div');
    minTempC.innerHTML = `min: ${Math.floor(cityInfo.tempC.temp_min)} °C`;

    let maxTempC = document.createElement('div');
    maxTempC.innerHTML = `max: ${Math.floor(cityInfo.tempC.temp_max)} °C`;

    minMaxDivC.append(minTempC, maxTempC);

    celsiusContainer.append(celsiusTemp, minMaxDivC);

    parentDiv.append(celsiusContainer);
  }

  function cityToDisplay(cityInfo, background) {
    const cityDiv = document.getElementById('main-city');
    cityDiv.style.backgroundImage = `url(${background})`;
    cityDiv.classList.add('city');
    let infoDiv = document.createElement('div');
    infoDiv.classList.add(
      'd-flex',
      'flex-column',
      'info',
      'temp-wrapper',
      'position-relative',
      'weather-info-container'
    );

    let cityNameDiv = document.createElement('div');
    cityNameDiv.classList.add('title');
    cityNameDiv.innerHTML = `${cityInfo.name} <img src = '${cityInfo.weatherIcon}' alt="">`;

    infoDiv.appendChild(cityNameDiv);

    createInfoCards(infoDiv, cityInfo);

    cityDiv.appendChild(infoDiv);
  }

  function errorMessage() {
    let cityDiv = document.getElementById('main-city');
    cityDiv.innerHTML =
      'I am sorry but I could not find the city you are looking for. Please check your spelling';
    cityDiv.classList.add(
      'error-message',
      'bg-danger',
      'text-light',
      'text-center'
    );
  }

  return {
    addButtonFunctionality,
    randomCities,
    createWeatherInfo,
    cityToDisplay,
    errorMessage,
  };
})();

export default Dom;
