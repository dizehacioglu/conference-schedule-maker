var fs = require('fs');
var Talk = require('./Talk.js');
var Time = require('./Time.js')
var Session = require('./Session.js');
var Track = require('./Track.js');

const morningSessionHours = 180;
const afternoonSessionHours = 240;

function createSchedule(){
  var talks = readAndCleanData(process.argv[2]);
  var tracks = createTracks(talks);
  printSchedule(tracks);
}

function readAndCleanData(file){
  var dataFromFile = fs.readFileSync(file);

  var talksRaw = dataFromFile.toString().split('\n');
  if(talksRaw[talksRaw.length - 1] === ''){
    talksRaw = talksRaw.slice(0, talksRaw.length-1);
  }

  var talks = [];

  talksRaw.forEach(function(talk){
    var title = ''
    var duration = '';
    var lightningIndex = talk.indexOf('lightning');
    if(lightningIndex > 0){
      duration = '5';
      title = talk.slice(0, lightningIndex);
    } else {
      title = talk.replace(/\d+min/, '');
      duration = talk.slice(talk.search(/\d+min/)).replace(/min/, '');
    }
    talks.push(new Talk(title, parseInt(duration)));
  })
  return talks;
}


function createTracks(talks){
  var tracks = [];
  var track = new Track();

  while(talks.length > 0){
    var currTalk = talks.shift();
    // first session can be a total of 3 hours (180 minutes)
    if(track.sessions[0].totalTime + currTalk.duration <= morningSessionHours){
      track.sessions[0].talks.push(currTalk);
      track.sessions[0].totalTime += currTalk.duration;
    }
    // second session can be a total of 3-4 hours (180-240 minutes)
    else if(track.sessions[2].totalTime + currTalk.duration <= afternoonSessionHours){
      track.sessions[2].talks.push(currTalk);
      track.sessions[2].totalTime += currTalk.duration;
    } else {
      talks.unshift(currTalk);
      tracks.push(track);
      track = new Track();
    }
  }
  tracks.push(track);

  return tracks;
}

function printSchedule(tracks){
  for (var i = 0; i < tracks.length; i++) {
    console.log('Track ' + (i+1));
    console.log('---');
    var time = tracks[i].start;
    tracks[i].sessions.forEach(function(session){
      if(session.timeOfDay !== 'lunch' && session.timeOfDay !== 'networking'){
        session.talks.forEach(function(talk){
          console.log(time.toString() + ' ' + talk.title);
          time.addMinutes(talk.duration);
        })
      } else if(session.timeOfDay === 'lunch') {
        time = new Time(12, 0);
        console.log(time.toString() + ' Lunch');
        time.addMinutes(60);
      } else if(session.timeOfDay === 'networking'){
        time = new Time(17, 0);
        console.log(time.toString() + ' Networking');
      }
    })
    console.log();
  }
}

createSchedule();
