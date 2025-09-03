const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500 
  },
  image:{
    type: String,
  }, 
  likes: [{
    type: Array, 
    default: [], 
  }],
  dateCreated: {
    type: Date,
    default: Date.now ,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Post', postSchema);