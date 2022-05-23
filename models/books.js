'use strict';

//bring in mongoose
const mongoose = require('mongoose');


const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: Boolean, required: true}
});

const BookModel = mongoose.model('Books', bookSchema);

module.exports = BookModel;