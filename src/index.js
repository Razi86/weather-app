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
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${inputCity}&key=${APIkey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", currentLocation);
window.addEventListener("load", currentLocation);

function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${APIkey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
    city.innerHTML = response.data.city;
    temperatureSpan.innerHTML = Math.round(response.data.daily[0].temperature.day);
    desc.innerHTML = response.data.daily[0].condition.description;
    humidity.innerHTML = response.data.daily[0].temperature.humidity;
    wind.innerHTML = Math.round(response.data.daily[0].wind.speed);
    currentImage.setAttribute("src", response.data.daily[0].condition.icon_url);
    currentImage.setAttribute("alt", response.data.daily[0].condition.icon);
    ForecastDay(response.data.daily);
}

let forecast = document.querySelector(".forecast");
let forecastHtml = "";

function ForecastDay(forecastDays) {
    forecastDays.forEach((day, index) => {
        if (index < 4) {
            forecastHtml += `<div class="col py-3 mx-3 text-center">
            <h6>${ForecastTime(day.time)}</h6>
            <img class="forecast-img" src="${day.condition.icon_url}" alt="${day.condition.icon}">
            <p class="pt-3">${Math.round(day.temperature.minimum)}° ${Math.round(day.temperature.maximum)}°</p>
            </div>`;
        }
    })

    forecast.innerHTML = forecastHtml;
}

function ForecastTime(time) {
    const forecastDaysOfWeek = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];
    let forecastTime = new Date(time * 1000);
    let forecastDay = forecastTime.getDay();
    return forecastDaysOfWeek[forecastDay];
}