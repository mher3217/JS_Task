const express = require('express');
const UsersRouter = express.Router();
const UsersService = require('./service.js');

var optional = {};

///////////////////////////////
//////////////////////Get Books request!!!!!!!!!!!!!
UsersRouter.get('/books', (req, res)=> {
  optional.name = new RegExp('^' + (req.query.q || ''),'gi');
  optional.collection = 'books';
  let p = UsersService.getBy_name(optional);
  p.then(books =>{
    return res.send(books);
  }).catch(err =>{
    console.log(err);
    return res.send('error_by book name')
  })
})
UsersRouter.get('/books/:id', (req,res)=>{
  optional.name = 'books';
  optional.id = req.params.id;
  let p = UsersService.getBy_ID(optional);
  p.then(data =>{
    return res.send(data);
  }).catch(err =>{
    console.log(err);
    return res.send('error_by books_ID')
  })
});
///////////////////////////////
//////////////////////Get Users request!!!!!!!!!!!!!
UsersRouter.get('/users', function (req, res) {
  optional.name = new RegExp('^' + (req.query.q || ''),'gi');
  optional.collection = 'users';
  let p = UsersService.getBy_name(optional);
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{

    return res.send('error_by user_name')
  })
})
UsersRouter.get('/users/:id', (req,res)=>{
  optional.id = req.params.id;
  optional.name = 'users';
  let p = UsersService.getBy_ID(optional);
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{
    console.log(err);
    return res.send('error_by user_ID')
  })
});

///////////////////////////////
//////////////////////Create request!!!!!!!!!!!!!

var create = {};
UsersRouter.post('/new_book', (req, res)=>{
  create.title = req.body.title;
  create.pages = req.body.pages;
  create.username = undefined;
  let p = UsersService.createBooks_Users(create);
  p.then(books =>{
    return res.send(books);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
});
UsersRouter.post('/new_user', (req, res)=>{
  create.username = req.body.username;
  let p = UsersService.createBooks_Users(create);
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
});

///////////////////////////////
////////////////////// Put request!!!!!!!!!!!!!
let put = {};
UsersRouter.put('/book_put/:name', (req,res)=>{
  put.name = req.params.name;
  put.title = req.body.title;
  put.pages = req.body.pages;
  put.username = undefined;
  let p = UsersService.put_books_users(put);
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

UsersRouter.put('/user_put/:name', (req,res)=>{
  put.name = req.params.name;
  put.username = req.body.username;
  let p = UsersService.put_books_users(put);
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

///////////////////////////////
////////////////////// Delete request!!!!!!!!!!!!!
let delete_ = {};
UsersRouter.delete('/book_delete/:key', (req,res)=>{
  delete_.key = req.params.key;
  delete_.collection = 'books';
  let p = UsersService.deleteBy_key(delete_);
  p.then(data =>{
    return res.send(data);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

UsersRouter.delete('/user_delete/:key', (req,res)=>{
  delete_.key = req.params.key;
  delete_.collection = 'users';
  let p = UsersService.deleteBy_key(delete_);
  p.then(data =>{
    return res.send(data);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

module.exports = UsersRouter;
