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
const { v4: uuidv4 } = require('uuid'); // install uuid with: npm install uuid

app.post('/register', (req, res) => {
  const { email, password, username } = req.body;
  const db = readDB();

  // Check if user already exists
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

app.post('/messages', (req, res) => {
  const { senderId, message } = req.body;
  console.log(senderId, message);
  if (!senderId || !message) {
    return res.status(400).json({ error: 'senderId and message are required' });
  }

  const db = readDB();

  const newMessage = {
    id: uuidv4(),
    senderId,
    message,
    timestamp: new Date().toISOString()
  };

  db.messages.push(newMessage);
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://192.168.10.16:${PORT}/`);
});

