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

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily.slice(0, 5);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${formateDay(
                  forecastDay.time
                )}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="36px"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}°C|</span
                  ><span class="weather-forecast-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}°C</span>
                </div>
              </div>
            
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "o090cfbt4034bec9a20a47322cfbf3e8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#currentCondition");
  conditionElement.innerHTML = response.data.condition.description;
  let feelElement = document.querySelector("#currentFeel");
  feelElement.innerHTML = `feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  let precipitationElement = document.querySelector("#currentPrecipitation");
  let windElement = document.querySelector("#currentWind");
  windElement.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
  let humidityElement = document.querySelector("#currentHumidity");
  humidityElement.innerHTML = `humidity: ${response.data.temperature.humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
  celsiusTemp = response.data.temperature.current;
  celsiusFeelTemp = response.data.temperature.feels_like;
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "o090cfbt4034bec9a20a47322cfbf3e8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemp");
  let temperatureFeelElement = document.querySelector("#currentFeel");
  let fahrenheitFeelTemp = (celsiusFeelTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  temperatureFeelElement.innerHTML = `feels like: ${Math.round(
    fahrenheitFeelTemp
  )}°F`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let temperatureFeelElement = document.querySelector("#currentFeel");
  temperatureFeelElement.innerHTML = `feels like: ${Math.round(
    celsiusFeelTemp
  )}°C`;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemp = null;
let celsiusFeelTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Madrid");
