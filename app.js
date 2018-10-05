const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UsersSchema = require('./modul/filter.js')

const app = express();
const micagram = mongoose.createConnection('mongodb://localhost:27017/micagram');




const users = micagram.model('users', UsersSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/',(req,res,next)=>{
  console.log(req.url + '::' + new Date().toISOString().slice(0,10));
  next();
});

app.get('/users/filter', (req,res)=>{
  users.find({username: new RegExp('^' + req.query.a || " " ,'gi')},
    (err,users) =>{
    if(err){
      return res.send('error!!!!!');
    }
    res.send(users);
  })
});

app.get('/users', (req,res)=>{
  users.find((err,users) =>{
      if(err){
        return res.send('error!!!!!');
      }
      res.send(users);
    })
});

app.post('/new_user', (req,res)=>{
  users.create({
    username: req.body.username,
    password: req.body.password,
    age: req.body.age
  }, function(err,users){
      if(err){
        return res.send('error!!!!!');
      }
      return res.send('post_ok!!!');
  })
});

app.put('/user_put/:name', (req,res)=>{
  users.updateMany({username: req.params.name},{
    username: req.body.username,
    password: req.body.password,
    age: req.body.age
  }, function(err,users){
      if(err){
        return res.send('error!!!!!');
      }
      return res.send('post_ok!!!');
  })
})

app.delete('/user_delete/:name', (req,res)=>{
  users.deleteOne({username: req.params.name},
    function(err,users){
      if(err){
        return res.send('error!!!!!');
      }
      res.send('user_delete!!!');
    });
})

app.listen(3000, ()=> {
    console.log('Server_start on port ');
});
