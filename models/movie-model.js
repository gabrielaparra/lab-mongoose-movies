const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema( {
  title: {
    type: String,
    required: true
  },
  genre: { type: String },
  plot: { type: String }
});

const MovieModel = mongoose.model('Movie', movieSchema);


module.exports = MovieModel;
