const fs = require('fs');
const Student = require('./student').default;

const FILE_PATH = 'data/students.json';

function readStudents() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeStudents(students) {
    const data = JSON.stringify(students, null, 2);
    fs.writeFileSync(FILE_PATH, data, 'utf8');
}

module.exports = { readStudents, writeStudents };

let students = readStudents();

function addStudent(student) {
    students.push(student);
    writeStudents(students);
}

function updateStudent(updatedStudent) {
    students = students.map(std =>
        std.fullName === updatedStudent.fullName ? updatedStudent : std
    );
    writeStudents(students);
}

function deleteStudent(fullName) {
    students = students.filter(std => std.fullName !== fullName);
    writeStudents(students);
}

function getAllStudents() {
    return students;
}

function getAveragePercentageOfClass(studentClass) {
    const classStudents = students.filter(std => std.studentClass === studentClass);
    if (classStudents.length === 0) {
        return 0;
    }
    const totalPercentage = classStudents.reduce((sum, std) => sum + std.percentage, 0);
    return totalPercentage / classStudents.length;
}

function getAverageMarksOfStudent(fullName) {
    const student = students.find(std => std.fullName === fullName);
    if (student) {
        const totalMarks = student.subjects.reduce((sum, subject) => sum + subject.marks, 0);
        return totalMarks / student.subjects.length;
    }
    return 0;
}

module.exports = {
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getAveragePercentageOfClass,
    getAverageMarksOfStudent,
};