// models/chat.js
const mongoose = require('mongoose'); // ✅ Important import

const chatSchema = new mongoose.Schema({
  Form: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    maxlength: 50, // ✅ Fixed typo
    required: true
  },
  created_at: { // 🛠 Optional: match index.js
    type: Date,
    default: Date.now
  }
});

// ✅ Export once only
module.exports = mongoose.model('Chat', chatSchema);
