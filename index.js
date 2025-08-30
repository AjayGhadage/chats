const express = require('express');
const app = express();
const mongoose = require('mongoose'); // 🛠 Fixed typo from 'mangoose'
const path = require('path');
const Chat = require('./models/chat'); // 🛠 Fixed path to models/chat.js

// 🛠 Changed app.use to app.set for view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
// app.set('public', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


// 🛠 Fixed function name from 'Main' to 'main' to match the call
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/whatsapp');
  console.log("MongoDB connected successfully.");
}

// app.get('/chats', async (req, res) => {
//     let allChats = await Chat.find();
//     // console.log(allChats);
//     // res.send(allChats);
//     res.render("index.ejs", { chats: allChats });
// });
// let chat = new Chat({      
//     Form: "Ajay",
//     to: "AVishkar",
//     msg: "Hello, how are you?",
//     created_at: new Date()
//     });

//     chat.save()
//     .then((res) => console.log("Chat saved successfully. " + res))


app.get('/chats', async (req, res) => {
  let chat = new Chat({      
    Form: "Ajay",
    to: "AVishkar",
    msg: "Hello, how are you?",
    created_at: new Date()
    });

    chat.save()
    .then((res) => console.log("Chat saved successfully. " + res))

let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", { chats: chats });
});

app.put('/chats/:id', async (req, res) => {
  let { from, to , msg }= req.body;
  let newChat = new Chat({ 
    from: from, 
    to:to ,
    msg:msg,
    created_at: new Date()});
    console.log(newChat);
    res.send("working");
  });


app.get("/chats/new", (req, res) => {
  res.render("new.ejs");});

app.post('/chats', (req, res) => {
  let { from, to , msg }= req.body; 
  let newChat = new Chat({ 
    from: from, 
    to:to ,
    msg:msg,
    created_at: new Date()});
    newChat
    .save()
    .then((res) => console.log("Chat saved successfully. " + res))
    .catch((err) => console.log("Error saving chat: " + err));
    // res.send("Chat created successfully");
    res.redirect('/chats');
  });

app.get('/', (req, res) => {
  res.send('Root is working');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
