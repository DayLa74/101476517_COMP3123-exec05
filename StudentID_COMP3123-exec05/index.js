const express = require('express');
const path = require('path');
const userRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));

app.use('/api/v1/user', userRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
