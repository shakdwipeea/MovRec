'use strict'
var FileOperations = require('./search'),
    MovieApi = require('./api'),
    ptn = require('parse-torrent-name');

let printMovieDetails = (movie) => {
  if (!movie.imdb.rating) {
    return;
  }

  console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
  console.log(movie.plot);
  console.log("Genres: ", movie.genres);
  console.log("Actors: ", movie.actors);
  console.log("Director: ", movie.director);
}

var Kyaji = {
  searchMovies: (directory) => {
    FileOperations.getFiles(directory, ['.mp4', '.avi', '.flv', '.mkv'], (files) => {
      console.log("Discovered " + files.length + " files");
      console.log("Now querying its statistics");

      files.forEach((file) => {
        var details = ptn(file);
        MovieApi.searchMovieDetails(details.title, (movie) => printMovieDetails(movie));
      });
    });
  },
  getMovie: (movieName) => {
    console.log("Searching for movie", movieName)
    MovieApi.getMovieDetails(movieName, (movie) => printMovieDetails(movie));
  }
};

module.exports = Kyaji;
