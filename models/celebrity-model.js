const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [ 3, 'Celebrity Name must be at least 3 characters long' ],
    //Customizing the validation error message  ^^^^^
    //minlength & maxlength for strings ONLY
    maxlength: 25
  },
  occupation: { type: String },
  catchPhrase: { type: String }
});

const CelebrityModel = mongoose.model('Celebrity', celebritySchema);

//Movieshop is the database,
//Celebrity is the model
//celebrities is the collection
//collection name is automatically determined by mongoose
//by turning the model name into plural

module.exports = CelebrityModel;
