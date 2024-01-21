const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65ad5f32b0cb2f72dd0377a0',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', cards);
app.use('/', users);

app.listen(PORT);
