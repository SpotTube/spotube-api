const { MongoClient } = require('mongodb');
require('dotenv').config();
// import config from '../config';
// const { HOST, PORT, USER, PASSWORD, NAME: DB } = config().DATABASE;
const MONGO_URL = process.env.MIGRATE_dbConnectionUri;

module.exports = {
  async getDb() {
    console.log('Migrate mongo url: ', MONGO_URL);
    const client = await MongoClient.connect(MONGO_URL, {
      useUnifiedTopology: true,
    });
    return client.db(process.env.MONGO_DATABASE);
  },
};
