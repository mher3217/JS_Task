const WebSocket = require('ws');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const chatDB = mongoose.createConnection('mongodb://localhost:27017/chat');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

require('./models/channels');
require('./models/message');

let usersSchema = require('./models/users');

let db = {
  users: chatDB.model('users', usersSchema),
  channels: chatDB.model('channels'),
  message: chatDB.model('message')
};


const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', function connection(ws) {

  clients.push(ws);
  ws.send('\n1. authorize\n2.choose channels\n3.write message');

  ws.on('message', function incoming(message) {
    if(message == '1'){
      ws.send('insert name:' );
        username = message;
        users.createMany({
          username: db.users.username,
          age: db.users.age,
          time:db.message.date,
        });
      // ws.send('insert age:');
    // }
    }else if (message == '2') {
      //channels
    }else {
        (clients || []).forEach((c, i) => {
          if(c == ws){
            return;
          }
          c.send('User:' + i + '.Message-- ' + message);
        })
    }
  });
});


// ws.send (JSON.stringify ({
//   type: 'message',
//   message: message,
//   from: by,
//   time: time
// }));
