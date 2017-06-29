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
