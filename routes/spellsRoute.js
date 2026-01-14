// import router and create new router
const { Router } = require('express');
const spellsRoute = Router();
const spellsController = require('../controllers/spellsController');

spellsRoute.get('/', spellsController.getAllSpells);

spellsRoute.get('/new', spellsController.showAddSpellForm);

spellsRoute.post(
  '/new',
  spellsController.validateSpell,
  spellsController.addSpell
);

spellsRoute.get('/:spell_id', spellsController.getSpellById);

module.exports = spellsRoute;
