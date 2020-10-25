// DOM Elements
const todayTime = document.querySelector(".today-time");
const todayDate = document.querySelector(".today-date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const nextBackground = document.querySelector(".next-background");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const buttonRefreshQuote = document.querySelector(".button-refresh-quote");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const errorMessage = document.querySelector(".error-message");
// Date
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();
let weekDay = today.getDay();
let dayPart = "";
// Show Time
let showTime = () => {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  todayTime.innerHTML = `${hour}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)} `;
  setTimeout(showTime, 1000);
};
// Show date
let showDate = () => {
  switch (weekDay) {
    case 0:
      weekDay = "Воскресение";
      break;
    case 1:
      weekDay = "Понедельник";
      break;
    case 2:
      weekDay = "Вторник";
      break;
    case 3:
      weekDay = "Среда";
      break;
    case 4:
      weekDay = "Четверг";
      break;
    case 5:
      weekDay = "Пятница";
      break;
    case 6:
      weekDay = "Суббота";
      break;
    default:
      break;
  }

  switch (month) {
    case 0:
      month = "Январ";
      break;
    case 1:
      month = "Февраля";
      break;
    case 2:
      month = "Марта";
      break;
    case 3:
      month = "Апреля";
      break;
    case 4:
      month = "Мая";
      break;
    case 5:
      month = "Июня";
      break;
    case 6:
      month = "Июля";
      break;
    case 7:
      month = "Августа";
      break;
    case 8:
      month = "Сентября";
      break;
    case 9:
      month = "Октября";
      break;
    case 10:
      month = "Ноября";
      break;
    case 11:
      month = "Декабря";
      break;
    default:
      break;
  }
  todayDate.innerHTML = `${weekDay}, ${day} ${month}`;
};
// Add Zeros
let addZero = (n) => (parseInt(n, 10) < 10 ? "0" : "") + n;
//Create backgrounds sets arr
let createRandomImagesSet = () => {
  const result = [];
  for (let i = 0; i < 6; i++) {
    let random = Math.ceil(Math.random() * 23) + ".jpg";
    if (!result.includes(random)) {
      result.push(random);
    } else {
      i--;
    }
  }
  return result;
};

let createImagesSet = (dayPart) => {
  const result = [];
  const images = createRandomImagesSet();
  for (let i = 0; i < 6; i++) {
    result.push(`./assets/images/${dayPart}/${images[i]}`);
  }
  return result;
};

let createImagesSetAllDay = () => {
  const result = [];
  const dayParts = ["night", "morning", "day", "evening"];
  dayParts.forEach((element) => {
    result.push(createImagesSet(element));
  });
  return result.flat();
};

const dayImagesArr = createImagesSetAllDay();

// Set Background and Greeting
let bgIndex=0;
let changeBackground = (index) => {
  const img = document.createElement("img");
  const src = dayImagesArr[index];
  console.log(src);
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };
};

let setBgGreet = () => {
  let today = new Date(),
    hour = today.getHours();
  changeBackground(hour);
  switch (true) {
    case hour >= 6 && hour < 12:
      //morning
      dayPart = "morning";
      greeting.textContent = "Доброе утро, ";
      break;
    case hour >= 12 && hour < 18:
      //day
      dayPart = "day";
      greeting.textContent = "Добрый день, ";
      break;
    case hour >= 18 && hour < 24:
      //evening
      dayPart = "evening";
      greeting.textContent = "Добрый вечер, ";
      document.body.style.color = "white";
      break;
    default:
      //night
      dayPart = "night";
      greeting.textContent = "Доброй ночи, ";
      document.body.style.color = "white";
      break;
  }
};
// Get Name
let getName = () => {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Введите ваше имя]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
};
// Set Name
let setName = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (name.textContent.trim() === "") {
        getName();
        name.blur();
      } else {
        localStorage.setItem("name", e.target.innerText);
        name.blur();
      }
    }
  } else if (e.type === "click") {
    name.textContent = "";
  } else {
    getName();
  }
};
// Get Focus
let getFocus = () => {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Введите вашу цель]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
};
// Set Focus
let setFocus = (e) => {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent.trim() === "") {
        getFocus();
        focus.blur;
      } else {
        localStorage.setItem("focus", e.target.innerText);
        focus.blur();
      }
    }
  } else if (e.type === "click") {
    focus.textContent = "";
  } else {
    getFocus();
  }
};
// Get City
const getCity = () => {
  if (localStorage.getItem("city") === null) {
    city.textContent = "Введите город";
  } else {
    city.textContent = localStorage.getItem("city");
  }
};
// Set City
const setCity = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (city.textContent.trim() === "") {
        getCity();
        city.blur();
      } else {
        localStorage.setItem("city", e.target.innerText);
        getWeather();
        city.blur();
      }
    }
  } else if (e.type === "click") {
    city.textContent = "";
  } else {
    getCity();
  }
};
//Get Quote
let getQuote = async () => {
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json();
  quote.textContent = data.quote.body;
  author.textContent = data.quote.author;
};
//Get Weather
let getWeather = async () => {
  if (city.textContent !== "[Введите город]" && city.textContent.trim !== "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=c3b6e8f10d1801b1a5c42ed7cda17b67&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.message !== "city not found") {
      weatherIcon.className = "weather-icon owf";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      humidity.textContent = `Влажность воздуха: ${data.main.humidity}%`;
      windSpeed.textContent = `Скорость ветра: ${data.wind.speed} м/c`;
      errorMessage.textContent = "";
    } else {
      errorMessage.textContent = "Город не найден";
      weatherIcon.className = "weather-icon owf";
      weatherIcon.style.display = "none";
      temperature.textContent = "";
      humidity.textContent = "";
      windSpeed.textContent = "";
    }
  }
};

//EventListeners
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("click", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", setFocus);
city.addEventListener("keypress", setCity);
city.addEventListener("click", setCity);
city.addEventListener("blur", setCity);
let now = new Date().getTime();
const delay = 1000;
nextBackground.addEventListener("click", () => {
  let start = new Date().getTime();
  if (start - now <= 1000) {
    return;
  }
  bgIndex++;
  if (bgIndex > 23) {
    bgIndex = 0;
  }
  changeBackground(bgIndex);
  now = start;
});
buttonRefreshQuote.addEventListener("click", getQuote);

// Run
document.addEventListener("DOMContentLoaded", showTime);
document.addEventListener("DOMContentLoaded", showDate);
document.addEventListener("DOMContentLoaded", setBgGreet);
document.addEventListener("DOMContentLoaded", getName);
document.addEventListener("DOMContentLoaded", getFocus);
document.addEventListener("DOMContentLoaded", getCity);
document.addEventListener("DOMContentLoaded", getWeather);
document.addEventListener("DOMContentLoaded", getQuote);
