# liri-node-app

### Overview

*In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Functionality

1. `node liri.js my-tweets`

*Using the [Twitter](https://www.npmjs.com/package/twitter) pacakge, pulls the last 20 tweets from a user and displays them along with the dates they were created

2. `node liri.js spotify-this-song '<song name here>'`

*Using [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) package, displays the following info for a searched song: 

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

*If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

*Using the [Open Movie Database](http://www.omdbapi.com/), displays the following info for searched movies

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Rotten Tomatoes Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.

4. `node liri.js do-what-it-says`

*Takes command line inputs from a file random.txt and runs them

### Extra Features
*Each command gets loggeed to a text file, log.txt
*The do what it says function is configured to accept multiple inputs as long as theyre on separate lines
