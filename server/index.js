const { db } = require('./models');
const app = require('./app');

// Database
db.authenticate()
  .then(() => {
    console.log('Connection to database established');
    db.sync();
  })
  .catch(err => {
    console.error('Unaable to connect to the database', err);
  });

// Start server
const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
