const app = require('./app');
const { db } = require('./models');

const PORT = process.env.SERVER_PORT || 8080;

db.authenticate()
  .then(() => {
    console.log('Connection to database established');
    return db.sync();
  })
  .then(() => {
    console.log('Database has been synced');
  })
  .then(() => {
      app.listen(PORT, () => {
      console.log('Listening on port', PORT);
    });
  })
  .catch(err => {
    console.error('Unable to start server', err);
  });
