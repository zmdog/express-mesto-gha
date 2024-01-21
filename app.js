const express = require('express');
const mongoose = require('mongoose');
const cards = require('./routes/cards')
const users = require('./routes/users')
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65a40e1d07ccc12c88137a13'
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('база подключена'));

app.use('/', cards)
app.use('/', users)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})