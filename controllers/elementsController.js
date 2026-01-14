// import db queries
const db = require('../db/queries');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

const validateElement = [
  // Element NAME
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Element name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Element name must be between 2 and 30 characters'),

  // DESCRIPTION
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 255 })
    .withMessage('Description must be between 10 and 255 characters'),
];

async function getAllElements(req, res) {
  const elements = await db.getAllElements();
  res.render('elements', { elements: elements });
}

async function getSpellsByElement(req, res) {
  let elementName = req.params.element;
  elementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);

  const data = await db.getSpellsByElement(elementName);

  const element = {
    id: data[0].c_id,
    name: data[0].element,
    description: data[0].c_description,
  };

  res.render('spellByElementShow', { element: element, spells: data });
}

async function showAddElement(req, res) {
  res.render('addElement');
}

async function addElement(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('addElement', {
      errors: errors.array(),
      formData: req.body,
    });
  }
  const { name, description } = matchedData(req);

  await db.addElement(name, description);
  res.redirect('/elements');
}

module.exports = {
  validateElement,
  getAllElements,
  getSpellsByElement,
  showAddElement,
  addElement,
};
