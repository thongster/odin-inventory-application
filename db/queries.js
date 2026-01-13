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
  return rows[0];
}

async function getSpellByElement(element) {
  const { rows } = await pool.query(
    `SELECT * FROM spells 
    JOIN categories ON spells.category_id = categories.id 
    WHERE categories.name = $1`,
    [element]
  );
  return rows;
}

async function addSpell(
  name,
  description,
  mana,
  cooldown,
  damage,
  range,
  element
) {
  await pool.query(
    `INSERT INTO spells (name, description, mana, cooldown, damage, range, category_id) 
    VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM categories WHERE name = $7))`,
    [name, description, mana, cooldown, damage, range, element]
  );
}

async function updateSpell(
  name,
  description,
  mana,
  cooldown,
  damage,
  range,
  element,
  id
) {
  const { rowCount } = await pool.query(
    `UPDATE spells
        SET name = $1, description = $2, mana = $3, cooldown = $4, damage = $5, range = $6,
        category_id = (SELECT id FROM categories WHERE name = $7)
        WHERE id = $8`,
    [name, description, mana, cooldown, damage, range, element, id]
  );

  return rowCount;
}

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
