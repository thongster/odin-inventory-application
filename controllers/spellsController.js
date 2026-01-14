// import db queries
const db = require('../db/queries');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

const validateSpell = [
  // SPELL NAME
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Spell name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Spell name must be between 2 and 30 characters'),

  // DESCRIPTION
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 255 })
    .withMessage('Description must be between 10 and 255 characters'),

  // MANA
  body('mana')
    .notEmpty()
    .withMessage('Mana cost is required')
    .isInt({ min: 0, max: 1000 })
    .withMessage('Mana must be a number greater than or equal to 0'),

  // COOLDOWN
  body('cooldown')
    .notEmpty()
    .withMessage('Cooldown is required')
    .isInt({ min: 0, max: 3600 })
    .withMessage('Cooldown must be a non-negative number'),

  // DAMAGE (OPTIONAL)
  body('damage')
    .optional({ values: 'falsy' })
    .isInt({ min: 0, max: 10000 })
    .withMessage('Damage must be a non-negative number'),

  // RANGE
  body('range')
    .notEmpty()
    .withMessage('Range is required')
    .isIn(['Close', 'Medium', 'Long'])
    .withMessage('Range must be Close, Medium, or Long'),

  // ELEMENT
  body('element')
    .notEmpty()
    .withMessage('Element is required')
    .isIn(['Fire', 'Water', 'Earth', 'Wind', 'Arcane'])
    .withMessage('Element must be Fire, Water, Earth, Wind, or Arcane'),
];

async function getAllSpells(req, res) {
  const spells = await db.getAllSpells();
  res.render('spells', { spells: spells });
}

async function getSpellById(req, res) {
  const spell = await db.getSpellById(req.params.spell_id);
  res.render('spellShow', { spell: spell });
}

async function showAddSpellForm(req, res) {
  res.render('new');
}

async function addSpell(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('new', {
      errors: errors.array(),
      formData: req.body,
    });
  }
  const { name, description, mana, cooldown, damage, range, element } =
    matchedData(req);

  await db.addSpell(name, description, mana, cooldown, damage, range, element);

  res.redirect('/spells');
}

async function showUpdateSpellForm(req, res) {
  const spell = await db.getSpellById(req.params.spell_id);
  res.render(`updateSpell`, { spell: spell });
}

async function updateSpell(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render(`updateSpell`, {
      errors: errors.array(),
      spell: {
        id: req.params.spell_id,
        name: req.body.name,
        description: req.body.description,
        mana: req.body.mana,
        cooldown: req.body.cooldown,
        damage: req.body.damage,
        range: req.body.range,
        element: req.body.element,
      },
    });
  }
  const { name, description, mana, cooldown, damage, range, element } =
    matchedData(req);

  await db.updateSpell(
    req.params.spell_id,
    name,
    description,
    mana,
    cooldown,
    damage,
    range,
    element
  );

  res.redirect(`/spells/${req.params.spell_id}`);
}

async function deleteSpell(req, res) {
  await db.deleteSpell(req.params.spell_id);
  res.redirect('/spells');
}

module.exports = {
  getAllSpells,
  getSpellById,
  showAddSpellForm,
  addSpell,
  validateSpell,
  updateSpell,
  showUpdateSpellForm,
  deleteSpell,
};
