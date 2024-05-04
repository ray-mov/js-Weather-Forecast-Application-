
//fucntion to get use location

function getGeolocation() {
  //checking browser support 
  if ("geolocation" in navigator) {

    // Note to devs:: getCurrentPosition return 2 callback  success and failure

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(lat)
      console.log(long)

      return [lat, long]

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


}

export {
  getGeolocation
}