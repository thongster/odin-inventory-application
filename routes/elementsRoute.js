// import router and create new router
const { Router } = require('express');
const elementsRoute = Router();
const elementsController = require('../controllers/elementsController');

elementsRoute.get('/', elementsController.getAllElements);

elementsRoute.get('/add', elementsController.showAddElement);

elementsRoute.post(
  '/add',
  elementsController.validateElement,
  elementsController.addElement
);

elementsRoute.get('/:element', elementsController.getSpellsByElement);

module.exports = elementsRoute;
