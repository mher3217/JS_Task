const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now
  },
  autor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users'
  },
  channels: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'channels'
  }
});

mongoose.model('message', messageSchema);
