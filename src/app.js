let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let today = document.querySelector(`#currentDate`);
today.innerHTML = `${day}, ${month} ${date}, ${hour}:${mins}`;

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let conditionElement = document.querySelector("#currentCondition");
  conditionElement.innerHTML = response.data.weather[0].description;
  let feelElement = document.querySelector("#currentFeel");
  feelElement.innerHTML = `feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  let precipitationElement = document.querySelector("#currentPrecipitation");
  let windElement = document.querySelector("#currentWind");
  windElement.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
  let humidityElement = document.querySelector("#currentHumidity");
  humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
let apiKey = "dac7ababb64b3ca8acde2e00719b2bea";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value)
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
