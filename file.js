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

function temp(search) {
  console.log(search.data);
  let temperate = Math.round(search.data.main.temp);
  let id = document.getElementById("temperat");
  id.innerHTML = temperate;
  let name = search.data.name;
  let h1 = document.querySelector("#name");
  h1.innerHTML = name;
  let hum = search.data.main.humidity;
  let humin = document.getElementById("humin");
  humin.innerHTML = `Humidity:${hum}%`;
  let windy = Math.round(search.data.wind.speed);
  let speed = document.getElementById("Wind");
  speed.innerHTML = `Windspeed:${windy}km/h`;
  let descrip = search.data.weather[0].description;
  let description = document.getElementById("description");
  description.innerHTML = `Description:${descrip}`;
  let icon = search.data.weather[0].icon;
  let iconn = document.querySelector("#icon");
  iconn.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Durban&&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(temp);

function temperature(response) {
  console.log(response.data);
  let temperate = Math.round(response.data.main.temp);
  let id = document.getElementById("temperat");
  id.innerHTML = temperate;
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
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

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

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
