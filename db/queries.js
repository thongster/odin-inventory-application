const pool = require('./pool');

async function getAllSpells() {
  const { rows } = await pool.query(
    `SELECT spells.*, categories.name AS element 
    FROM spells
    JOIN categories ON spells.category_id = categories.id`
  );
  return rows;
}

async function getAllElements() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getSpellById(id) {
  const { rows } = await pool.query(
    `SELECT spells.*, categories.name AS element 
    FROM spells 
    JOIN categories ON spells.category_id = categories.id
    WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function getSpellsByElement(element) {
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
  id,
  name,
  description,
  mana,
  cooldown,
  damage,
  range,
  element
) {
  const { rowCount } = await pool.query(
    `UPDATE spells
        SET name = $2, description = $3, mana = $4, cooldown = $5, damage = $6, range = $7,
        category_id = (SELECT id FROM categories WHERE name = $8)
        WHERE id = $1`,
    [id, name, description, mana, cooldown, damage, range, element]
  );

  return rowCount;
}

async function deleteSpell(id) {
  await pool.query(
    `DELETE FROM spells
        WHERE id = $1`,
    [id]
  );
}

module.exports = {
  getAllSpells,
  getAllElements,
  getSpellById,
  getSpellsByElement,
  addSpell,
  updateSpell,
  deleteSpell,
};
