const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const get = require('get_metod.js')
// const post = require('post_metod.js')
// const put = require('put_metod.js')
// const delete = require('delete_metod.js')


const app = express();
const micagram = mongoose.createConnection('mongodb://localhost:27017/micagram');


const UsersSchema = new mongoose.Schema({
  username:{
    type:String,
    lowercase:true,
    trim:true,
    index:true,
    require:true
  },
  password:{
    type:String,
    minlength:4
  },
  age:{
    type:Number,
    default:18
  },
  created:{
    type:Date,
    default:Date.now
  }
});

const users = micagram.model('users', UsersSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/',(req,res,next)=>{
  console.log(req.url + '::' + new Date().toISOString().slice(0,10));
  next();
});

app.get('/users/filter', (req,res)=>{
  users.find({username: new RegExp('^' + req.query.a ,'gi')},
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
