const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const UsersRouter = require('./services/users/api.js');

const libery = mongoose.createConnection('mongodb://localhost:27017/libery');
let usersSchema = require('./models/users.js');
let booksSchema =  require('./models/books.js');
let db = {
  users: libery.model('users', usersSchema),
  books: libery.model('books', booksSchema),
}


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use('/router', UsersRouter);


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


app.listen(4000, function () {
   console.log('app listening on port 4000!')
})
