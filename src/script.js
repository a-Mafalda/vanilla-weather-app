function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
  return `${day}, ${month} ${todayDate} ${hours}:${minutes}` ;
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; 
let day = date.getDay();
return days[day];
}

function showForecast(response) {
    let forecastData = response.data.daily;
    let forecast = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    
    forecastData.forEach(function(forecastDay, index) { 
        if (index < 4) {
        forecastHTML =  forecastHTML + `
        <div class="col-md-3"> ${formatDay(forecastDay.dt)}
        <img src="img/iconsForecast/${forecastDay.weather[0].icon}.png" alt="" width="30px">
        
        </div>
         `; }
         }) 
    
    forecastHTML = forecastHTML + `</div>`;     
    forecast.innerHTML = forecastHTML;
        }
    

function callForecast(coordinates){
console.log(coordinates);
let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(showForecast);
}    

function showTemperature(response){
console.log(response.data);
let temperature = document.querySelector("#temperature");
temperature.innerHTML= Math.round(response.data.main.temp);
let city = document.querySelector("#currentCity");
city.innerHTML= response.data.name;
let description = document.querySelector("#weatherDescription");
description.innerHTML= response.data.weather[0].description;
let countryCode = document.querySelector("#countryCode");
countryCode.innerHTML= response.data.sys.country;
let tempMin = document.querySelector("#minTemp");
tempMin.innerHTML= Math.round(response.data.main.temp_min);
let tempMax = document.querySelector("#maxTemp");
tempMax.innerHTML= Math.round(response.data.main.temp_max);
let humidity = document.querySelector("#humidity");
humidity.innerHTML= Math.round(response.data.main.humidity);
let wind = document.querySelector("#wind");
wind.innerHTML= Math.round(response.data.wind.speed);
let date = document.querySelector("#date");
date.innerHTML= formatDate(response.data.dt * 1000);
let icon = document.querySelector("#mainIcon");
icon.setAttribute("src", `img/icons/${response.data.weather[0].icon}.png`);
icon.setAttribute("alt", response.data.weather[0].description);
 callForecast(response.data.coord);
celsiusTemperature = response.data.main.temp;
}


function search(city){
    let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

}

function submit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function searchLocation(position){
    let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function displayCurrentLocation(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", displayCurrentLocation);

function showFahrenheit(event){
 event.preventDefault();
 let temperature = document.querySelector("#temperature");
 celsiusValue.classList.remove("active");
 fahrenheitValue.classList.add("active");
 let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
 temperature.innerHTML = Math.round(fahrenheitTemperature);
 
}

function showCelsius(event){
  event.preventDefault();
  celsiusValue.classList.add("active");
  fahrenheitValue.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
 
}

let celsiusTemperature = null;

let form = document.querySelector("#search-engine");
form.addEventListener("submit", submit);
let fahrenheitValue = document.querySelector("#fahrenheit");
fahrenheitValue.addEventListener("click", showFahrenheit);
let celsiusValue = document.querySelector("#celsius");
celsiusValue.addEventListener("click", showCelsius);

// Favourite Cities 

function showCityOne(event){
 event.preventDefault();
 let cityOne = "Paris";
 let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOne}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showTemperature);
}
function showCityTwo(event){
 event.preventDefault();
 let cityTwo = "Rome";
 let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTwo}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showTemperature);
}
function showCityThree(event){
 event.preventDefault();
 let cityThree = "Madrid";
 let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityThree}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showTemperature);
}
function showCityFour(event){
 event.preventDefault();
 let cityFour = "London";
 let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFour}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showTemperature);
}
let cityOne = document.querySelector("#city1");
cityOne.addEventListener("click", showCityOne);
let cityTwo = document.querySelector("#city2");
cityTwo.addEventListener("click", showCityTwo);
let cityThree = document.querySelector("#city3");
cityThree.addEventListener("click", showCityThree);
let cityFour = document.querySelector("#city4");
cityFour.addEventListener("click", showCityFour);



search("Berlin");


