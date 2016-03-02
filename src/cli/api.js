var omdb = require('omdb');

var Api = {

  searchMovieDetails: (movieName, callback) => {
    omdb.search(movieName, (err, movies) => {
      if (err || movies.length < 1) {
        console.warn("Could not get details for ", movieName);
      } else {
        // passing the first movie found after search
        callback(movies[0]);
      }
    })
  },

  getMovieDetails: (movieName, callback) => {
    omdb.get({title: movieName}, true, (err, movie) => {
      if (err || !movie) {
        console.warn("Could not get details for ", movieName);
      } else {
        callback(movie);
      }
    })
  }

};

module.exports = Api;
