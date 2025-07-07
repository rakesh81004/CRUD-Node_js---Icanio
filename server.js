
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, age, phone } = req.body;
  db.query('INSERT INTO users (name, age, phone) VALUES (?, ?, ?)', [name, age, phone], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.put('/api/users/:id', (req, res) => {
  const { name, age, phone } = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET name=?, age=?, phone=? WHERE id=?', [name, age, phone, id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.delete('/api/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id=?', [req.params.id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
