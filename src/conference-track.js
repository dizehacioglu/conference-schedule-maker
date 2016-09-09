var fs = require('fs');
var Talk = require('./Talk.js');
var Time = require('./Time.js')
var Session = require('./Session.js');
var Track = require('./Track.js');

// Define constants for how long the morning and afternoon sessions will run
// in minutes
// First session can be a total of 3 hours (180 minutes)
const morningSessionHours = 180;
// second session can be a total of 3-4 hours (180-240 minutes)
const afternoonSessionHours = 240;

/*
  The createSchedule() function combines all other functions in the app
    - parses data, assigns the data into tracks, and prints the proper schedule
  It is immediately invoked because why wait?
*/
function createSchedule(){
  var talks = readAndCleanData('../data/' + process.argv[2]);
  var tracks = createTracks(talks);
  printSchedule(tracks);
};

createSchedule();

/*
 The readAndCleanData() function takes in a file,
 reads the file using Node's fs module,
 turns the data into an array of strings,
 cleans up the strings,
 and turns each string into a Talk object.
*/
function readAndCleanData(file){
  // Read data from the file -
  // if there is a problem reading the file,
  // throw an error
  try{
    var dataFromFile = fs.readFileSync(file);
  } catch(e){
    console.log(file);
    throw 'Please submit a valid .txt file';
  }

  // Turn the data from the file into an array of talks
  var talksRaw = dataFromFile.toString().split('\n');
  if(talksRaw[talksRaw.length - 1] === ''){
    talksRaw = talksRaw.slice(0, talksRaw.length-1);
  }

  // Declare the talks array, which is our return value
  var talks = [];

  // Do some cleaning up of the raw talk data
  talksRaw.forEach(function(talk){
    var title = ''
    var duration = '';
    var lightningIndex = talk.indexOf('lightning');
    // See if the word lightning exists in the talk -
    // if it does, make the talk's duration 5 minutes
    // and remove the word 'lightning' from the string
    if(lightningIndex > 0){
      duration = '5';
      title = talk.slice(0, lightningIndex);
    } else {
      // For every other talk, using RegEx, define title as everything
      // in the string but the time
      // and define the duration as the time minus the string 'min'
      title = talk.replace(/\d+min/, '');
      duration = talk.slice(talk.search(/\d+min/)).replace(/min/, '');
    }
    // Push a newly created (and super clean!) Talk object
    // into the talks array
    // Must parseInt() the duration while passing it into the Talk constructor
    // so we can do calculations with it later
    talks.push(new Talk(title, parseInt(duration)));
  })
  return talks;
}

/*
  The createTracks() function takes in an array of talks
  and sorts them into tracks based on their duration
*/
function createTracks(talks){
  // Create our return variable
  var tracks = [];
  // We will start with a brand new Track
  var track = new Track();

  // Using the array of Talks as a Queue
  while(talks.length > 0){
    // We will shift a Talk from the front of the Queue
    var currTalk = talks.shift();
    // We will check to see if our currTalk (newly shifted Talk object)
    // can fit into the Track's morning session
    if(track.sessions[0].totalTime + currTalk.duration <= morningSessionHours){
      // If it can, we will add that to the morning Session's talks array
      track.sessions[0].talks.push(currTalk);
      // And keep track of how many minutes of the morning Session are filled
      track.sessions[0].totalTime += currTalk.duration;
    }
    // If it can't fit into the morning session,
    // we will see if it can fit into the afternoon session
    else if(track.sessions[2].totalTime + currTalk.duration <= afternoonSessionHours){
      // If it can, we will add that to the afternoon Session's talks array
      track.sessions[2].talks.push(currTalk);
      // And keep track of how many minutes of the afternoon Session are filled
      track.sessions[2].totalTime += currTalk.duration;
    }
    // If we were unable to fit currTalk into either of the Sessions (meaning the Track is full),
    // we will have to do three important things:
    //  - put our currTalk back into our Talks Queue (by unshifting it)
    //    because we haven't found a place for it yet,
    //  - add our full Track to our tracks array, to be returned at a later time
    //  - and create a new Track to start filling with Talks
    else {
      talks.unshift(currTalk);
      tracks.push(track);
      track = new Track();
    }
  }
  tracks.push(track);

  return tracks;
}

/*
  The printSchedule() function takes in an array of Track objects
  and prints the schedule for each element in that array
*/
function printSchedule(tracks){
  // Iterate through the array of Tracks
  for (var i = 0; i < tracks.length; i++) {
    // Print the title
    console.log('Track ' + (i+1));
    console.log('---');
    // Declare the starting time (aka 9AM for every Track)
    var time = tracks[i].start;
    // Go through each Track's array of Sessions
    tracks[i].sessions.forEach(function(session){
      // As long as the Session isn't Lunch or Networking
      if(session.timeOfDay !== 'lunch' && session.timeOfDay !== 'networking'){
        session.talks.forEach(function(talk){
          // Print out the time of the Talk,
          // the title of the Talk,
          // and how long the Talk will last
          console.log(time.toString() + ' ' + talk.title + talk.duration + 'min');
          // Add the duration of the Talk to the time to keep us on schedule
          time.addMinutes(talk.duration);
        })
      } else if(session.timeOfDay === 'lunch') { // if the Session is Lunch
        // The time has to be 12 (noon)
        time = new Time(12, 0);
        console.log(time.toString() + ' Lunch');
        time.addMinutes(60);
      } else if(session.timeOfDay === 'networking'){ // if the Session is Networking
        // The time has to be 5pm
        time = new Time(17, 0);
        console.log(time.toString() + ' Networking');
      }
    })
    // A blank line for better formatting
    console.log();
  }
}
