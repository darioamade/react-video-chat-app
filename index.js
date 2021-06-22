const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const dotenv = require('dotenv');
// const { METHODS } = require('http');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
dotenv.config({ path: './config.env' });
app.use(cors());

// START SERVER
const port = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.send(`Server is running  ✅ `);
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.oon('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall.emit('calluser', { signal: signalData, from, name }));
  });
  socket.on('answercall', (data) => {
    io.to(data.to).emit('callaccepted', data.signal);
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
