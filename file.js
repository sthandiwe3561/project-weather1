let now = new Date();
function date(dates) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Months = [
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

  let day = days[dates.getDay()];
  let Month = Months[dates.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let min = now.getMinutes();

  let today = `Today is ${day}, ${Month} ${date}, ${year}, ${hour}:${min}`;
  return today;
}
let p = document.querySelector("p");
p.innerHTML = date(now);

function temperature(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let id = document.getElementById("temperat");
  id.innerHTML = Math.round(celsiusTemp);
  let name = response.data.name;
  let h1 = document.querySelector("#name");
  h1.innerHTML = name;
  let hum = response.data.main.humidity;
  let humin = document.getElementById("humin");
  humin.innerHTML = `Humidity:${hum}%`;
  let windy = Math.round(response.data.wind.speed);
  let speed = document.getElementById("Wind");
  speed.innerHTML = `Windspeed:${windy}km/h`;
  let descrip = response.data.weather[0].description;
  let description = document.getElementById("description");
  description.innerHTML = `Description:${descrip}`;
  let icon = response.data.weather[0].icon;
  let iconn = document.querySelector("#icon");
  iconn.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}
function searchCity(city) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(temperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function search(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(temperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(search);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let fahrenheit = document.querySelector("#temperat");
  fahrenheit.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperat");
  fahrenheit.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

searchCity("Durban");
