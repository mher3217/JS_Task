const WebSocket = require('ws');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const passwordHash = require('password-hash');
//const path = require('path');
const access = require('./models/access_level.js')

const app = express();
const chatDB = mongoose.createConnection('mongodb://localhost:27017/chat');

// const publicPath = path.join(__dirname, './public')
// app.use(express.static(publicPath))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

require('./models/channels');
require('./models/message');

let usersSchema = require('./models/users');
let messageSchema =  require('./models/message');

let db = {
  users: chatDB.model('users', usersSchema),
  channels: chatDB.model('channels'),
  message: chatDB.model('message', messageSchema)
};


app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
})

app.listen(4500, function () {
   console.log('Example app listening on port 4500!')
})

//var WebSocketServer = require('ws').Server,
const wss = new WebSocket.Server({port: 27403})
let clients = {};
let channels = [];
var id;
wss.on('connection', function (ws) {


  ws.on('message', function (message) {

      let user = JSON.parse(message);

      if(user.channel_name){
        channels.push(user.channel_name);
        clients[user.channel_id] = [];
        return ;
      }
      if(user.login || user.autorize){

        if(user.autorize){
          db.users.create({
            username: user.username,
            password: user.password,
            age: user.age
          })
          return ws.send(JSON.stringify("new_user"));
        }else if(user.login){
            db.users.find(({username: user.username},{password: user.password}),
              (function(err, result) {
                  if(err || result == ""){
                    return ws.send("error_login");
                  }
                    channels[0] = user.username;
                    return ws.send(JSON.stringify(channels));
                    //return ws.send(user.username);
                    //ws.close();
             }))
        }
      }else if(user.channel_id){
        id = user.channel_id;
        clients[id].push(ws);
      }else if(user.message){

        let i = user.username;
        (clients[id] ).forEach((c, i) => {
          if(c == ws){
            return;
          }
          c.send(JSON.stringify(user.username + ": " + user.message) );
        })
      }


       // else{
       //   // db.message.create({
       //   //   text: user.message
       //   // })
         // var i = user.username;
         //  (clients || []).forEach((c, i) => {
         //    if(c == ws){
         //      return;
         //    }
         //    c.send(user.username + ": " + user.message );
         //  })
       // }


  });
});
