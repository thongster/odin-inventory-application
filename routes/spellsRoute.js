// import router and create new router
const { Router } = require('express');
const spellsRoute = Router();

spellsRoute.get('/', (req, res) => {
  res.render('spellbook');
});

spellsRoute.get('/spells', (req, res) => {
  res.render('spellbook');
});

spellsRoute.get('/spells/:spell_id', (req, res) => {
  res.render('spellbook');
});

spellsRoute.post('/add', (req, res) => {
  res.render('add');
});

module.exports = spellsRoute;
