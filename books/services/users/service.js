const mongoose = require('mongoose');

class UsersService {
  constructor(){
    const libery = mongoose.createConnection('mongodb://localhost:27017/libery');
    let usersSchema = require('./model.js');
    let booksSchema =  require('./model.js');
    this.db = {
      users: libery.model('users', usersSchema),
      books: libery.model('books', booksSchema),
    }
  }

  getUsers(){
    return new Promise((resolve, reject)=>{
      this.db.books.find().then(books =>{
        console.log(books);
        resolve(books);
      }).catch(err =>{
        reject(err);
      });
    });

  }
}

module.exports = new UsersService();
