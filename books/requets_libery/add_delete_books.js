const mongoose = require('mongoose');

let usersSchema = require('../models/users');
let booksSchema =  require('../models/books');
const libery = mongoose.createConnection('mongodb://localhost:27017/libery');

let db = {
  users: libery.model('users', usersSchema),
  books: libery.model('books', booksSchema),
}

module.exports = {
    check : function(req, res, next){
      db.books.findOne({_id: req.params.id},
        (err, book)=>{
          if(err || book.occupied){
              return res.send('book is yous by user id: ' + book.occupied_by);
          }
          next();
      })
    },

    update_occupied : function (req, res, next){
        db.books.updateOne( {_id: req.params.id}, {occupied: true, occupied_by:  req.params.user_id},
          (err, user_book)=>{
            if(err || !user_book){
              return res.send('book not found_error!!!!!');
            }
            next();
          }
        )
    },

    update_user_books : function (req, res, next){
          db.users.updateMany( {_id: req.params.user_id}, {$push : {have_book: req.params.id} },function(err,i){
            //booksSchema.have_book.push("aaaa");
            if(err || !i){
              return res.send('book not found_error!!!!!');
            }
          });
          return res.send('book found_ok!!!');
    }
}
