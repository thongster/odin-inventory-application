#! /usr/bin/env node

const { Client } = require('pg');

// allow use of .env
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS spells (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE,
  description VARCHAR(255),
  mana INTEGER NOT NULL CHECK (mana >= 0),
  cooldown INTEGER NOT NULL CHECK (cooldown >= 0),
  damage INTEGER,
  range TEXT NOT NULL CHECK (range IN ('Close', 'Medium', 'Long')),
  category_id INTEGER NOT NULL,
  CONSTRAINT fk_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE RESTRICT
);

INSERT INTO categories (name, description)
VALUES
(
  'Fire',
  'Offensive magic focused on raw damage, burning effects, and explosive force. Fire spells excel at dealing high damage but often come with longer cooldowns or higher mana costs.'
),
(
  'Water',
  'Adaptive magic centered on control, healing, and sustained effects. Water spells specialize in slowing enemies, restoration, and battlefield manipulation.'
),
(
  'Wind',
  'Fast and precise magic emphasizing mobility, speed, and lightning-based attacks. Wind spells often trade raw power for low mana cost and shorter cooldowns.'
),
(
  'Earth',
  'Defensive and controlling magic rooted in strength and stability. Earth spells focus on protection, crowd control, and durability through shields and terrain manipulation.'
),
(
  'Arcane',
  'Pure, unrefined magic drawn directly from mystical energy. Arcane spells provide versatile effects, utility, and powerful abilities unconstrained by elemental limits.'
);

INSERT INTO spells (name, description, mana, cooldown, damage, range, category_id)
VALUES
(
  'Fireball',
  'Launches a blazing projectile that explodes on impact, dealing heavy fire damage to distant targets.',
  30,
  5,
  80,
  'Long',
  (SELECT id FROM categories WHERE name = 'Fire')
),
(
  'Flame Wall',
  'Summons a wall of roaring flames that burns enemies who pass through it.',
  40,
  12,
  60,
  'Medium',
  (SELECT id FROM categories WHERE name = 'Fire')
),
(
  'Inferno Blast',
  'Unleashes a powerful burst of fire that engulfs the area in intense heat and destruction.',
  60,
  20,
  120,
  'Medium',
  (SELECT id FROM categories WHERE name = 'Fire')
),

(
  'Water Jet',
  'Fires a high-pressure stream of water that strikes enemies with focused force.',
  20,
  3,
  35,
  'Long',
  (SELECT id FROM categories WHERE name = 'Water')
),
(
  'Frost Bind',
  'Freezes the ground beneath enemies, slowing their movement and reducing their combat effectiveness.',
  30,
  10,
  25,
  'Medium',
  (SELECT id FROM categories WHERE name = 'Water')
),
(
  'Healing Stream',
  'Channels restorative water magic to gradually heal nearby allies over time.',
  35,
  8,
  NULL,
  'Close',
  (SELECT id FROM categories WHERE name = 'Water')
),

(
  'Gust',
  'Sends a sudden blast of wind that knocks enemies back and disrupts their balance.',
  15,
  2,
  20,
  'Medium',
  (SELECT id FROM categories WHERE name = 'Wind')
),
(
  'Lightning Strike',
  'Calls down a bolt of lightning from above, dealing swift and precise damage.',
  35,
  6,
  70,
  'Long',
  (SELECT id FROM categories WHERE name = 'Wind')
),
(
  'Wind Dash',
  'Propels the caster forward with a surge of wind, allowing rapid repositioning in combat.',
  20,
  5,
  NULL,
  'Close',
  (SELECT id FROM categories WHERE name = 'Wind')
),

(
  'Stone Fist',
  'Hardens the caster''s hand with stone, delivering a powerful close-range strike.',
  25,
  4,
  45,
  'Close',
  (SELECT id FROM categories WHERE name = 'Earth')
),
(
  'Earth Shield',
  'Forms a protective barrier of rock that absorbs incoming damage.',
  30,
  15,
  NULL,
  'Close',
  (SELECT id FROM categories WHERE name = 'Earth')
),
(
  'Quake',
  'Shakes the ground violently, damaging enemies and disrupting their footing.',
  50,
  18,
  90,
  'Medium',
  (SELECT id FROM categories WHERE name = 'Earth')
),

(
  'Arcane Bolt',
  'Fires a concentrated bolt of raw magical energy at a distant target.',
  25,
  3,
  55,
  'Long',
  (SELECT id FROM categories WHERE name = 'Arcane')
),
(
  'Mana Surge',
  'Releases unstable arcane energy to temporarily enhance magical output.',
  40,
  14,
  NULL,
  'Close',
  (SELECT id FROM categories WHERE name = 'Arcane')
),
(
  'Void Pulse',
  'Emits a wave of dark arcane power that damages everything caught in its radius.',
  60,
  22,
  110,
  'Medium',
  (SELECT id FROM categories WHERE name = 'Arcane')
);

`;

async function main() {
  const dbUrl = process.argv[2] || process.env.DATABASE_URL;
  console.log('seeding...');
  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
