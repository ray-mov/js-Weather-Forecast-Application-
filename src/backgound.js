// note bg change will not working for all kinds of weather


function changeBackgroundWidget(data) {
  const spaceRemovedData = data.split(" ").join("");
  // console.log(dataString)
  // console.log(bgImage.dataString)
  // const newImage = "url('new-background-image.jpg')";
  // document.querySelector("body").style.backgroundImage = "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTcybm4yZjZiaTltODNhN3A0emM4eXRldzk0aGl3bTJ5NWQ1YWI1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BUmhIx48cZQ8Dc24Fa/giphy.gif')"

  const res = document.querySelector("body").style.backgroundImage = `url('./assets/weather_pic/${spaceRemovedData}.jpg')`
  console.log(res)
}

export {
  changeBackgroundWidget
}
