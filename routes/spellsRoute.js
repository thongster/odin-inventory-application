// import router and create new router
const { Router } = require('express');
const spellsRoute = Router();
const spellsController = require('../controllers/spellsController');

spellsRoute.get('/', spellsController.getAllSpells);

// spellsRoute.get('/:spell_id', async (req, res) => {
//   res.render('spells', { spell: req.params.spell_id });
// });

spellsRoute.get('/new', spellsController.addSpellForm);

spellsRoute.post('/new', async (req, res) => {
  res.render('new');
});

module.exports = spellsRoute;
