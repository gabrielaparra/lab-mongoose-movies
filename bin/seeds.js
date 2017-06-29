// SEED FILE
// a separate js file that saves things to the database
// (makes onboarding easier and it allows to re-populate the Database)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movieshop');

const Movie = require('../models/movie-model.js');

const movieArray = [
  {
    title: 'Playing with a Fuzzy Rabbit',
    genre: 'Comedy',
    plot: 'There\'s a new rabbit on the block, he is fuzzy and ready to play.'
  },
  {
    title: 'Executing Mrs. Wong',
    genre: 'Action',
    plot: 'Mrs. Wong is on the run and she is willing to do whatever it takes to survive.'
  },
  {
    title: 'Running Against Samus Samuellson',
    genre: 'Drama',
    plot: 'An inspiring story about a boy running against the odds.'
  }
];

Movie.create(
  movieArray,           //1st arg --> array of product info objects
  (err, movieResults) => {  //2nd arg --> callback
    if (err) {
      console.log('OMG! Database error.');
      return;
    }

    movieResults.forEach((movie) => {
      console.log('New Movie! ' + movie.name);
    });
  }
);
