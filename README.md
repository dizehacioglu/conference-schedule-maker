## ThoughtWorks Technical Assignment
Submitted by Dize Hacioglu
___

### The Problem
You are planning a big programming conference and have received many proposals which have passed the initial screen process but you're having trouble fitting them into the time constraints of the day -- there are so many possibilities! So you write a program to do it for you.
The conference has multiple tracks each of which has a morning and afternoon session.

 - Each session contains multiple talks.
 - Morning sessions begin at 9am and must finish by 12 noon, for lunch.
 - Afternoon sessions begin at 1pm and must finish in time for the networking event.
 - The networking event can start no earlier than 4:00 and no later than 5:00.
 - No talk title has numbers in it.
 - All talk lengths are either in minutes (not hours) or lightning (5 minutes).
 - Presenters will be very punctual; there needs to be no gap between sessions.

Note that depending on how you choose to complete this problem, your solution may give a different ordering or combination of talks into tracks. This is acceptable; you don’t need to exactly duplicate the sample output given here.


### My Design
The assignment reminded me a lot of the Knapsack problem with different restraints and multiple Knapsacks.
I made Classes for a Talk, a Session, a Track, and Time.
  - Talk Class
    - Has a title
    - Has the duration of the talk
  - Session Class
    - Has the time of day the session is happening
    - Has the sum of the duration of talks during that session
    - Has an array of Talks that keeps track of the talks happening during that session
  - Track Class
    - Has the time each Track has to start (defaults to 9AM)
    - Has an array of Session (defaults to 4 sessions - Morning, Lunch, Afternoon, Networking)
  - Time Class (had to create my own Time functionality because built-in JS libraries dealing with Time felt too heavy)
    - Has hour and minutes
    - Has a function to addMinutes and calculate time accordingly
    - Has a function to format the Time
In addition to creating Classes for the main components of the Conference, I used a Queue to implement the *main* algorithm. The use of the Queue is explained further in the comments.
I loved solving this problem and can't wait to hear your feedback.


### Assumptions
I must admit, I feel I made a lot of assumptions while writing this program.
I made the assumption that it was okay if the Talk let out a little bit before Lunch.
I made the assumption that the data given to me in the raw talks.txt file would always be valid.
I made the assumption that the word "Lightning" would not be in the title of any talk.
The assumption that made the largest impact on my algorithm was the belief that talks will fit into the minimum allotted time for the Conference.
  - This would mean that each permutation of talks could fit into the Conference (even if the Conference had to have multiple Tracks).

### How to Run
  1. Download the latest version of [Node](https://nodejs.org/en/download/).
    - You can follow directions here if you want to [install Node via Homebrew](https://changelog.com/install-node-js-with-homebrew-on-os-x/).
  1. Save the .txt file in the data folder.
    - There is already a talks.txt file in there, with the given test input.
  1. Open Terminal.
  1. Run `node conference-track.js {fileName}.txt` in `src`.
  1. The output will show you the schedule.
