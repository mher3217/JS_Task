module.exports = {
    get_req_ID : function (req, res){
        users.findOne({_id: req.params.id}, (err,users) =>{
          if(err){
            return res.send('user not found');
          }
          console.log(users.username);
          res.send(users);
        })
    },

  post_req_ : function (req, res){
    users.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      age: req.body.age
    }, function(err,users){
        if(err){
          return res.send('error!!!!!');
        }
        return res.send('post_ok!!!');
    })
  },

  put_req_ : function (req, res){
    users.updateMany({username: req.params.name},{
      username: req.body.username,
      password: req.body.password,
      age: req.body.age
    }, function(err,user){
        if(err){
          return res.send('error!!!!!');
        }
        return res.send('put_ok!!!');
    })
  },

  delete_req_ : function (req, res){
    users.deleteOne({key: req.params.key}, function(err,user){
        if(err){
          return res.send('error!!!!!');
        }
        res.send('user_delete!!!');
      });
  }
}
