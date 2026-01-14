// import router and create new router
const { Router } = require('express');
const spellsRoute = Router();
const spellsController = require('../controllers/spellsController');

// show all spells
spellsRoute.get('/', spellsController.getAllSpells);

// show new spell form
spellsRoute.get('/new', spellsController.showAddSpellForm);

// add new spell from form
spellsRoute.post(
  '/new',
  spellsController.validateSpell,
  spellsController.addSpell
);

// show spell by id
spellsRoute.get('/:spell_id', spellsController.getSpellById);

// show update spell form
spellsRoute.get('/:spell_id/update', spellsController.showUpdateSpellForm);

// submit update spell from form
spellsRoute.post(
  '/:spell_id/update',
  spellsController.validateSpell,
  spellsController.updateSpell
);

module.exports = spellsRoute;
