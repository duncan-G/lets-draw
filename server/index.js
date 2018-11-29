const app = require('./app');
const { db } = require('./models');

// Database
db.authenticate()
  .then(() => {
    console.log('Connection to database established');
    return db.sync();
  })
  .then(() => {
    console.log('Database has been synced');
  })
  .catch(err => {
    console.error('Unaable to connect to the database', err);
  });

// Start server
const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
