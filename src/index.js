import { extractDate, extractTime } from "./helper.js";
import { getGeolocation } from "./location.js";


// seach by place btn
const seachBtn = document.getElementById("search-btn")
seachBtn.addEventListener("click", fetchWeatherData)


// search by current location btn
const searchByLocationBtn = document.getElementById("searchByLocation-btn")
searchByLocationBtn.addEventListener("click", fetchWeatherDataGeolocation)


//  Search By name function

async function fetchWeatherData() {

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kokrajhar&appid=66a1ffd908f3eb068e415a88e095603f&units=metric`)

    if (response.ok) {
      const data = await response.json()
      const temp = data.list[0].main.temp
      const icon = data.list[0].weather[0].icon
      const date = data.list[0].dt_txt
      console.log(temp)
      console.log(icon)
      console.log(date)

      const hourlyList = document.getElementById("hourly-list")

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

    } else {
      throw new Error("Failed to fetch data")
    }
  } catch (error) {
    console.log(error)
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
      console.log(lat)
      console.log(long)
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


  async function fetchData(lat, long) {

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=66a1ffd908f3eb068e415a88e095603f&units=metric`)

      if (response.ok) {
        const data = await response.json()
        const temp = data.list[0].main.temp
        const icon = data.list[0].weather[0].icon
        const date = data.list[0].dt_txt
        console.log(temp)
        console.log(icon)
        console.log(date)

        const hourlyList = document.getElementById("hourly-list")

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

      } else {
        throw new Error("Failed to fetch data")
      }
    } catch (error) {
      console.log(error)
    }

  }


}