const express = require('express');
const UsersRouter = express.Router();
const UsersService = require('./service.js');


///////////////////////////////
//////////////////////Get Books request!!!!!!!!!!!!!
UsersRouter.get('/books', (req, res)=> {
  let offset = isFinite(parseInt(req.query.offset))? parseInt(req.query.offset) : 0;
  if(offset < 0){
    offset = 0;
  }
  let limit = isFinite(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
  if(limit < 0 || limit > 100){
    limit = 100;
  }
  let p = UsersService.getBy_name({
    collection: 'books',
    name : req.query.name,
    offset: offset,
    limit: limit
  });

  p.then(books =>{
    return res.send(books);
  }).catch(err =>{
    console.log(err);
    return res.send('error_by book name')
  })
})
UsersRouter.get('/books/:id', (req,res)=>{
  let p = UsersService.getBy_ID({
    collection : 'books',
    id : req.params.id
  });
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
  let offset = isFinite(parseInt(req.query.offset))? parseInt(req.query.offset) : 0;
  if(offset < 0){
    offset = 0;
  }
  let limit = isFinite(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
  if(limit < 0 || limit > 100){
    limit = 100;
  }
  let p = UsersService.getBy_name({
    collection: 'users',
    name : req.query.name,
    offset: offset,
    limit: limit
  });
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{

    return res.send('error_by user_name')
  })
})
UsersRouter.get('/users/:id', (req,res)=>{
  let p = UsersService.getBy_ID({
    id : req.params.id,
    collection : 'users'
  });
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
  let p = UsersService.createBooks_Users({
    title : req.body.title,
    pages : req.body.pages,
    username : undefined
  });
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
UsersRouter.put('/book_put/:name', (req,res)=>{
  let p = UsersService.put_books_users({
    name : req.params.name,
    title : req.body.title,
    pages : req.body.pages,
    username : undefined
  });
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

UsersRouter.put('/user_put/:name', (req,res)=>{
  let p = UsersService.put_books_users({
    name : req.params.name,
    username : req.body.username
  });
  p.then(users =>{
    return res.send(users);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

///////////////////////////////
////////////////////// Delete request!!!!!!!!!!!!!

UsersRouter.delete('/book_delete/:key', (req,res)=>{
  let p = UsersService.deleteBy_key({
    key : req.params.key,
    collection : 'books'
  });
  p.then(data =>{
    return res.send(data);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

UsersRouter.delete('/user_delete/:key', (req,res)=>{
  let p = UsersService.deleteBy_key({
    key : req.params.key,
    collection : 'users'
  });
  p.then(data =>{
    return res.send(data);
  }).catch(err =>{
    console.log(err);
    return res.send('error')
  })
})

module.exports = UsersRouter;
