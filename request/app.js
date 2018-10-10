const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UsersSchema = require('./models/filter.js')
const access = require('./models/access_level.js')
const passwordHash = require('password-hash');

const app = express();
const micagram = mongoose.createConnection('mongodb://localhost:27017/micagram');



const users = micagram.model('users', UsersSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/',(req,res,next)=>{
  console.log(req.url + '::' + new Date().toISOString().slice(0,10));
  next();
});


function handleUsersGateRequest(req,res){
  users.find({username: new RegExp('^' + (req.query.q || ''),'gi')},
    (err,users) =>{
      if(err){
        return res.send('error');
      }
      return res.send(users);
  });
}

app.get('/users', access('optional'), handleUsersGateRequest);

app.get('/users/:id', (req,res)=>{
  users.findOne({_id: req.params.id}, (err,users) =>{
      if(err){
        return res.send('user not found');
      }
      console.log(users.username);
      res.send(users);
    })
});

app.post('/new_user',  (req,res)=>{
  users.create({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    age: req.body.age
  }, function(err,users){
      if(err){
        return res.send('error!!!!!');
      }
      return res.send('post_ok!!!');
  })
});

app.put('/user_put/:name', access('user'), (req,res)=>{
  users.updateMany({username: req.params.name},{
    username: req.body.username,
    password: req.body.password,
    age: req.body.age
  }, function(err,user){
      if(err){
        return res.send('error!!!!!');
      }
      return res.send('put_ok!!!');
  })
})

app.delete('/user_delete/:key',access('admin'),  (req,res)=>{
  users.deleteOne({key: req.params.key}, function(err,user){
      if(err){
        return res.send('error!!!!!');
      }
      res.send('user_delete!!!');
    });
})

app.listen(3000, ()=> {
    console.log('Server_start on port ');
});
