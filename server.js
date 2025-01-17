const express = require('express');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const app = express();

const PORT = 3000;

app.use(express.json());

const dataFile = path.join(__dirname, 'data', 'studentName.json')

if(!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]');
}

app.post('/add-student', (req, res) => {
    const { name, courseName, email, number, grade = 'p' } = req.body;

    if (!name || !courseName || !email || !number) {
        return res.status(400).json({ error: 'Name, course, email, and number are required.'})
    }

    const newStudent = { name, courseName, email, number, grade };

    const students = JSON.parse(fs.readFileSync(dataFile));

    students.push(newStudent);

    fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));

    res.status(201).json({ message: 'Student added!', student: newStudent })
});

app.get('/students', (req, res) => {
    const students = JSON.parse(fs.readFileSync(dataFile));

    res.status(200).json(students);
})

app.listen(PORT, () => {
    console.log(`Server is running on the http://localhost:${PORT}`);
});

//find a student by email