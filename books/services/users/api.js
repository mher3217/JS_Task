const express = require('express');
const UsersRouter = express.Router();

UsersRouter.get('/books', (req, res)=> {
    db.books.find({title: new RegExp('^' + (req.query.q || ''),'gi')},
      (err, books) =>{
        if(err || !books){
          return res.send('books_error');
        }
        return res.send(books);
    });
})
UsersRouter.get('/books/:id', (req,res)=>{
  db.books.findOne({_id: req.params.id}, (err, books) =>{
      if(err || ! books){
        return res.send('book not found');
      }
      return res.send(books);
    })
});

UsersRouter.post('/new_book', (req, res)=>{
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

UsersRouter.put('/book_put/:name', (req,res)=>{
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
UsersRouter.delete('/book_delete/:key', (req,res)=>{
  db.books.deleteOne({key: req.params.key},
    function(err,book){
      if(err | !book){
        return res.send('book_delete error!!!!!');
      }
      return res.send('book_delete!!!');
    });
})

module.exports = UsersRouter;
