<<<<<<< HEAD

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
  users_tbl[req.params.id] = {  }
  res.send('user_delete!!!');
})

app.listen(3000, ()=> {
    console.log('Server_start on port ');
});
=======

function foo(a){
  if((Math.sqrt(a) + "").indexOf(".") <= 0){
    return false;
  }

  let sub = (Math.sqrt(a) + "");
  let sqr = sub.substr(sub.indexOf(".") + 1);

  let pow = (Math.pow(a,2) + "");

  for(let i = 0; i < pow.length;  i++){
    for(let k = 0; k < pow.length;  k++){
      if(sqr[k] == pow[i]){
        return true;
      }
    }
  }
  return false;
}
//console.log(foo(6));
const express = require('express')
const app = express()
app.get('/', (req,res) => {
  res.send(foo(req.query.check));
})
app.listen(4000, ()=> {
    console.log('Server_start on port');
});
>>>>>>> e9806ce76868fbc072c5e38e58d5b3eb8dea3fac
