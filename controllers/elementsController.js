// import db queries
const db = require('../db/queries');

async function getAllElements(req, res) {
  const elements = await db.getAllElements();
  res.render('elements', { elements: elements });
}

// if (updated === 0) {
//   // spell not found OR bad category
// }

module.exports = { getAllElements };
