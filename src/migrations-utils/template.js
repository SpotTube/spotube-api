const { getDb } = require('../src/migrations-utils/db');

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  const db = await getDb();
  const docs = await db.collection('').find({}).toArray();
  // console.log(await getDb());
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
