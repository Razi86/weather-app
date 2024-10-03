let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday ",
];
let day = daysOfWeek[date.getDay()];
let showDay = document.querySelector(".date");
showDay.innerHTML = `${day} ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let searchIcon = document.querySelector(".fa-search");
searchIcon.addEventListener("click", search);

let APIkey = "d03082f141493054be15a6be78fc6dd5";
let city = document.querySelector("#city-name");
let temperatureSpan = document.querySelector("#temperature");
let desc = document.querySelector(".desc");
let realFeel= document.getElementById("realFeel");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${APIkey}`;
  axios.get(apiUrl).then(showTemperature);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", currentLocation);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  city.innerHTML = response.data.name;
  temperatureSpan.innerHTML = Math.round(response.data.main.temp);
  desc.innerHTML = response.data.weather[0].description;
  realFeel.innerHTML = response.data.main.feels_like;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let changeToC = document.querySelector("#change-to-C");
let changeToF = document.querySelector("#change-to-F");
let tempIsCentigrade = true;
changeToC.addEventListener("click", toCentigrade);
function toCentigrade(event) {
  event.preventDefault();
  let temperature = temperatureSpan.innerHTML;
  if (!tempIsCentigrade) {
    temperatureSpan.innerHTML = Math.round((temperature - 32) / 1.8);
    tempIsCentigrade = true;
  }
}

changeToF.addEventListener("click", toFahrenheit);
function toFahrenheit(event) {
  event.preventDefault();
  let temperature = temperatureSpan.innerHTML;
  if (tempIsCentigrade) {
    temperatureSpan.innerHTML = Math.round(1.8 * temperature + 32);
    tempIsCentigrade = false;
  }
}
