function extractDate(text) {

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

export {
  extractDate,
  extractTime
};