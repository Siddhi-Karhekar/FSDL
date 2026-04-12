const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data in POST requests
app.use(express.json());

// Sample Data (In-memory "Database")
let students = [
    { id: 1, name: "Siddhi", rollNo: "101" },
    { id: 2, name: "Rahul", rollNo: "102" }
];

// 1. GET Operation: Welcome Message
app.get('/', (req, res) => {
    res.send('Welcome to Assignment 6 REST API!');
});

// 2. GET Operation: Fetch all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// 3. POST Operation: Add a new student
app.post('/api/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        rollNo: req.body.rollNo
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});