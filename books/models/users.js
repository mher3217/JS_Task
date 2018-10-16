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
  username: {
    type:String,
    lowercase:true,
    trim:true,
    index:true,
    require:true
  },
  have_book:{
    type: []
  }
});

module.exports = usersSchema;
