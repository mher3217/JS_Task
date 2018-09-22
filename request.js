const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// let users = [
//   {id: 1, username: "mek", password: "1", age: 52},
//   {id: 2, username: "erku", password: "1", age: 52}
// ]

let users_tbl = {
  '1': {username: "mek", password: "1", age: 52},
  '2': {username: "erku", password: "1", age: 52}
}

var curr_id = 3;

app.use('/',(req,res,next)=>{
  console.log(req.url + '::' + new Date().toISOString().slice(0,10));
  next();
})

app.get('/users', (req,res)=>{
  res.send(users_tbl);
})

app.get('/users/:id', (req,res)=>{
  // users.forEach(i => {
  //   if(i.id == req.params.id){
  //     return res.send(i);
  //   }
  // });
  if(!users_tbl[req.params.id]){
    return res.status(404).send('Not found');
  }
  res.send(users_tbl[req.params.id]);
})

app.post('/new_user', (req,res)=>{
  users_tbl[curr_id++] = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age
  }
  res.send('post_ok!!!');
})

app.put('/user_put/:id', (req,res)=>{
  users_tbl[req.params.id] = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age
  }
  res.send('put_work!!!');
})

app.delete('/user_delete/:id', (req,res)=>{
  users_tbl[req.params.id] = null;
  res.send('user_delete!!!');
})

app.listen(3000, ()=> {
    console.log('Server_start on port ');
});
