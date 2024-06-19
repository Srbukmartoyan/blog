const express = require('express');
const { sequelize } = require('./models');
const router = require('./routes');
const { errorHandler } = require('./middleware/errorHandler.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/images', express.static('upload/images'));

app.use(express.json());
app.use('/', router);

app.use(errorHandler);

app.listen(PORT, async() => {
  console.log(`server up on http://localhost:${PORT}`);
  await sequelize.authenticate({
    logging: console.log 
  });
  console.log('Database Connected!');
})
