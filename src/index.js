// External dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('../db/models');

// Internal dependencies
const renderTemplate = require('./lib/renderTemplate');
const Home = require('./views/Home');
const todos = require('./routes/todos.router');

const app = express();

const PORT = process.env.PORT ?? 3001;

app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  renderTemplate(Home, {}, res);
});

app.use('/todos', todos);

app.listen(PORT, async() => {
  console.log(`Server start in ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connect db ok');
  } catch (error) {
    console.log(error);
  }
});
