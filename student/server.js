const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'school'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// GET all students
app.get('/students', (req, res) => {
    let sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET a particular student by regno
app.get('/students/:regno', (req, res) => {
    let sql = `SELECT * FROM students WHERE regno = ${db.escape(req.params.regno)}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// POST a new student
app.post('/students', (req, res) => {
    const newStudent = {
        regno: req.body.regno,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };
    let sql = 'INSERT INTO students SET ?';
    db.query(sql, newStudent, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student added', id: result.insertId });
    });
});

// PUT to update a student by regno
app.put('/students/:regno', (req, res) => {
    const updatedData = req.body;
    let sql = `UPDATE students SET ? WHERE regno = ${db.escape(req.params.regno)}`;
    db.query(sql, updatedData, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student updated' });
    });
});

// DELETE a student by regno
app.delete('/students/:regno', (req, res) => {
    let sql = `DELETE FROM students WHERE regno = ${db.escape(req.params.regno)}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student deleted' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
