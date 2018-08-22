require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var request = require("request");


var keys = require("./keys.js");
var fs = require("fs");

var nodeArgs = process.argv;
var command = process.argv[2]
var target = process.argv[3]

var movieName = '';
var textFile = "log.txt";

if (command === "do-what-it-says") {
    var dataArr = (fs.readFileSync('random.txt', 'utf8')).split(/,|\r\n/);

    for (let i = 0; i < dataArr.length; i += 2) {
        command = dataArr[i]
        target = dataArr[i + 1]
        movieName = dataArr[i + 1]
        liri();
    }

}


else
    liri()


function liri() {
    switch (command) {
        case 'spotify-this-song':

            if (!process.argv[3])
                target = "The Sign"

            liriSpotify(target);
            break;

        case 'test':
            liriTest();
            break;

        case "movie-this":

            if (!process.argv[3])
                movieName = "Mr. Nobody."

            if (movieName === "") {
                for (var i = 3; i < nodeArgs.length; i++) {

                    if (i > 3 && i < nodeArgs.length) {
                        movieName = movieName + "+" + nodeArgs[i];
                    }
                    else {
                        movieName += nodeArgs[i];
                    }
                }
            }
            liriMovie(movieName);
            break;

        case "my-tweets":

            liriTwitter()
            break;

        default:
            console.log("Not a Valid Input");
    }

    function liriTest() {
        var spotify = new Spotify(keys.spotify);
        target = "the sign"

        spotify.search({ type: 'track', query: target, limit: 10 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data.tracks.items[5].name + " " + data.tracks.items[5].artists[0].name)

            /*for(let i = 0; i<20; i++)
            {
                console.log(data.tracks.items[i].name + " "+data.tracks.items[i].artists[0].name)
            }*/
        });
    }

    function liriSpotify(song) {

        var spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: target, limit: 10 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var i = 0;

            if (target === "The Sign")
                i = 5;

            var dataText = "Artist   : " + data.tracks.items[i].artists[0].name + "\r\n"
                + "Name     : " + data.tracks.items[i].name + "\r\n"
                + "Link     : " + data.tracks.items[i].external_urls.spotify + "\r\n"
                + "Album    : " + data.tracks.items[i].album.name + "\r\n"

            console.log(dataText);
            fs.appendFileSync(textFile, 'spotify-this-song ' + song + "\r\n" + dataText + "\r\n")

        });

    }


    function liriTwitter() {
        var client = new Twitter(keys.twitter);
        var params = { screen_name: '@eric46781484' };

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log("user " + JSON.stringify(params) + " last 20 tweets: ")
                var dataText = ''
                for (let i = 0; i < 20; i++)
                    if (!tweets[i])
                        i = 20;
                    else {
                        dataText = dataText + tweets[i].created_at + "\r\n"
                            + "   " + tweets[i].text + "\r\n"
                    }
            }

            console.log(dataText);
            fs.appendFileSync(textFile, 'my-tweets ' + JSON.stringify(params) + "\r\n" + dataText + "\r\n")
        });


    }


    function liriMovie(movie) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        console.log(queryUrl);

        request(queryUrl, function (error, response, data) {

            if (!error && response.statusCode === 200) {


                var ratings = JSON.parse(data).Ratings;
                var rottenTomatoesInfo = "Rotten Tomatoes : No Rating Available"


                for (let i = 0; i < ratings.length - 1; i++) {
                    if (ratings[i].Source === 'Rotten Tomatoes')
                        rottenTomatoesInfo = "Rotten Tomatoes : " + ratings[i].Value;
                }

                var dataText = "Title           : " + JSON.parse(data).Title + "\r\n"
                    + "Release Year    : " + JSON.parse(data).Year + "\r\n"
                    + "IMDB Rating     : " + JSON.parse(data).imdbRating + "\r\n"
                    + rottenTomatoesInfo + "\r\n"
                    + "Country         : " + JSON.parse(data).Country + "\r\n"
                    + "Language        : " + JSON.parse(data).Language + "\r\n"
                    + "Plot Synopsis   : " + JSON.parse(data).Plot + "\r\n"
                    + "Actors          : " + JSON.parse(data).Actors + "\r\n"

                console.log(dataText)
                fs.appendFileSync(textFile, 'movie-this ' + movie + "\r\n" + dataText + "\r\n")
            }

        });
    }

}









