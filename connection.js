require('dotenv').config();
const monk = require('monk');

const db = monk(process.env.MONGO_URI);
const collection = db.get('document')

function connection() {
    return db.then(() => {
      console.log('Connected correctly to mongoDB');

      db.on('open', () => {
        console.log('Database connection opened');
      });
  
      db.on('error', (error) => {
        console.error(`Database error: ${error}`);
      });
      
      return db;

    });
  }
  
module.exports = {connection, collection}
