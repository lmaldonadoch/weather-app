const City = (() => {
  const weatherKey = '4cc6db5c47a2fa3608fe302dad1dd2dc';
  async function getCity(city) {
    const fahrenheit = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=imperial`,
      { mode: 'cors' }
    );
    const celsius = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`,
      { mode: 'cors' }
    );
    const temperatureF = fahrenheit.json();
    const temperatureC = celsius.json();

    console.log(temperatureF, temperatureC);
  }

  return { getCity };
})();

export default City;
