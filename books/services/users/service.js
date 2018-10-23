const mongoose = require('mongoose');

class UsersService {
  constructor(){
    const libery = mongoose.createConnection('mongodb://localhost:27017/libery');
    let Schema = require('./model');
    this.db = {
        users: libery.model('users', Schema.usersSchema),
        books: libery.model('books', Schema.booksSchema),
      }
  }

  getBy_ID(optional){
    let obj_id = optional || {};
    var search_in;
    if(obj_id.collection == 'books'){
      search_in = this.db.books;
    }else if(obj_id.collection == 'users'){
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
    if(typeof(op.offset) != 'number'){
      op.offset = 0;
    };
    if(typeof(op.limit) != 'number'){
      op.limit = 10;
    };
    console.log(op);
    let name = new RegExp('^' + (op.name || ''),'gi');
    if(op.collection == 'books'){
      return new Promise((resolve, reject)=>{
        this.db.books.find({ title : name })
        .skip(op.offset)
        .limit(op.limit)
        .exec()
        .then(books =>{
          resolve(books);
        }).catch(err =>{

          reject(err);
        });
      });
    }else if(op.collection == 'users'){
      return new Promise((resolve, reject)=>{
        this.db.users.find({ username : name }).then(books =>{
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
      }).catch(err =>{
        reject(err);
      });
    });
  }
}

module.exports = new UsersService();
