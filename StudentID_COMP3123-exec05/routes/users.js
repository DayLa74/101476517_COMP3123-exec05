const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'user.json');

function readUsers() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

router.get('/profile', (req, res) => {
  const users = readUsers();
  if (!users) return res.status(500).json({ error: 'Could not read user data' });
  res.json(users);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const users = readUsers();
  if (!users || !users.length) return res.status(500).json({ error: 'No users found' });

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const safeUser = Object.assign({}, user);
  delete safeUser.password;
  res.json({ message: 'Login successful', user: safeUser });
});

router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logout.</b>`);
});

module.exports = router;
