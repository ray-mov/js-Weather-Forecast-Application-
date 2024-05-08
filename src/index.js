import { extractWeek, extractTime, todayWidget } from "./helper.js";
import { updateClock } from "./clock.js";
import { changeBackgroundWidget } from "./backgound.js";

// clock widget
updateClock()
setInterval(updateClock, 1000);

// today widget
todayWidget();

// seach by place btn
const seachBtn = document.getElementById("search-btn")
seachBtn.addEventListener("click", fetchWeatherData)


// search by current location btn
const searchByLocationBtn = document.getElementById("searchByLocation-btn")
searchByLocationBtn.addEventListener("click", fetchWeatherDataGeolocation)

// fucntion to get data from local storage
function getData() {
  const myData = localStorage.getItem("searchHistory");
  return myData == null ? [] : JSON.parse(myData)
}

//dropdown functions and population drop down

function populatedSeachistory() {

  const dropDownBtn = document.getElementById("dropdown-btn")
  dropDownBtn.addEventListener("click", showAndHideDropdownMenu)

  const history = getData()
  if (history) {
    const dropdownMenu = document.getElementById("dropdown-container")
    //removing previous html
    while (dropdownMenu.firstChild) {
      dropdownMenu.removeChild(dropdownMenu.firstChild);
    }

    history.forEach(item => {
      const text = document.createElement("h1")
      text.textContent = item;
      dropdownMenu.appendChild(text);
      text.addEventListener("click", () => {
        const innerContent = this.innerHTML;
        const inputElement = document.getElementById("searchInput")
        inputElement.value = innerContent;
        fetchWeatherData()
      })
    });
  }
}

populatedSeachistory()

function showAndHideDropdownMenu() {
  document.getElementById("dropdown-container").classList.toggle("hidden")
}

//  Search By place name function

async function fetchWeatherData() {

  const inputElement = document.getElementById("searchInput")
  const searchValue = inputElement.value;
  if (searchValue === "") {
    alert("Empty Input")
    return
  }


  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=66a1ffd908f3eb068e415a88e095603f&units=metric`)


    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else {
        throw new Error('Error fetching weather data');
      }
    }


    if (response.ok) {
      const data = await response.json()

      if (data.cod === "404") {
        alert(data.message)
        return
      }

      fiveDayForcast(data)

      const hourlyList = document.getElementById("hourly-list")


      // Looping through each child element and remove it
      // for clearing html if previously exit 
      while (hourlyList.firstChild) {
        hourlyList.removeChild(hourlyList.firstChild);
      }

      document.getElementById("temp-widget").textContent = `${data.list[1].main.temp}°`

      document.getElementById("description-widget").textContent = data.list[0].weather[0].description
      document.getElementById("place-widget").textContent = data.city.name

      // saving city name to local storage for search history

      const searchHistory = getData()


      // to eleminate duplicate history and remove if the item found
      // to show on prevous search

      searchHistory.forEach((item, index) => {
        if (item === data.city.name) {
          searchHistory.splice(index, 1);
        }
      })


      searchHistory.unshift(data.city.name)
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
      populatedSeachistory()



      changeBackgroundWidget(data.list[0].weather[0].description)

      // to show hourly (every 3 hours) forcast 6am to 12am 
      for (let i = 0; i < 8; i++) {
        const list = document.createElement("li")
        // list.classList.add("hourly-forcast-list")
        hourlyList.appendChild(list)
        const listItemTime = document.createElement("p")
        const listItemIcon = document.createElement("img")
        const listItemTemp = document.createElement("p")
        listItemTime.textContent = extractTime(data.list[i].dt_txt)
        listItemIcon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
        listItemTemp.textContent = `${data.list[i].main.temp}°C`

        //appending list
        list.appendChild(listItemTime);
        list.appendChild(listItemIcon);
        list.appendChild(listItemTemp);
      }

      // also populating 5 days of forcast

      fiveDayForcast(data)

    } else {
      throw new Error("Failed to fetch data")
    }
  } catch (error) {
    alert(error.message)
  }

}



//Search By geolocation function

async function fetchWeatherDataGeolocation() {

  //checking browser support 
  if ("geolocation" in navigator) {

    // Note to devs:: getCurrentPosition return 2 callback  success and failure

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      fetchData(lat, long)



    }, (err) => {

      //note fixed code 

      switch (err.code) {
        case err.PERMISSION_DENIED:
          console.err("User denied the request for Geolocation.");
          break;
        case err.POSITION_UNAVAILABLE:
          console.err("Location information is unavailable.");
          break;
        case err.TIMEOUT:
          console.err("The request to get user location timed out.");
          break;
        case err.UNKNOWN_err:
          console.err("An unknown err occurred.");
          break;
      }

    })

  } else {
    alert("Geolocation not support by browser")
  }

  // fetching and populating data 
  async function fetchData(lat, long) {

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=66a1ffd908f3eb068e415a88e095603f&units=metric`)

      if (response.ok) {
        const data = await response.json()


        const hourlyList = document.getElementById("hourly-list")

        // for clearing html if previously exit 
        while (hourlyList.firstChild) {
          hourlyList.removeChild(hourlyList.firstChild);
        }

        document.getElementById("temp-widget").textContent = `${data.list[1].main.temp}°`

        document.getElementById("description-widget").textContent = data.list[0].weather[0].description
        document.getElementById("place-widget").textContent = data.city.name

        changeBackgroundWidget(String(data.list[0].weather[0].description))
        // to show hourly (every 3 hours) forcast 6am to 12am 
        for (let i = 0; i < 8; i++) {
          const list = document.createElement("li")
          // list.classList.add("hourly-forcast-list")
          hourlyList.appendChild(list)
          const listItemTime = document.createElement("p")
          const listItemIcon = document.createElement("img")
          const listItemTemp = document.createElement("p")
          listItemTime.textContent = extractTime(data.list[i].dt_txt)
          listItemIcon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
          listItemTemp.textContent = `${data.list[i].main.temp}°C`

          //appending list
          list.appendChild(listItemTime);
          list.appendChild(listItemIcon);
          list.appendChild(listItemTemp);
        }

        //also populating 5 days of forcast

        fiveDayForcast(data)

      } else {
        throw new Error("Failed to fetch data")
      }
    } catch (error) {
      alert(error.message)

    }

  }

}



// 5 days forcast function

function fiveDayForcast(data) {
  const daysList = document.getElementById("days-list")
  // for clearing html if previously exit 
  while (daysList.firstChild) {
    daysList.removeChild(daysList.firstChild);
  }

  let i = 0
  while (i < 33) {
    const list = document.createElement("li")

    daysList.appendChild(list)
    const listItemTime = document.createElement("p")
    const listItemIcon = document.createElement("img")
    const listItemTemp = document.createElement("p")
    listItemTime.textContent = extractWeek(data.list[i].dt_txt)
    listItemIcon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
    listItemTemp.textContent = `${data.list[i].main.temp}°C`

    //appending list
    list.appendChild(listItemTime);
    list.appendChild(listItemIcon);
    list.appendChild(listItemTemp);

    i += 8;

    // // note openweather api provide upto list[39] 
    // if (i === 40) {
    //   i = 39
    // }




  }

}


