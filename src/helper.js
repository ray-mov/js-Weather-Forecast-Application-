function extractWeek(dateAndTimeString) {

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Extracting the date part 
  const dateString = dateAndTimeString.split(' ')[0]
  const date = new Date(dateString)
  const weeksIndex = date.getDay()


  // today's day
  const today = new Date()
  const todaysWeekIndex = today.getDay()

  if (weeksIndex == todaysWeekIndex) {
    return "Today"
  } else {
    return String(weeks[weeksIndex])
  }


}


//return data and time in AM or PM
function extractTime(dateAndTimeString) {

  // Extracting the hour part 
  const hour = dateAndTimeString.split(' ')[1].split(':')[0];

  let hourNumber = parseInt(hour);

  const period = hourNumber < 12 ? "am" : "pm";

  //converting to 12-H format
  if (hourNumber > 12) {
    hourNumber -= 12;
  }

  // returning in string formate
  return `${hourNumber}${period}`;

}

//today widget

function todayWidget() {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // Formatting 
  const todayString = (day < 10 ? '0' + day : day) + '-' + (month < 10 ? '0' + month : month) + '-' + year;

  document.getElementById('today-widget').textContent = todayString
}

export {
  extractWeek,
  extractTime,
  todayWidget
};



