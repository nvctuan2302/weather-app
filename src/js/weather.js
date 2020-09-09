const searchBox = document.querySelector('.js-input-search')
const nameCity = document.querySelector('.js-city')
const date = document.querySelector('.js-date')
const iconWeather = document.querySelector('.js-icon')
const tempMin = document.querySelector('.js-temp-min')
const tempMid = document.querySelector('.js-temp-mid')
const tempMax = document.querySelector('.js-temp-max')
const loader = document.querySelector('.js-loader')
const contentMain = document.querySelector('.js-weather-main')
const api = {
  key: '2f887e5d1ea0b70b225c193184f78cd2',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
let now = new Date()

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
}

const apiFetch = _ => {

}

const success = position => {
  setInterval(_ => {
    const { latitude, longitude } = position.coords

    fetch(`${api.baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
      .then(status)
      .then(response => response.json())
      .then(displayWeather)
      .catch(error)
  }, 2000);
}

const getResults = query => {
  setInterval(_ => {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(respons => respons.json())
      .then(displayWeather)
      .catch(error)
  }, 2000);
}

const displayWeather = data => {
  const { temp_min, temp_max, temp } = data.main
  const { description, id, main, icon } = data.weather[0]

  contentMain.classList.add('is-active')
  loader.style.display = 'none'

  nameCity.innerText = `${data.name} ,${data.sys.country}`
  date.innerText = now.toDateString()
  iconWeather.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`
  tempMid.innerHTML = temp
  //   tempMin.innerText = temp_min
  //   tempMax.innerText = temp_max
  displaybackgroundImage(data.weather[0].main)
  console.log(data)
}

const displaybackgroundImage = data => {
  switch (data) {
    case 'Clouds':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    case 'Clear':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    case 'Drizzle':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    case 'Rain':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    case 'Snow':
      document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/9c/59/03/9c5903bfb06d555bc904412625f11998.jpg')`
      break;

    default:
      break;
  }
}

const error = err => console.warn(`ERROR(${err.code}): ${err.message}`);

export const weather = _ => {
  navigator.geolocation.getCurrentPosition(success)

  searchBox.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      getResults(e.target.value)
    }
  })

}