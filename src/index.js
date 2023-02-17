let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday ",
    "Sunday"
];
let day = daysOfWeek[date.getDay()];
let showDay = document.querySelector(".date");
showDay.innerHTML = `${day} ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let searchIcon = document.querySelector(".fa-search");
searchIcon.addEventListener("click", search);

let APIkey = "7t084503b2od5f40d89cabff66496e40";
let city = document.querySelector("#city-name");
let temperatureSpan = document.querySelector("#temperature");
let desc = document.querySelector(".desc");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let currentImage = document.querySelector(".current-temp-image");

function search(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#search-input").value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity}&key=${APIkey}&units=metric`;
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
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${APIkey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
    city.innerHTML = response.data.city;
    temperatureSpan.innerHTML = Math.round(response.data.temperature.current);
    desc.innerHTML = response.data.condition.description;
    humidity.innerHTML = response.data.temperature.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    currentImage.setAttribute("src", response.data.condition.icon_url);
    currentImage.setAttribute("alt", response.data.condition.icon);
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
        changeToC.classList.add("active");
        changeToF.classList.remove("active");
        tempIsCentigrade = true;
    }
}

changeToF.addEventListener("click", toFahrenheit);

function toFahrenheit(event) {
    event.preventDefault();
    let temperature = temperatureSpan.innerHTML;
    if (tempIsCentigrade) {
        temperatureSpan.innerHTML = Math.round(1.8 * temperature + 32);
        changeToF.classList.add("active");
        changeToC.classList.remove("active");
        tempIsCentigrade = false;
    }
}