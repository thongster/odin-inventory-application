// import db queries
const db = require('../db/queries');

async function getAllElements(req, res) {
  const elements = await db.getAllElements();
  res.render('elements', { elements: elements });
}

async function getSpellsByElement(req, res) {
  let elementName = req.params.element;
  elementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);

  const data = await db.getSpellsByElement(elementName);

  const element = {
    id: data[0].c_id,
    name: data[0].element,
    description: data[0].c_description,
  };

  res.render('spellByElementShow', { element: element, spells: data });
}

// if (updated === 0) {
//   // spell not found OR bad category
// }

module.exports = { getAllElements, getSpellsByElement };
