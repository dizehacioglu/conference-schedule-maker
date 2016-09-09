var Time = require('./Time.js');
var Session = require('./Session.js');

/*
Track class - provides a blueprint of each Track in a day
*/

var Track = function(){
  this.start = new Time(9, 0);
  this.sessions = [new Session('morning'), new Session('lunch'), new Session('afternoon'), new Session('networking')];
}

module.exports = Track;
