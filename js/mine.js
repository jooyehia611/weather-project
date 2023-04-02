//Today's Card Variables:                                                   داتا اول كارد عندى
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    //Next Days Variables:                           الاتنين كاردز الى بعد اليوم الاول الى لسه هعرض فيهم
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description");
   currentCity = "Cairo",


  monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],

  // 3mlt array days 3shan a7l mawdo3 el date object
   days = [
     "Sunday",
     "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
  ];



// to get api
async function getWeatherData(){
 apiResppnse =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=dfd38cfaeb4f48bf92a185629232703&q=${currentCity}&days=7`);
 response = await apiResppnse.json();
console.log(response);

displayTodayWeather();
displayNextDays();
getCoordintes();
}
getWeatherData();

// to display weather
let date = new Date();  


function displayTodayWeather(){
  // object b2dr a3rf 3n tare2o el youm and month and year currently
  console.log(date);
  // 3shan a3rd el youm
  today.innerHTML = days[date.getDay()];
  // 3shan a3rd el month w gmbo el day 3shan kda 3mlt concat
  todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = response.location.name;
  todayDegree.innerHTML = response.current.temp_c ;
  // 3shan bt3aml m3 src 7tet https::
  todayIcon.setAttribute("src" , `https:${response.current.condition.icon}`);
  description.innerHTML = response.current.condition.text;
  humidty.innerHTML = response.current.humidity;
  wind.innerHTML = response.current.wind_kph;
  compass.innerHTML = response.current.wind_dir;
}

function displayNextDays(){
  for(let i = 0 ; i<nextDay.length ; i++){
    nextDay[i].innerHTML = days[new Date(response.forecast.forecastday[i+1].date).getDay()];
    nextDayIcon[i].setAttribute("src" ,`https:${response.forecast.forecastday[i+1].day.condition.icon}` );
    maxDegree[i].innerHTML = response.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML = response.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDescription[i].innerHTML = response.forecast.forecastday[i+1].day.condition.text;
  }
}

searchBar.addEventListener("keyup",function(){
 currentCity = searchBar.value;
 getWeatherData(currentCity);
});


// Step 1: Get user coordinates
function getCoordintes() {
  var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
  };

  function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates);
      return;

  }

  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
  var xhr = new XMLHttpRequest();
  var lat = coordinates[0];
  var lng = coordinates[1];

  // Paste your LocationIQ token below.
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.a5568d6377fca45fe1cf9882ee9d385b&lat=" +
  lat + "&lon=" + lng + "&format=json", true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var city = response.address.city;
          console.log(city);
          return;
      }
  }
}





