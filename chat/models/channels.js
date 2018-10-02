const mongoose = require('mongoose');

const channelsSchema = new mongoose.Schema({
  title: String,
  members: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users'
  }]
});

mongoose.model('channels', channelsSchema);
