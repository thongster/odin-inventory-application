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
  const errors =
    req.query.error === 'cannot_delete'
      ? [{ msg: 'Cannot delete an element which contains spells in it' }]
      : null;

  let elementName = req.params.element;
  elementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);

  const data = await db.getSpellsByElement(elementName);

  const element = {
    id: data[0].c_id,
    name: data[0].element,
    description: data[0].c_description,
  };

  res.render('spellByElementShow', {
    element: element,
    spells: data,
    errors: errors,
  });
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

async function deleteElement(req, res) {
  try {
    await db.deleteElement(req.params.element);
    res.redirect('/elements');
  } catch {
    return res.redirect(`/elements/${req.params.element}?error=cannot_delete`);
  }
}

async function showUpdateElementForm(req, res) {
  const element = await db.getElementByName(res.params.element);

  res.render('updateElement', { element: element });
}

async function updateElement(req, res) {
  const elements = await db.getAllElements();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render(`updateSpell`, {
      errors: errors.array(),
      element: {
        name: req.body.name,
        description: req.body.description,
      },
      elements: elements,
    });
  }
  const { name, description } = matchedData(req);

  await db.updateElement(req.params.element, name, description);

  res.redirect(`/spells/${req.params.element}`);
}

module.exports = {
  validateElement,
  getAllElements,
  getSpellsByElement,
  showAddElement,
  addElement,
  deleteElement,
  showUpdateElementForm,
  updateElement,
};
