const City = (() => {
  async function getCity(city) {
    const cityWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4cc6db5c47a2fa3608fe302dad1dd2dc`,
      { mode: 'cors' }
    );
    const temperature = cityWeather.json();
    console.log(temperature);
  }

  return { getCity };
})();

export default City;
