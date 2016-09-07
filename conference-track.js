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
    talks.push(new Talk(talk.slice(0, talk.length-6), talk.slice(talk.length-5, talk.length-3) === 'tn' ? 5 : parseInt(talk.slice(talk.length-5, talk.length-3))))
  })

  return talks;
}

function createTracks(talks){
  var tracks = [];
  var track = new Track();

  while(talks.length > 0){
    var currTalk = talks.shift();
    // first session can be a total of 3 hours (180 minutes)
    if(track.sessions[0].totalTime + currTalk.duration <= 180){
      track.sessions[0].talks.push(currTalk);
      track.sessions[0].totalTime += currTalk.duration;
    }
    // second session can be a total of 3-4 hours (180-240 minutes)
    else if(track.sessions[2].totalTime + currTalk.duration <= 240){
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

function createSchedule(){
  var talks = readAndCleanData();
  var tracks = createTracks(talks);

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
      } else if(session.timeOfDay == 'networking'){
        time = new Time(17, 0);
        console.log(time.toString() + ' Networking');
      }
    })
    console.log();
  }
}
