// note bg change will not working for all kinds of weather


function changeBackgroundWidget(data) {
  let spaceRemovedData = data.split(" ").join("");
  

  switch (spaceRemovedData) {
    case spaceRemovedData === "brokenclouds":
      break;
    case spaceRemovedData === "clearsky":
      break;
    case spaceRemovedData === "fewclouds":
      break;
    case spaceRemovedData === "mist":
      break;
    case spaceRemovedData === "rain":
      break;
    case spaceRemovedData === "scatterdclouds":
      break;
    case spaceRemovedData === "slowrrain":
      break;
    case spaceRemovedData === "snow":
      break;
    case spaceRemovedData === "thunderstorm":
      break;
    default:
      spaceRemovedData = ""
      break;
  }


  const res = document.querySelector("body").style.backgroundImage = `url('./assets/weather_pic/${spaceRemovedData}.jpg')`
  console.log(res)
}

export {
  changeBackgroundWidget
}
