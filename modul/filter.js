const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
  username:{
    type:String,
    lowercase:true,
    trim:true,
    index:true,
    require:true
  },
  password:{
    type:String,
    minlength:4
  },
  age:{
    type:Number,
    default:18
  },
  created:{
    type:Date,
    default:Date.now
  }
  api_key:{
    
  }
});

module.exports = UsersSchema;
