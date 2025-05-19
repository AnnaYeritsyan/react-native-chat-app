const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbFile = './db.json';

const readDB = () => {
  const data = fs.readFileSync(dbFile);
  return JSON.parse(data);
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});
const { v4: uuidv4 } = require('uuid'); 

app.post('/register', (req, res) => {
  const { email, password, username } = req.body;
  const db = readDB();

  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const newUser = {
    id: uuidv4(),
    email,
    password,
    username
  };

  db.users.push(newUser);
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  res.status(201).json({ success: true, user: newUser });
});

app.get('/users/search', (req, res) => {
  const { query } = req.query;
  const db = readDB();

  const filteredUsers = db.users.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredUsers);
});


app.post('/chats/start', (req, res) => {
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'senderId and receiverId are required' });
  }

  const db = readDB();
  let chat = db.chats.find(c =>
    (c.senderId === senderId && c.receiverId === receiverId) ||
    (c.senderId === receiverId && c.receiverId === senderId)
  );

  if (!chat) {
    chat = {
      id: uuidv4(),
      senderId,
      receiverId,
      messages: []
    };
    db.chats.push(chat);
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  }

  res.json(chat);
});

app.post('/messages', (req, res) => {
  const { senderId, recipientId, message } = req.body;

  if (!senderId || !recipientId || !message) {
    return res.status(400).json({ error: 'senderId, recipientId, and message are required' });
  }

  const db = readDB();

  const newMessage = {
    id: uuidv4(),
    senderId,
    recipientId,
    message,
    timestamp: new Date().toISOString()
  };

  db.messages.push(newMessage);


  let chat = db.chats.find(chat =>
    (chat.senderId === senderId && chat.receiverId === recipientId) ||
    (chat.senderId === recipientId && chat.receiverId === senderId)
  );

  if (!chat) {
    chat = {
      id: uuidv4(),
      senderId,
      receiverId: recipientId,
      messages: []
    };
    db.chats.push(chat);
  }

  chat.messages.push(newMessage.id);

  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  res.status(201).json(newMessage);
});


app.get('/messages', (req, res) => {
  const { userId, contactId } = req.query;
  const db = readDB();

  const filteredMessages = db.messages.filter(msg =>
    (msg.senderId === userId && msg.recipientId === contactId) ||
    (msg.senderId === contactId && msg.recipientId === userId)
  );

  res.json(filteredMessages);
});

app.put('/messages/:id', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const db = readDB();

 
  const msgIndex = db.messages.findIndex(m => m.id === id);
  if (msgIndex === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  
  db.messages[msgIndex].message = message;
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  res.status(200).json({ success: true, message: 'Message updated', updatedMessage: db.messages[msgIndex] });
});




app.get('/chats/:userId', (req, res) => {
  const { userId } = req.params;
  const db = readDB();

  const userChats = db.chats.filter(chat =>
    chat.senderId === userId || chat.receiverId === userId
  );

  res.json(userChats);
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://192.168.10.16:${PORT}/`);
});

