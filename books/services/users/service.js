const mongoose = require('mongoose');

class UsersService {
  constructor(){
    const libery = mongoose.createConnection('mongodb://localhost:27017/libery');
<<<<<<< HEAD
    let Schema = require('./model');
    this.db = {
        users: libery.model('users', Schema.usersSchema),
        books: libery.model('books', Schema.booksSchema),
      }
  }

  getBy_ID(optional){
    let obj_id = optional || {};
    var search_in;
    if(obj_id.name == 'books'){
      search_in = this.db.books;
    }else if(obj_id.name == 'users'){
      search_in = this.db.users;
    }
    return new Promise((resolve, reject)=>{
      search_in.findOne({_id : obj_id.id }).then(data =>{
        resolve(data);
      }).catch(err =>{
        reject(err);
      });
    });
  }

  getBy_name(optional){
    let op = optional || {};
    var search_in;
    var search_by;

    if(op.collection == 'books'){
      return new Promise((resolve, reject)=>{
        this.db.books.find({ title : op.name }).then(books =>{
          resolve(books);
        }).catch(err =>{

          reject(err);
        });
      });
    }else if(op.collection == 'users'){
      return new Promise((resolve, reject)=>{
        this.db.users.find({ username : op.name }).then(books =>{
          resolve(books);
        }).catch(err =>{

          reject(err);
        });
      });
    }
  }

  createBooks_Users(create){
    let cr = create || {};
    console.log(cr);
    if(!cr.username){
      return new Promise((resolve, reject)=>{
        this.db.books.create({title: cr.title, pages: cr.pages, occupied: false}).then(books =>{
          resolve(books);
        }).catch(err =>{
          reject(err);
        });
      });
    }else{
      return new Promise((resolve, reject)=>{
        this.db.users.create({username: cr.username}).then(users =>{
          resolve(users);
        }).catch(err =>{
          reject(err);
        });
      });
    }
  }
  put_books_users(create){
    let cr = create || {};
    console.log(cr);
    if(!cr.username){
      return new Promise((resolve, reject)=>{
        this.db.books.updateOne({title: cr.name},
        {
            title: cr.title,
            pages: cr.pages
        }).then(books =>{
          resolve(books);
        }).catch(err =>{
          reject(err);
        });
      });
    }else{
      return new Promise((resolve, reject)=>{
        this.db.users.updateOne({username: cr.name}, {username: cr.username}).then(users =>{
          resolve(users);
        }).catch(err =>{
          reject(err);
        });
      });
    }
  }
  deleteBy_key(delete_){
    let obj_key = delete_ || {};
    var search_in;
    if(obj_key.collection == 'books'){
      search_in = this.db.books;
    }else if(obj_key.collection == 'users'){
      search_in = this.db.users;
    }
    console.log(obj_key);
    return new Promise((resolve, reject)=>{
      search_in.deleteOne({key : obj_key.key }).then(data =>{
        resolve(data);
=======
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
>>>>>>> 5658a1c8768a17ae5302928695f2bf1eb7c9ecea
      }).catch(err =>{
        reject(err);
      });
    });
<<<<<<< HEAD
=======

>>>>>>> 5658a1c8768a17ae5302928695f2bf1eb7c9ecea
  }
}

module.exports = new UsersService();
