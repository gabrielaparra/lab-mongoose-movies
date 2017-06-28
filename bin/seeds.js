// SEED FILE
// a separate js file that saves things to the database
// (makes onboarding easier and it allows to re-populate the Database)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movieshop');

const Celebrity = require('../models/celebrity-model.js');

const celebrityArray = [
  {
    name: 'Speedy Gonzalez',
    occupation: 'Singer',
    catchPhrase: 'I wish burritos were actually Mexican'
  },
  {
    name: 'James Seiler',
    occupation: 'Comedian',
    catchPhrase: 'Money rains on me'
  },
  {
    name: 'Emily Hicklin',
    occupation: 'Model',
    catchPhrase: 'A celery a day will get you where I am'
  },
];

Celebrity.create(
  celebrityArray,           //1st arg --> array of product info objects
  (err, celebrityResults) => {  //2nd arg --> callback
    if (err) {
      console.log('OMG! Database error.');
      return;
    }

    celebrityResults.forEach((celebrity) => {
      console.log('New Celebrity! ' + celebrity.name);
    });
  }
);
