// import db queries
const db = require('../db/queries');

async function getAllSpells(req, res) {
  const spells = await db.getAllSpells();
  res.render('spells', { spells: spells });
}

async function getSpellById(req, res) {
  const spell = await db.getSpellById(req.body.id);
  res.render('spells/:id', { spell: spell });
}

async function addSpellForm(req, res) {
  res.render('new');
}

// if (updated === 0) {
//   // spell not found OR bad category
// }

module.exports = { getAllSpells, getSpellById, addSpellForm };
