'use strict';
const { getDb } = require('../src/migrations-utils/db');
const { ObjectId } = require('mongodb');

module.exports.up = async function (next) {
  const db = await getDb();

  const messages = await db
    .collection('messages')
    .aggregate([
      // group documents unique by "email" field, add a new prop "doc" with the full document of the first doc found in the DB
      { $group: { _id: '$conversationId', doc: { $last: '$$ROOT' } } },

      // replace the "root" document with the first document found in the DB
      { $replaceRoot: { newRoot: '$doc' } },
    ])
    .toArray();
  console.log('Add last messages', messages);
  await Promise.all(
    messages.map(async (message) => {
      console.log('[last message]', message._id, message.conversationId);
      await db.collection('conversations').updateOne(
        {
          _id: new ObjectId(message.conversationId),
        },
        {
          $set: {
            lastMessage: message._id , // new ObjectId(message._id),
          },
        },
      );
    }),
  );
};

module.exports.down = async function (next) {
  const db = await getDb();
  await db.collection('conversations').updateMany({}, {
    $unset: {
      lastMessage: ''
    }
  })
  next();
};
