'use strict';

require('dotenv').config('.env');
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL)

const Book = require('./models/books.js');
const res = require('express/lib/response');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('this is working')
})

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', updateBooks);


async function getBooks(req, res, next) {
  console.log(req);
  let queryObject = {};
  if (req.query.title) {
    queryObject = {
      title: req.query.title
    }
  }
  try {
    let results = await Book.find(queryObject);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks(req, res, next) {
  try{
    console.log(req);
    let createdBook = await Book.create(req.body);
    res.status(200).send(createdBook);
  } catch(error) {
    next(error);
  }
}

async function deleteBooks(req, res, next) {
  try {
    console.log(req);
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send('book deleted');
  } catch (error) {
    next(error);
  }
}

async function updateBooks(req, res, next) {
  console.log(req);
  await Book.findByIdAndUpdate(req.params._id, req.body, {new: true, overwrite: true})
    .then(updatedBook => res.status(200).send(updatedBook))
    .catch(error => next(error));
}


app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
