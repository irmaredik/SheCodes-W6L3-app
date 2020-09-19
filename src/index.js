let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];

let now = document.querySelector(".now");

now.innerHTML = `${day}, ${hour}:${minutes}`;

let form = document.querySelector(".form-inline");
form.addEventListener("submit", cityName);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function displayForcast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="class-2">
  <h3>
    ${formatHours(forecast.dt * 1000)}
  </h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" /> <div class="weather-forecast-temperature"><strong>${Math.round(
      forecast.main.temp_max
    )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
</div>`;
  }
}

function cityName(event) {
  event.preventDefault();
  let displayCity = document.querySelector("#cityDisplayed");
  let input = document.querySelector("#city");

  displayCity.innerHTML = `${input.value}`;
  let units = "metric";
  let apiKey = "09ab1128d648c3c20978f99199981bde";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(temperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForcast);
}
function temperature(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector("#cityDisplayed");
  displayCity.innerHTML = `${cityName}`;
  let temperatureRound = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperatureRound}`;

  celsiusTemperature = response.data.main.temp;

  let weatherDescription = response.data.weather[0].main;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${weatherDescription}`;

  let humidityMain = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityMain}%`;

  let windMain = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windMain} km/h`;

  let iconElement = document.querySelector("#icon-now");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function farenheitTemperature(event) {
  event.preventDefault();

  let farenheitNow = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(farenheitNow);
  celsius.classList.remove("active");
  farenheit.classList.add("active");
}

function celsiusTemperatureDisplay(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  farenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsiusTemperature = null;
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", farenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemperatureDisplay);
