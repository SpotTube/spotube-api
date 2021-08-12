const { getDb } = require('../src/migrations-utils/db');
const { ObjectId } = require('mongodb');
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  const db = await getDb();

  const participants = await db.collection('participants').find({}).toArray();
  // console.log('participant', participants);
  await Promise.all(
    participants.map(async (participant) => {
      console.log('user id', new ObjectId(participant.userId));
      await db.collection('participants').updateOne(
        {
          _id: new ObjectId(participant._id),
        },
        {
          $set: {
            user: new ObjectId(participant.userId),
          },
        },
      );
    }),
  );
  // console.log(await getDb());
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
