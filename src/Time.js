/*
Time class - to help facilitate scheduling
The Date() class in JS was way too robust
*/

var Time = function(hours, minutes){
  this.hours = hours;
  this.minutes = minutes;
}

Time.prototype.addMinutes = function(minutes){
  this.minutes += minutes;
  if(this.minutes > 59){
    this.hours++;
    this.minutes = this.minutes % 60;
  }
}

Time.prototype.toString = function(){
  return (this.hours > 12 ? this.hours % 12 : this.hours)
  + ':'
  + (this.minutes.toString().length === 1 ? '0' + this.minutes : this.minutes)
  + (this.hours >= 12 ? 'PM' : 'AM');
}

module.exports = Time;
