let date = new Date();
let hour = date.getHours();
let seconds = date.getSeconds();
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

now.innerHTML = `${day}, ${hour}:${seconds}`;

let form = document.querySelector(".form-inline");
form.addEventListener("submit", cityName);
form.addEventListener("click", findLocation);

function findLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "d5a9797d04dfcba9c635bfe427e5967c";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(temperature);
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
}
function temperature(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector("#cityDisplayed");
  displayCity.innerHTML = `${cityName}`;
  let temperatureRound = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperatureRound}`;

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

//function celsiusTemperature() {
//let celsius = document.querySelector("#current-temperature");
//// celsius.innerHTML = `19`;
////}
//function farenheitTemperature() {
//let farenheit = document.querySelector("#current-temperature");
//farenheit.innerHTML = `66`;
//}

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", celsiusTemperature);
//let farenheit = document.querySelector("#farenheit");
//farenheit.addEventListener("click", farenheitTemperature);
