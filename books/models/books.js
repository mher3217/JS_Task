const mongoose = require('mongoose');
const shortid = require('shortid');
var Schema = mongoose.Schema;

function generateAPIKey(){
  return shortid.generate() + '_' + shortid.generate() + '_' + shortid.generate();
}

const booksSchema = new mongoose.Schema({
  key: {
    type: String,
    default: generateAPIKey()
  },
  title: {
    type:String,
    lowercase:true,
  },
  occupied: Boolean,
  pages: Number,
  occupied_by: {
    obj: String,//{type: Schema.Types.ObjectId, ref: 'users'},
  }
});

module.exports = booksSchema;
