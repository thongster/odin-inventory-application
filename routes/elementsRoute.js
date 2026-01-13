// import router and create new router
const { Router } = require('express');
const elementsRoute = Router();

elementsRoute.get('/elements', async (req, res) => {
  res.render('elements');
});

elementsRoute.get('/elements/:category_id', async (req, res) => {
  res.render('elements', { element: req.params.category_id });
});

module.exports = elementsRoute;
