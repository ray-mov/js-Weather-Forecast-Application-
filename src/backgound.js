// note bg change will not working for all kinds of weather


function changeBackgroundWidget(data) {
  let spaceRemovedData = data.split(" ").join("");

  //note:- switch statement  : bcz all weather wallpaper cases is not handled
  console.log(spaceRemovedData)

  switch (spaceRemovedData) {
    case "brokenclouds":
      break;
    case "clearsky":
      break;
    case "fewclouds":
      break;
    case "mist":
      break;
    case "rain":
      break;
    case "scatteredclouds":
      break;
    case "slowrrain":
      break;
    case "snow":
      break;
    case "thunderstorm":
      break;
    default:
      spaceRemovedData = "city"
      break;
  }


  const res = document.querySelector("body").style.backgroundImage = `url('./assets/weather_pic/${spaceRemovedData}.jpg')`
  console.log(res)
}

export {
  changeBackgroundWidget
}
