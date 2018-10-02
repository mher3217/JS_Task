const express = require('express')
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')
const events = require('events')


const app = express()
const server = http.createServer(app)
const io = socketIO(server)

    const publicPath = path.join(__dirname, '../public')
    app.use(express.static(publicPath))

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

var port = process.env.PORT || 3000;


// var app = require('express')();
// var http = require('http').Server(app);
//var io = require('socket.io')(http);


io.on('connection', function(socket) {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
})


server.listen(port, ()=> {
    console.log('Server_start on port ' + port);
});
