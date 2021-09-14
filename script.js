
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  quote = document.querySelector('.quote'),
  buttonQuote = document.querySelector('.quote-button'),
  button = document.querySelector('#button');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const city = document.querySelector('.city');

const showAmPm = false;

function getQuotes() {
  let quotes = ['Happiness is not a destination. It is a method of life', 'There are so many beautiful reasons to be happy!', 'Be the best version of you', 'We do not remember days, we remember moments', 'The future belongs to those, who believe in beauty of their dreams', 'Every day is a new chance', 'The best is yet to come', 'Every day can not be good, but there is something good in every day', 'We do not remember days, we remember moments','Everyone has one\'s own path', 'Never say never', 'World belongs to the patient..', 'Everyone sees the world in one\'s own way','Never look back', 'While I\'m breathing - I love and believe', 'Live without regrets', 'Follow your heart', 'Be yourself', 'Lost time is never found again','Only my dream keeps me alive', 'Life is beautiful', 'Never stop dreaming','Don\'t let your mind kill your heart and soul','A man is not poor if he can still laugh', 'It is easier to forgive an enemy than to forgive a friend', 'Beauty is power - a smile is its sword', 'Life is a succession of lessons which must be lived to be understood', 'Those who cannot change their minds cannot change anything', 'Nothing is beautiful from every point of view', 'Have no fear of perfection - you’ll never reach it', 'You can\'t make your heart feel something it won\'t', 'Happiness is not a destination. It is a method of life', 'Do not squander time – this is stuff life is made of','An empty head serves as an excellent container for other\'s thoughts'];
  let item = quotes[Math.floor(Math.random()*quotes.length)];
  quote.textContent = item;
}

function showTime() {
  let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  let today = new Date(),
    day = today.getDate(),
    week = days[today.getDay()],
    month = months[today.getMonth()],
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
      
  time.innerHTML = `${week}<br>${day}&nbsp;${month}<br>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 10);
}


function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

const images = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
let bgIndex = 0;

function changeImgBg() {
  let today = new Date(),
    hour = today.getHours(),
    timeOfDay;
  if (hour >= 6 && hour < 12) {
    greeting.textContent = 'Good Morning, ';
    timeOfDay = 'morning';
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
    timeOfDay = 'day';
  } else if (hour >= 18 && hour < 24) {
    greeting.textContent = 'Good Evening, ';
    timeOfDay = 'evening';
    document.body.style.color = 'white';
  } else {
    greeting.textContent = 'Good Night, ';
    timeOfDay = 'night';
    document.body.style.color = 'white';
  }
  bgIndex ++;
  if (bgIndex > 19) {
    bgIndex = 0;
  }
  document.body.style.backgroundImage =
      `url(assets/images/${timeOfDay}/${images[bgIndex]}.jpg)`;
}

function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}


function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}


function setFocus(e) {
  if (e.type === 'keypress') {
    
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function checkTimeBg() {
  let today = new Date(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    if (min === 0 && sec === 0) {
      button.click();
    }
    setTimeout(checkTimeBg, 900);
}

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=b7b27d66df4da8f186662467ce22412f&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

getWeather();

name.addEventListener('click', function() {
    name.textContent = '';
});
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', function() {
    focus.textContent = '';
});
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
button.addEventListener('click', changeImgBg);
buttonQuote.addEventListener('click', getQuotes);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


showTime();
changeImgBg();
getName();
getFocus();
checkTimeBg();
getQuotes();
