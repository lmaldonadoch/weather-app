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
    const fahrenheit = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=imperial`,
      { mode: 'cors' }
    );
    const celsius = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`,
      { mode: 'cors' }
    );
    const temperatureF = await fahrenheit.json();
    const temperatureC = await celsius.json();

    return [temperatureF, temperatureC];
  }

  function cityObject(index, city = null) {
    let cityInfo = {};
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
    const imageURLJSON = await fetch(
      `https://source.unsplash.com/1600x900/?${city}-city`,
      { mode: 'cors' }
    );

    return imageURLJSON;
  }

  function displayRandomCity(array) {
    let i = 4;
    while (i > 0) {
      let random = Math.floor(Math.random() * 15);
      if (displayingCapitals.includes(capitals[random])) {
        continue;
      } else {
        displayingCapitals.push(capitals[random]);
        i -= 1;
      }
    }

    displayingCapitals.forEach((capital, index) => {
      let city = array[index];
      getImage(capital).then((response) => {
        city.style.backgroundImage = `url(${response.url})`;
      });
    });
  }

  function saveCity(city) {
    localStorage.setItem('city', JSON.stringify(city));
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
