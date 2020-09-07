const searchBox = document.querySelector('.js-input-search')
const nameCity = document.querySelector('.js-city')
const date = document.querySelector('.js-date')
const icon = document.querySelector('.js-icon')
const tempMin = document.querySelector('.js-temp-min')
const tempMid = document.querySelector('.js-temp-mid')
const tempMax = document.querySelector('.js-temp-max')
const api = {
  key: '2f887e5d1ea0b70b225c193184f78cd2',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
let now = new Date()

const error = err => console.warn(`ERROR(${err.code}): ${err.message}`);

const success = pos => {
  fetch(`${api.baseUrl}weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${api.key}`)
  .then(respons => respons.json())
  .then(displayWeather)
  .catch(error)
}

const getResults = query => {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
  .then(respons => respons.json())
  .then(displayWeather)
  .catch(error)
}

const displayWeather =  data => {
  nameCity.innerText = `${data.name} ,${data.sys.country}`
  date.innerText = now.toDateString()
  icon.innerHTML = `<div class="icon js-icon" style="background-image: url('http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png');"></div>`
  tempMin.innerText = data.main.temp_min
  tempMid.innerText = data.main.temp
  tempMax.innerText = data.main.temp_max
  console.log(data)
}

export const weather = _=> {
      navigator.geolocation.getCurrentPosition(success)
  
  searchBox.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      getResults(e.target.value)
    }
  })

}