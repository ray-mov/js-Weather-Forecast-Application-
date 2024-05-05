function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Pad single digit hours, minutes, and seconds with leading zeros
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds;

  // Display the time
  document.getElementById('time').textContent = timeString;
}

export { updateClock}