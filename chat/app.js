const WebSocket = require('ws');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = require('express')();


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


//const wss = new WebSocket.Server({ port: 8080 });

app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
})
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
})

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 8080})


wss.on('connection', function (ws) {
  ws.on('message', function (message) {


      console.log('received: %s', message);




    // if(db.users.find({username: user.username}),((err, result)=> {
    //          if (err) throw err;
    //          console.log(result);
    //      })){
    //
    // }



  });
});

// wss.on('connection', function connection(ws) {
//
//   clients.push(ws);
//   ws.send('\n1. authorize\n2.login\n3.write message');
//
//   ws.on('message', function incoming(message) {
//     if(message == '1'){
//
//       ws.send('insert name:' + 'insert age:');
//           while(met.username == null){
//             met.username = message;
//             console.log(met.username);
//           }
//           while(met.username == '1'){
//             met.age = message;
//             console.log(met.age);
//           }
//     }else if (message == '2') {
//       db.users.find(/*{username: "ator"},*/(function(err, result) {
//        if (err) throw err;
//        console.log(result);
//      }));
//       //channels
//     }else {
//         (clients || []).forEach((c, i) => {
//           if(c == ws){
//             return;
//           }
//           c.send('User:' + i + '.Message-- ' + message);
//         })
//     }
//   });
//
// });

// ws.send (JSON.stringify ({
//   type: 'message',
//   message: message,
//   from: by,
//   time: time
// }));
