require('dotenv').config();
const monk = require('monk');

const db = monk(process.env.MONGO_URI);
const collection = db.get('document')

function connection() {

  db.then(() => {
    console.log('Connected correctly to mongoDB');
  });
}

module.exports = { connection, collection }
