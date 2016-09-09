/*
Session class - to keep track of sessions in a track
Lunch and Networking and considered to be their own Sessions.
*/

var Session = function(timeOfDay){
  this.timeOfDay = timeOfDay;
  this.totalTime = 0;
  this.talks = [];
}

module.exports = Session;
