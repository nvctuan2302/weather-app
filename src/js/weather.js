const searchBox = document.querySelector('.js-input-search')
const nameCity = document.querySelector('.js-weather-main__city')
const date = document.querySelector('.js-weather-main__date')
const iconWeather = document.querySelector('.js-icon-weather')
const temp= document.querySelector('.js-weather-main__temp')
const loader = document.querySelector('.js-loader')
const iconRedo = document.querySelector('.js-weather-main__icon-redo')
const api = {
  key: '2f887e5d1ea0b70b225c193184f78cd2',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
let currentDate = new Date()

const changeStateLoader = state => loader.hidden = state ? '' : 'false'

const getCurrentPosition = position => {
  const { latitude, longitude } = position.coords
  fetchApi(`${api.baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
}

const getResults = query => {
  fetchApi(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
}

const fetchApi = url => {
  changeStateLoader(true)
  fetch(`${url}`)
    .then(status)
    .then(displayWeather)
    .catch(error)
}

const status = response => {
  if (response.status >= 200 && response.status < 300) {
    changeStateLoader(false)
    return response.json()
  }
}

const displayWeather = data => {
  const { main, icon } = data.weather[0]

  nameCity.innerText = `${data.name},${data.sys.country}`
  date.innerText = currentDate.toDateString()
  iconWeather.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`
  temp.innerHTML = data.main.temp
  displaybackgroundImage(main)
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
  alert("City not found")
  changeStateLoader(false)
}

export const weather = _ => {
  navigator.geolocation.getCurrentPosition(getCurrentPosition)

  searchBox.addEventListener('keypress', e => {
    if (e.keyCode === 13 && e.target.value !== '') {
      getResults(e.target.value)
      e.target.value = ''
    }
  })

  iconRedo.addEventListener('click', _ => {
    getResults(nameCity.innerText)
  })
}
