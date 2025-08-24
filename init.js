const mongoose = require('mongoose');
const Chat = require('./models/chat');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/whatsapp');
  console.log("MongoDB connected successfully.");

  let allchats = [
    { Form: "Avishkar", to: "Ajay", msg: "Hello, genius", created_at: new Date() },
    { Form: "ganesh", to: "yash", msg: "keep it up", created_at: new Date() },
    { Form: "yash", to: "ganesh", msg: "Thanks, bro", created_at: new Date() },
    { Form: "Ajay", to: "Avishkar", msg: "How are you?", created_at: new Date() },
    { Form: "Avishkar", to: "Ajay", msg: "I am fine, thanks!", created_at: new Date() },
    { Form: "ganesh", to: "yash", msg: "Let's meet tomorrow", created_at: new Date() },
    { Form: "yash", to: "ganesh", msg: "Sure, see you then!", created_at: new Date() },
  ];

  await Chat.insertMany(allchats);
  console.log("All chats saved successfully.");
}

main().catch(err => console.log(err));
