document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'cb0e87c0181b44bd15562ac8e6d5c05e'; // your API key
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const weatherCard = document.getElementById('weather-card');
    const errorMessage = document.getElementById('error-message');
  
    searchBtn.addEventListener('click', function () {
      const city = cityInput.value.trim();
  
      if (city) {
        getWeather(city);
      } else {
        showError('Please enter a city name');
      }
    });
  
    function getWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('City not found');
          }
          return response.json();
        })
        .then(data => {
          showWeather(data);
        })
        .catch(error => {
          showError(error.message);
        });
    }
  
    function showWeather(data) {
      document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('current-date').textContent = new Date().toDateString();
      document.getElementById('temp').textContent = Math.round(data.main.temp);
      document.getElementById('weather-description').textContent = data.weather[0].description;
      document.getElementById('wind-speed').textContent = Math.round(data.wind.speed * 3.6);
      
      const icon = data.weather[0].icon;
      document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.getElementById('weather-icon').alt = data.weather[0].main;
  
      errorMessage.textContent = '';
      weatherCard.style.display = 'flex';
    }
  
    function showError(msg) {
      errorMessage.textContent = msg;
      weatherCard.style.display = 'none';
    }
  });
  