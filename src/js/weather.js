const searchBox = document.querySelector('.js-input-search')
const nameCity = document.querySelector('.js-city')
const date = document.querySelector('.js-date')
const iconWeather = document.querySelector('.js-icon')
const tempMid = document.querySelector('.js-temp-mid')
const loader = document.querySelector('.js-loader')
const refresh = document.querySelector('.js-weather-main__redo')

const api = {
  key: '2f887e5d1ea0b70b225c193184f78cd2',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
let now = new Date()

const getCurrentPosition = position => {
  const { latitude, longitude } = position.coords
  fetchApi(`${api.baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
}

const getResults = query => {
  fetchApi(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
}

const fetchApi = url => {
  loader.hidden = false
  fetch(`${url}`)
    .then(status)
    .then(response => response.json())
    .then(displayWeather)
    .catch(error)
}

const status = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  if (response.status >= 200 && response.status < 300) {
    loader.hidden = true
    return Promise.resolve(response)
  }
}

const displayWeather = data => {
  const { main, icon } = data.weather[0]
  nameCity.innerText = `${data.name},${data.sys.country}`
  date.innerText = now.toDateString()
  iconWeather.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`
  tempMid.innerHTML = data.main.temp
  displaybackgroundImage(main)
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
      document.body.style.backgroundImage = `url('http://cms.kienthuc.net.vn/zoomh/500/uploaded/hongngan/2016_04_25/d/anh-dong-an-tuong-dap-tan-ao-tuong-ve-giong-bao-hinh-3.gif')`
      break;
    case 'Drizzle':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    case 'Rain':
      document.body.style.backgroundImage = `url('https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`
      break;
    default:
      document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/9c/59/03/9c5903bfb06d555bc904412625f11998.jpg')`
      break;
  }
}

const error = err => {
  alert(`City not found`);
  loader.hidden = true
}

export const weather = _ => {
  navigator.geolocation.getCurrentPosition(getCurrentPosition)

  searchBox.addEventListener('keypress', e => {
    if (e.keyCode === 13 && e.target.value !== '') {
      getResults(e.target.value)
      e.target.value = ''
    }
  })

  refresh.addEventListener('click', _ => {
    getResults(nameCity.innerText)
  })
}