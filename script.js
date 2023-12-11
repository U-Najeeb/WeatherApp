const container = document.querySelector(".app__container");
const degrees = document.querySelector(".degrees");
const city = document.querySelector(".city");
const search = document.querySelector(".search__box");
const button = document.querySelector(".submit__button");
const form = document.querySelector(".header__form");
const wind = document.querySelector(".wind__speed");
const humid = document.querySelector(".humidity__percentage");
const image = document.querySelector(".weather__image");
// import { Countries } from "./resources";

const API_KEY = "238936edbaadb5acc2ea944267d24159";

const renderData = (response) => {
  const celciusToKelvin = 274.15;
  const celcius = response.main.temp - celciusToKelvin;
  const windSpeed = (response.wind.speed * 3600) / 1000;
  const humidity = response.main.humidity;
  // const { main } = response.weather[0];
  city.textContent = `${response.name}, ${response.sys.country}`;
  degrees.textContent = `${Math.floor(celcius)}°C`;
  wind.textContent = `${windSpeed.toFixed(2)}Km/h`;
  humid.textContent = `${humidity}%`;
  // image.src = `./assets/${main.toLowerCase()}.png`;
};

const getData = async (city_name) => {
  try {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
    );
    const response = await request.json();
    renderData(response);
    document.querySelector(".errorMsg").innerHTML = " "
    
  } catch (error) { 
    document.querySelector(".errorMsg").innerHTML = "Not Found😥"
  }
};

form.addEventListener("input", (e) => {
  e.preventDefault();
  const interval = setInterval(() => {
    const searchResult = search.value;
    if (!searchResult) {
      search.style.border = "5px solid red";
    } else {
      search.style.border = "2px solid white";
      getData(`${searchResult.toLowerCase()}`);
    }
    return clearInterval(interval)
  }, 800)
});
