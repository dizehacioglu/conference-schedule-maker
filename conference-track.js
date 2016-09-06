/*

You are planning a big programming conference and have received many proposals which have passed the initial screen process but you're having trouble fitting them into the time constraints of the day -- there are so many possibilities! So you write a program to do it for you.
  - The conference has multiple tracks each of which has a morning and afternoon session.
  - Each session contains multiple talks.
  - Morning sessions begin at 9am and must finish by 12 noon, for lunch.
  - Afternoon sessions begin at 1pm and must finish in time for the networking event.
  - The networking event can start no earlier than 4:00 and no later than 5:00.
  - No talk title has numbers in it.
  - All talk lengths are either in minutes (not hours) or lightning (5 minutes).
  - Presenters will be very punctual; there needs to be no gap between sessions.

*/

// var Track = require('./Track');

function readAndCleanData(){
  var talksRaw = [
    'Writing Fast Tests Against Enterprise Rails 60min',
    'Overdoing it in Python 45min',
    'Lua for the Masses 30min',
    'Ruby Errors from Mismatched Gem Versions 45min',
    'Common Ruby Errors 45min',
    'Rails for Python Developers lightning',
    'Communicating Over Distance 60min',
    'Accounting-Driven Development 45min',
    'Woah 30min',
    'Sit Down and Write 30min',
    'Pair Programming vs Noise 45min',
    'Rails Magic 60min',
    'Ruby on Rails: Why We Should Move On 60min',
    'Clojure Ate Scala (on my project) 45min',
    'Programming in the Boondocks of Seattle 30min',
    'Ruby vs. Clojure for Back-End Development 30min',
    'Ruby on Rails Legacy App Maintenance 60min',
    'A World Without HackerNews 30min',
    'User Interface CSS in Rails Apps 30min'
  ];

  var talks = [];

  talksRaw.forEach(function(talk){
    talks.push({
      title: talk.slice(0, talk.length-6),
      duration: talk.slice(talk.length-5, talk.length-3) === 'tn' ? 5 : parseInt(talk.slice(talk.length-5, talk.length-3))
    })
  })

  return talks;
}


var talks = readAndCleanData();
var tracks = [];

// first session can be a total of 3 hours (180 minutes)
// second session can be a total of 3-4 hours (180-240 minutes)

var Session = function(timeOfDay){
  this.timeOfDay = timeOfDay;
  this.totalTime = 0;
  this.talks = [];
}

var Track = function(){
  this.sessions = [new Session('morning'), new Session('afternoon')];
}

var track = new Track();

while(talks.length > 0){
  var currTalk = talks.shift();
  if(track.sessions[0].totalTime + currTalk.duration <= 180){
    track.sessions[0].talks.push(currTalk);
    track.sessions[0].totalTime += currTalk.duration;
  }
  else if(track.sessions[1].totalTime + currTalk.duration <= 240){
    track.sessions[1].talks.push(currTalk);
    track.sessions[1].totalTime += currTalk.duration;
  } else {
    talks.unshift(currTalk);
    tracks.push(track);
    track = new Track();
  }
}
tracks.push(track);

console.log('TRACKS--------------------------------');

for (var i = 0; i < tracks.length; i++) {
  // console.log(tracks[i]);
  console.log(tracks[i].sessions[0].talks);
  console.log(tracks[i].sessions[1].talks);
  console.log();
  console.log();
}

// function createTracks(talks){
//
// }
