// import db queries
const db = require('../db/queries');

async function getAllElements(req, res) {
  const elements = await db.getAllElements();
  res.render('elements', { elements: elements });
}

async function getSpellsByElement(req, res) {
  let element = req.params.element;
  element = element.charAt(0).toUpperCase() + element.slice(1);
  const spells = await db.getSpellsByElement(element);
  res.render('spellByElementShow', { element: element, spells: spells });
}

// if (updated === 0) {
//   // spell not found OR bad category
// }

module.exports = { getAllElements, getSpellsByElement };
