// import router and create new router
const { Router } = require('express');
const elementsRoute = Router();
const elementsController = require('../controllers/elementsController');

elementsRoute.get('/', elementsController.getAllElements);

elementsRoute.get('/:category_id', async (req, res) => {
  res.render('elements', { element: req.params.category_id });
});

module.exports = elementsRoute;
