var Track = function(){
  this.start = new Time(9, 0);
  this.sessions = [new Session('morning'), new Session('lunch'), new Session('afternoon'), new Session('networking')];
  this.end = new Time(17, 0);
}