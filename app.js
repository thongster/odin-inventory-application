// set up express
const express = require('express');
const app = express();

// set up ejs using views directory
const path = require('node:path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, 'public'))); // load static files
app.use(express.urlencoded({ extended: true })); // parse form info

// import routers
const indexRoute = require('./routes/indexRoute');
const spellsRoute = require('./routes/spellsRoute');
const elementsRoute = require('./routes/elementsRoute');

// use routes
app.use('/', indexRoute);
app.use('/spells', spellsRoute);
app.use('/elements', elementsRoute);

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server listening on port ${PORT}!`);
});
