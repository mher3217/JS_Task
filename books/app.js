const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const libery = mongoose.createConnection('mongodb://localhost:27017/libery');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let usersSchema = require('./models/users');
let booksSchema =  require('./models/books');
let db = {
  users: libery.model('users', usersSchema),
  books: libery.model('books', booksSchema),
}

app.get('/books', function (req, res) {
    db.books.find({title: new RegExp('^' + (req.query.q || ''),'gi')},
      (err, books) =>{
        if(err || !books){
          return res.send('books_error');
        }
        return res.send(books);
    });
})
app.get('/books/:id', (req,res)=>{
  db.books.findOne({_id: req.params.id}, (err, books) =>{
      if(err || ! books){
        return res.send('book not found');
      }
      return res.send(books);
    })
});

app.post('/new_book', (req, res)=>{
  db.books.create({
    title: req.body.title,
    pages: req.body.pages,
    occupied: false
  }, function(err, books){
      if(err || !books){
        return res.send('books_error!!!!!');
      }
      return res.send('books_post_ok!!!');
  })
});

app.put('/book_put/:name', (req,res)=>{
  db.books.updateOne({title: req.params.name},{
    title: req.body.title,
    pages: req.body.pages
  }, function(err,book){
      if(err || !book){
        return res.send('books_put error!!!!!');
      }
      return res.send('books_put_ok!!!');
  })
})
app.delete('/book_delete/:key', (req,res)=>{
  db.books.deleteOne({key: req.params.key},
    function(err,book){
      if(err | !book){
        return res.send('book_delete error!!!!!');
      }
      return res.send('book_delete!!!');
    });
})
//////////////////////////////////
/////////////////////////////////
////////////////////////////////
///////////////  USERS!!!!!!!!!!

app.get('/users/:id/books', function (req, res) {
    db.users.findOne({_id: req.params.id} ,
      (err, user) =>{
        if(err || !user){
          return res.send('user_books_error');
        }
        return res.send(user.have_book);
    });
})


const user_books = require('./requets_libery/add_delete_books.js');

app.post('/:user_id/:id/books',user_books.check, user_books.update_occupied, user_books.update_user_books);


app.put('/:user_id/:id/books', (req, res)=>{

  db.users.findOne({_id: req.params.user_id}, (err, user_books)=>{
    if(err || !user_books){
      return res.send('not find user_books: error');
    }
    let arr = user_books.have_book.filter(i => i != req.params.id);

    db.users.updateOne({_id: req.params.user_id}, {have_book : arr},
      (err, user) =>{
        if(err || !user){
          return res.send('user_books_error');
        }
        return res.send('update user books');
    });
  });

  db.books.updateOne({_id: req.params.id}, {occupied: false, occupied_by: null},(err, book_up)=>{
    if(err || !book_up){
      return res.send('book not update!!');
    }
  });
})


///////////////////////////////
////////////////////// Standart request!!!!!!!!!!!!!

app.get('/users', function (req, res) {
    db.users.find({username: new RegExp('^' + (req.query.q || ''),'gi')},
      (err, user) =>{
        if(err || !user){
          return res.send('user_error');
        }
        return res.send(user);
    });
})
app.get('/users/:id', (req,res)=>{
  db.users.findOne({_id: req.params.id}, (err, users) =>{
      if(err || ! users){
        return res.send('user not found');
      }
      return res.send(users);
    })
});

app.post('/new_user', (req, res)=>{
  db.users.create({
    username: req.body.username
  }, function(err, users){
      if(err || !users){
        return res.send('user_error!!!!!');
      }
      return res.send('user_post_ok!!!');
  })
});

app.put('/user_put/:name', (req,res)=>{
  db.users.updateOne({username: req.params.name},{
    username: req.body.username
  }, function(err, user){
      if(err || !user){
        return res.send('user_put error!!!!!');
      }
      return res.send('user_put_ok!!!');
  })
})
app.delete('/user_delete/:key', (req,res)=>{
  db.users.deleteOne({key: req.params.key},
    function(err, user){
      if(err | !user){
        return res.send('user_delete error!!!!!');
      }
      return res.send('user_delete!!!');
    });
})

app.listen(3000, function () {
   console.log('app listening on port 3000!')
})
