var access = function autorizeEachRecquest(acces_level){
  return function(req, res, next){
    if(acces_level == 'optional'){
      return next()
    }
      users.findOne({key: req.query.key}, (err, user)=>{
        if(err || !user){
          return res.send('access denied: no such user');
        }
        req.user = user;
        if(acces_level == 'admin' || user.role != 'admin'){
          return res.send('permetion denied');
        }
        return next();
      });
  }
}

module.exports = access;
