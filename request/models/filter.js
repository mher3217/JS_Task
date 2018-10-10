const mongoose = require('mongoose');
const shortid = require('shortid');

function generateAPIKey(){
  return shortid.generate() + '_' + shortid.generate() + '_' + shortid.generate();
}

const UsersSchema = new mongoose.Schema({
  key: {
    type: String,
    default: generateAPIKey()
  },
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
  },
  role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = UsersSchema;
