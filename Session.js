var Session = function(timeOfDay){
  this.timeOfDay = timeOfDay;
  this.totalTime = 0;
  this.talks = [];
}

module.exports = Session;
