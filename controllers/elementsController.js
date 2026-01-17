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

async function getAllElements(req, res, next) {
  try {
    const elements = await db.getAllElements();
    res.render('elements', { elements: elements });
  } catch (err) {
    next(err);
  }
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

async function addElement(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('addElement', {
      errors: errors.array(),
      formData: req.body,
    });
  }
  const { name, description } = matchedData(req);

  try {
    await db.addElement(name, description);
    res.redirect('/elements');
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).render('addElement', {
        errors: [{ msg: 'An element with this name already exists' }],
      });
    }
    next(err);
  }
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
  const element = await db.getElementByName(req.params.element);
  res.render('updateElement', { element: element });
}

async function updateElement(req, res) {
  const elementPre = await db.getElementByName(req.params.element);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render(`updateElement`, {
      errors: errors.array(),
      element: {
        name: req.body.name,
        description: req.body.description,
      },
    });
  }
  const { name, description } = matchedData(req);

  const existing = await db.getElementByName(name);
  if (existing && existing.id !== elementPre.id) {
    return res.status(400).render('updateElement', {
      errors: [{ msg: 'An element with this name already exists' }],
      element: {
        name,
        description,
      },
    });
  }

  await db.updateElement(elementPre.id, name, description);
  res.redirect(`/elements/${name}`);
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
