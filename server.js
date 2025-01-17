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
    const studentsToAdd = req.body; 

    if (!Array.isArray(studentsToAdd)) {
        return res.status(400).json({ error: 'Input should be an array of students.' });
    }

    for (const student of studentsToAdd) {
        const { name, courseName, email, number, grade = 'p'} = student;

        if (!name || !courseName || !email || !number) {
            return res.status(400).json({
                error: 'Each student must have a name, courseName, email, and number.'
            })
        }
    }

    const existingStudent = JSON.parse(fs.readFileSync(dataFile));

    existingStudent.push(...studentsToAdd);

    fs.writeFileSync(dataFile, JSON, stringify(existingStudents, null, 2));

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