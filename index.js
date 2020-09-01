const path = require('path');
const util = require('util');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 7777;

const clients = [];

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(helmet());

app.get('/', (req,res) => {
  console.log('app.get /')
  res.status(200).send({
    success: true,
    data: '/ GET OK'
  });
});

app.use(express.static(path.join(__dirname, 'www')));

app.post('/', (req, res) => {
  io.emit('image', req.body.picture);

  res.status(200).send({
    success: true,
    data: '/ POST OK'
  });
});

const server = http.listen(PORT, () => {
  console.log(`Listening @ ${PORT}`);
});

io.on('connection', socket => {
  clients.push(socket.id);
  const clientConnectedMsg = 'User connected ' + util.inspect(socket.id) + ', total: ' + clients.length;
  io.emit('iologs', clientConnectedMsg);
  console.log(clientConnectedMsg);

  socket.on('disconnect', ()=>{
    clients.pop(socket.id);
    const clientDisconnectedMsg = 'User disconnected ' + util.inspect(socket.id) + ', total: ' + clients.length;
    io.emit('iologs', clientDisconnectedMsg);
    console.log(clientDisconnectedMsg);
  });
});
