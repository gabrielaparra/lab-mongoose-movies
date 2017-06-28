const express = require('express');
const CelebrityModel = require('../models/celebrity-model.js');
const router = express.Router();

router.get('/celebrities', (req, res, next) => {
  CelebrityModel.find(
    (err, celebrityResults) => {
    if (err) {
      //use next() to skip to the ERROR page
      next(err);
      return;
    }

    // display celebrities-list-view.ejs
    // the render methods knows to automatically look inside
    // the views folder
    res.render('celebrity-views/celebrities-list-view.ejs', {
      celebritiesList: celebrityResults
      // transfer of information to the view
    });
  });
});

//STEP #1 of form submission for a new celebrity
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrity-views/new-celebrity-view.ejs');
});

//STEP #2 of form submission for a new celebrity
// <form method="post" action="/celebrities">
router.post('/celebrities', (req, res, next) => {
  const theCelebrity = new CelebrityModel ({
    name: req.body.celebrityName,
    occupation: req.body.celebrityOccupation,
    catchPhrase: req.body.celebrityCatchPhrase
  });

  theCelebrity.save((err) => {
    //if there's an error that's NOT a validation error
    if (err && theCelebrity.errors === undefined) {
      next(err);
      return;
    }

    //if there's a validation error
    if (err && theCelebrity.errors) {
      // create view variables with the error messages
      // res.locals.validationErrors = theProduct.errors;
      res.render('celebrity-views/new-celebrity-view.ejs', {
                    // display the form again ^^^
        nameValidationError: theCelebrity.errors.name,
      });
      return;
    }
    //if save is successful, redirect to a URL
    res.redirect('/celebrities');
    //if we don't redirect we can refresh and duplicate the data
  });
});


//Showing the details about each celebrity
//Routes that use URL with placeholder must be place after other routes
router.get('/celebrities/:myId', (req, res, next) => {
  CelebrityModel.findById(
    req.params.myId,           //1st arg -> the ID to find in the DB
    //Params is used to show a URL like this /products/j1817492 (product ID)
    (err, celebrityFromDb) => {    //2nd arg -> callback
      if (err) {
        next(err);
        return;
      }

      res.locals.celebrityDetails = celebrityFromDb;

      res.render('celebrity-views/celebrity-details-view.ejs');
    }
  );
});

// STEP #1 of form submission for UPDATING a Celebrity
router.get('/celebrities/:myId/edit', (req, res, next) => {
  CelebrityModel.findById(
    req.params.myId,             //1st arg -> the ID to find in the DB
    (err, celebrityFromDb) => {   //2nd arg -> callback
      if (err) {
        //use next() to skup to the ERROR page
        next(err);
        return;
      }
      res.locals.celebrityDetails = celebrityFromDb;

      res.render('celebrity-views/edit-celebrity-view.ejs');
    }
  );
});

// STEP #2 of form submission for UPDATING a Celebrity
router.post('/celebrities/:myId/update', (req, res, next) => {
  CelebrityModel.findByIdAndUpdate(
    req.params.myId,              //1st arg -> id of document to update
    {                            //2nd arg -> object fields to update
      occupation: req.body.celebrityOccupation,
      catchPhrase: req.body.celebrityCatchPhrase
    },
    (err, celebrityFromDb) => {    //3rd arg -> callback
      if (err) {
        //use next() to skup to the ERROR page
        next(err);
        return;
      }
      res.redirect('/celebrities/' + celebrityFromDb._id);
      //every time there's a successful post we must redirect
    }
  );
});

//Delete a Celebrity
router.get('/celebrities/:myId/delete', (req, res, next) => {
  CelebrityModel.findByIdAndRemove(
    req.params.myId,
    (err, celebrityFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/celebrities');
    }
  );
});

module.exports = router;
