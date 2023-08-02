// console.log("this is my first code");

let API_KEY = "87d96fc83e59690110dd0a3b75f6ef6e";

function randerWeatherInfo(data) {
  let newPara = document.createElement("p");
  newPara.textContent = `${data?.main?.temp.toFixed(2)} °c`;

  document.body.appendChild(newPara);
}

//api calling
async function fetchWeatherDetails() {
  try {
    let city = "goa";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=87d96fc83e59690110dd0a3b75f6ef6e`
    );

    const data = await response.json();
    console.log(" weather data:-> ", data);

    randerWeatherInfo(data);
  } catch (err) {
    console.log("eror has been occur", err);
  }
}

async function rndWeatherApi() {
  try {
    let lat = 23.3333;
    let lon = 34.3433;

    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    let data = await result.json();
    console.log(data);

    randerWeatherInfo(data);
  } catch (err) {
    console.log(" this is the error", err);
  }
}
//switching betwen page
function switchTab(clickedTab) {
  apiErrorContainer.classlist.remove("active");

  if (clickedTab !== currentTab) {
    currentTab.classlist.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classlist.add("current-tab");

    if (!searchForm.classlist.contains("active")) {
      userInfoContainer.classlist.remove("active");
      grantAccessContainer.classlist.remove("active");
      searchForm.classlist.add("active");
    } else {
      searchForm.classlist.remove("active");
      userInfoContainer.classlist.remove("active");
      getFromSessionStorage();
    }
    console.log("Current Tab ", currentTab);
  }
}
//get current position

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation supported");
  }
}

function showPosition(position){
    let lat = position.coords.latitude
    let longi = position.coords.longitude

    console.log(lat)
    console.log(longi)
}
