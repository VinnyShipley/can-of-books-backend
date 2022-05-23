'use strict'

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');


async function seed(){
  

await Book.create({
  title: 'model1',
  description: 'this is a model1',
  status: true
  
});
console.log('model is created');
await Book.create({
  title: 'model2',
  description: 'this is a model2',
  status: true
  
});
console.log('model2 is created');
await Book.create({
  title: 'model3',
  description: 'this is a model3',
  status: true
  
});
console.log('model3 is created');
mongoose.disconnect();
};

seed();