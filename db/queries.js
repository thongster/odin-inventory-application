const pool = require('./pool');

async function getAllSpells() {
  const { rows } = await pool.query('SELECT * FROM spells');
  return rows;
}

async function getAllElements() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getSpellById(id) {
  const { rows } = await pool.query('SELECT * FROM spells WHERE id = $1', [id]);
  return rows;
}

async function getSpellByElement(element) {
  const { rows } = await pool.query(
    'SELECT * FROM spells JOIN categories ON spells.category_id = categories.id WHERE category.name = $1',
    [element]
  );
}

async function addSpell() {
  console.log(pool);
}

async function updateSpell(id) {}

async function deleteSpell(id) {}

module.exports = {
  getAllSpells,
  getAllElements,
  getSpellById,
  getSpellByElement,
  addSpell,
  updateSpell,
  deleteSpell,
};
