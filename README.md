# TypeThemBeats
![TypeAndBeats Logo](https://github.com/danchau88/TypeAndBeats/blob/master/READMEimg/TABlogo.PNG)

A fun short mini-game that tests your typing speed prowess along with great music!

Check it out here! [Live Link](https://danchau88.github.io/TypeAndBeats/)

#### Tools Used:
* Language: Javascript
* HTML5 and CSS
* RandomWordAPI
* Google Firebase

### Basic Rules:
* Type the word present correctly before the timer ends.
  * Timer resets every correct word.
* Pick a Level and Duration (default is Easy and 100 seconds):
  * Levels:
    * Easy(default): 10sec
    * Hard: 7sec 
    * Master: 5sec
  * Durations:
    * Regular(default): 100 sec
    * Minute: 60 sec
* Survive 100 or 60 seconds to see your score.
* Starts whenever you start typing in the "Type here to start" box.
* Hone your typing skills and get as many words as you can, good luck!
* **Note**: Don't worry about pressing enter when finishing the word, it should change automatically.

![TypeAndBeats Home](https://github.com/danchau88/TypeAndBeats/blob/master/READMEimg/TypeAndBeats1.PNG)

### RandomWordAPI and Word Generator
* I increased the playability and smoothness of the typing experience to maximize reading and processing words by using a preloaded state of the next word to come after already waiting to stay a word ahead at all times. This reduced the possible lag/delay and bugs that would happen if you were to type too fast, eliminating a possible horrible issue.

![TypeAndBeats script.js](https://github.com/danchau88/TypeAndBeats/blob/master/READMEimg/TABcodesnippet2.PNG)

### Scoreboard
I implemented an intuitive scoreboard system using Google Firebase, a light-weight and efficient database, to keep track of scores saved. I also displayed the Top 5 of all time scores on the scoreboard to enhance competitive spirit.

![TypeAndBeats Scoreboard](https://github.com/danchau88/TypeAndBeats/blob/master/READMEimg/CaptureScoreboard.PNG)

### Bonus Features (coming in the future)
* Monthly Leaderboard for highscores

#### Copyright Stuff
* I do not own any of the songs used.
* Backgroud Music Used:
  * Easy: *The Raindrop Flower (Jazz ver.)* by Maplestory OST "*Jazz of Maple*"
  * Hard: *Whack-a-box* from FF7 Remake OST
  * Master: *The Most Muscular* from FF7 Remake OST
