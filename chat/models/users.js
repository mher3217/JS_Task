const mongoose = require('mongoose');
const shortid = require('shortid');

function generateAPIKey(){
  return shortid.generate() + '_' + shortid.generate() + '_' + shortid.generate();
}

const usersSchema = new mongoose.Schema({
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
  password: String,
  age: Number,
  role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = usersSchema;
