const express = require('express');
const MovieModel = require('../models/movie-model.js');
const router = express.Router();

// To list all the celebrities
router.get('/movies', (req, res, next) => {
  MovieModel.find(
    (err, movieResults) => {
    if (err) {
      //use next() to skip to the ERROR page
      next(err);
      return;
    }

    // display movies-list-view.ejs
    // the render methods knows to automatically look inside
    // the views folder
    res.render('movie-views/movies-list-view.ejs', {
      moviesList: movieResults
      // transfer of information to the view
    });
  });
});

//STEP #1 of form submission for a new movie
router.get('/movies/new', (req, res, next) => {
  res.render('movie-views/new-movie-view.ejs');
});

//STEP #2 of form submission for a new movie
// <form method="post" action="/movies">
router.post('/movies', (req, res, next) => {
  const theMovie = new MovieModel ({
    title: req.body.movieTitle,
    genre: req.body.movieGenre,
    plot: req.body.moviePlot
  });

  theMovie.save((err) => {
    // //if there's an error that's NOT a validation error
    // if (err && theMovie.errors === undefined) {
    //   next(err);
    //   return;
    // }

    //if there's a validation error
    if (err && theMovie.errors) {
      // create view variables with the error messages
      // res.locals.validationErrors = theMovie.errors;
      res.render('movie-views/new-movie-view.ejs', {
                    // display the form again ^^^
        nameValidationError: theMovie.errors.name,
      });
      return;
    }
    //if save is successful, redirect to a URL
    res.redirect('/movies');
    //if we don't redirect we can refresh and duplicate the data
  });
});

// Displaying details about each movie
router.get('/movies/:myId', (req, res, next) => {
  MovieModel.findById(
    req.params.myId,
    (err, movieFromDb) => {
      if (err) {
        next (err);
        return;
      }
      res.locals.movieDetails = movieFromDb;
      res.render('movie-views/movie-details-view.ejs');
    }
  );
});

module.exports = router;
