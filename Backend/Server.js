const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jnc'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Get all students
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Add a student
app.post('/students', (req, res) => {
  const { regNo, name, department, class: classValue } = req.body;
  const sql = 'INSERT INTO students (regNo, name, department, class) VALUES (?, ?, ?, ?)';
  db.query(sql, [regNo, name, department, classValue || null], (err, result) => {
    if (err) throw err;
    res.send('Student added...');
  });
});

// Update a student
app.put('/students/:regNo', (req, res) => {
  const { regNo } = req.params;
  const { name, department, class: classValue } = req.body;
  const sql = 'UPDATE students SET name = ?, department = ?, class = ? WHERE regNo = ?';
  db.query(sql, [name, department, classValue, regNo], (err, result) => {
    if (err) throw err;
    res.send('Student updated...');
  });
});

// Delete a student
app.delete('/students/:regNo', (req, res) => {
  const { regNo } = req.params;
  const sql = 'DELETE FROM students WHERE regNo = ?';
  db.query(sql, [regNo], (err, result) => {
    if (err) throw err;
    res.send('Student deleted...');
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));