// // console.log("this is my first code");

// let API_KEY = "87d96fc83e59690110dd0a3b75f6ef6e";

// function randerWeatherInfo(data) {
//   let newPara = document.createElement("p");
//   newPara.textContent = `${data?.main?.temp.toFixed(2)} °c`;

//   document.body.appendChild(newPara);
// }

// //api calling 1
// async function fetchWeatherDetails() {
//   try {
//     let city = "goa";

//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=87d96fc83e59690110dd0a3b75f6ef6e`
//     );

//     const data = await response.json();
//     console.log(" weather data:-> ", data);

//     randerWeatherInfo(data);
//   } catch (err) {
//     console.log("eror has been occur", err);
//   }
// }
// //api calling 2
// async function rndWeatherApi() {
//   try {
//     let lat = 23.3333;
//     let lon = 34.3433;

//     let result = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//     );

//     let data = await result.json();
//     console.log(data);

//     randerWeatherInfo(data);
//   } catch (err) {
//     console.log(" this is the error", err);
//   }
// }
// //switching betwen page
// function switchTab(clickedTab) {
//   apiErrorContainer.classlist.remove("active");

//   if (clickedTab !== currentTab) {
//     currentTab.classlist.remove("current-tab");
//     currentTab = clickedTab;
//     currentTab.classlist.add("current-tab");

//     if (!searchForm.classlist.contains("active")) {
//       userInfoContainer.classlist.remove("active");
//       grantAccessContainer.classlist.remove("active");
//       searchForm.classlist.add("active");
//     } else {
//       searchForm.classlist.remove("active");
//       userInfoContainer.classlist.remove("active");
//       getFromSessionStorage();
//     }
//     console.log("Current Tab ", currentTab);
//   }
// }
// //get current position
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     console.log("No geolocation supported");
//   }
// }

// function showPosition(position){
//     let lat = position.coords.latitude
//     let longi = position.coords.longitude

//     console.log(lat)
//     console.log(longi)
// }

// switching between the tabs
// ......................tab handling............................//
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccesscontainer = document.querySelector(
  ".grant-location-container"
);
const serachForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfocontainer = document.querySelector(".user-info-container");

//initially variavble need ?

let oldTab = userTab;
const API_KEY = "87d96fc83e59690110dd0a3b75f6ef6e";
//setting up default tab 
oldTab.classList.add("current-tab");
getFromSessionStorage();

// ek kam or pending hai ///
function switchTab(newTab) {
  if (newTab != oldTab) {
    oldTab.classList.remove("current-tab");
    oldTab = newTab;
    oldTab.classList.add("current-tab");

    if (!serachForm.classList.contains("active")) {
      //is search form container is invisible , if yes then make it visible
      userInfocontainer.classList.remove("active");
      grantAccesscontainer.classList.remove('active')
      serachForm.classList.add("active");
    } else {
      //main pehle search wale tab pr tha , ab your weather tab visible krna hai
      serachForm.classList.remove("active");
      userInfocontainer.classList.remove("active"); //yaha dhyan rkhna
      //now i am on your wather tab , rhen weathe bhi display is necessory , so lets local storage
      getFromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  //pass clicked tab as input parameter
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  //pass clicked tab as a input parameter
  switchTab(searchTab);
});

//fuvtion get session storage //check are already present in session storage 
function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    //if local coordinates is not given or avaiable
    grantAccesscontainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  //make grantContainer invisible
  grantAccesscontainer.classList.remove("active");
  //make loader visible
  loadingScreen.classList.add("active");

  //API CALL
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    loadingScreen.classList.remove("active");
    userInfocontainer.classList.add("active");
    renderWeatherInfo(data);
  } catch (error) {
    //mine work
    loadingScreen.classList.remove("active");
    console.log("error has been accur", error);
  }
}

//render weather info in ui 
function renderWeatherInfo(weatherInfo) {
  //firstly we have to fetch the element
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windspeed = document.querySelector("[data-windSpeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-cloudiness]");

  //fetch values from weatherinfo  object and put it ui elements
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;//description
  weatherIcon.scr = weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;;
  temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;

  windspeed.innerText =`${weatherInfo?.wind?.speed.toFixed(2)}m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

//current location finding
function getlocation() {          //2
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //show in alert for no geolocation support available
    alert("theren is no geolocation available for this input");
  }
}
//showing current position on the ui
function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");       //1
grantAccessButton.addEventListener("click", getlocation);



const searchInput = document.querySelector("[data-searchInput]");

serachForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;
  if (cityName === "") 
      return;
  else 
      fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfocontainer.classList.remove("active");
  grantAccesscontainer.classList.remove("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metrics`
    );
    const data = await response.json();

    loadingScreen.classList.remove("active");
    userInfocontainer.classList.add("active");

    renderWeatherInfo(data);
  } catch (error) {
    //mine work
    // loadingScreen.classList.remove('active')
    console.log("error has been accur"+ error);
  }
}
