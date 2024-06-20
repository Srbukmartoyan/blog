const express = require('express');
const { sequelize } = require('./models');
const router = require('./routes');
const { errorHandler } = require('./middleware/errorHandler.js');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/images', express.static('upload/images'));

app.use(express.json());
app.use('/', router);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', (message) => {
    console.log('message: ' + message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(PORT, async() => {
  console.log(`server up on http://localhost:${PORT}`);
  await sequelize.authenticate({
    logging: console.log 
  });
  console.log('Database Connected!');
})
