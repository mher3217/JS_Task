const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: String,
  age: Number
});

module.exports = usersSchema;
