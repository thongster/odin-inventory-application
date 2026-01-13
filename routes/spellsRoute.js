// import router and create new router
const { Router } = require('express');
const spellsRoute = Router();
const spellsController = require('../controllers/spellsController');

spellsRoute.get('/', async (req, res) => {
  res.render('spells');
});

spellsRoute.get('/:spell_id', async (req, res) => {
  res.render('spells', { spell: req.params.spell_id });
});

spellsRoute.post('/add', async (req, res) => {
  res.render('add');
});

module.exports = spellsRoute;
