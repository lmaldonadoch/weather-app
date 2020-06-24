const City = (() => {
  const weatherKey = '4cc6db5c47a2fa3608fe302dad1dd2dc';

  const capitals = [
    'London',
    'Ontario',
    'Mexico',
    'New York',
    'Madrid',
    'Paris',
    'Amsterdam',
    'Brussels',
    'Cairo',
    'Sao Paulo',
    'Santiago',
    'New Delhi',
    'Lima',
    'Rome',
    'Berlin',
    'Tokio',
    'Beijing',
  ];

  const displayingCapitals = [];

  async function getCity(city) {
    try {
      const fahrenheit = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=imperial`,
        { mode: 'cors' },
      );
      const celsius = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`,
        { mode: 'cors' },
      );
      const temperatureF = await fahrenheit.json();
      const temperatureC = await celsius.json();

      return [temperatureF, temperatureC];
    } catch (error) {
      return 'I am sorry but I could not find the city you are looking for. Please check your spelling';
    }
  }

  function cityObject(index, city = null) {
    const cityInfo = {};
    if (city === null) {
      getCity(displayingCapitals[index]).then((response) => {
        cityInfo.tempF = response[0].main;
        cityInfo.tempC = response[1].main;
        cityInfo.weather = response[0].weather[0].main;
        cityInfo.weatherIcon = `http://openweathermap.org/img/wn/${response[0].weather[0].icon}@2x.png`;
        cityInfo.name = response[0].name;
      });
    } else {
      getCity(city).then((response) => {
        cityInfo.tempF = response[0].main;
        cityInfo.tempC = response[1].main;
        cityInfo.weather = response[0].weather[0].main;
        cityInfo.weatherIcon = `http://openweathermap.org/img/wn/${response[0].weather[0].icon}@2x.png`;
        cityInfo.name = response[0].name;
      });
    }
    return cityInfo;
  }

  async function getImage(city) {
    try {
      const imageURLJSON = await fetch(
        `https://source.unsplash.com/1600x900/?${city}-city`,
        { mode: 'cors' },
      );
      return imageURLJSON;
    } catch (error) {
      const rescueURL = {
        url:
          'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
      };
      return rescueURL;
    }
  }

  function displayRandomCity(array) {
    let i = 4;
    while (i > 0) {
      const random = Math.floor(Math.random() * 17);
      if (!displayingCapitals.includes(capitals[random])) {
        displayingCapitals.push(capitals[random]);
        i -= 1;
      }
    }

    displayingCapitals.forEach((capital, index) => {
      const city = array[index];
      getImage(capital).then((response) => {
        if (response === 'error') {
          city.style.backgroundImage = 'url(https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)';
        } else {
          city.style.backgroundImage = `url(${response.url})`;
        }
      });
    });
  }

  function saveCity(city) {
    localStorage.setItem('city', JSON.stringify(city));
    window.location.reload();
  }

  return {
    getCity,
    getImage,
    displayRandomCity,
    cityObject,
    displayingCapitals,
    saveCity,
  };
})();

export default City;
