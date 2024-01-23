const readlineSync = require('readline-sync');
const Student = require('./src/student');
const StudentManager = require('./src/studentManager');

function displayMenu() {
    console.log('1. Show all Students');
    console.log('2. Add a Student');
    console.log('3. Update a Student');
    console.log('4. Delete a Student');
    console.log('5. Filter Students');
    console.log('6. Search for a Student');
    console.log('7. Get Average Percentage of a Class');
    console.log('8. Calculate Average Marks of a Student');
    console.log('9. Exit');
}

function main() {
    let choice;
    do {
        displayMenu();
        choice = readlineSync.question('Enter your choice: ');

        switch (choice) {
            case '1':
                displayStudents();
                break;
            case '2':
                addStudent();
                break;
            case '3':
                updateStudent();
                break;
            case '4':
                deleteStudent();
                break;
            case '5':
                filterStudents();
                break;
            case '6':
                searchStudent();
                break;
            case '7':
                getAveragePercentageOfClass();
                break;
            case '8':
                getAverageMarksOfStudent();
                break;
            case '9':
                console.log('Exiting...');
                break;
            default:
                console.log('Invalid choice. Please try again.');
        }
    } while (choice !== '9');
}

function displayStudents() {
    const students = StudentManager.getAllStudents();
    students.forEach(student => {
        console.log(`
            Full Name: ${student.fullName}
            Age: ${student.age}
            Date of Birth: ${student.dateOfBirth}
            Class: ${student.studentClass}
            Subjects:`);
        student.subjects.forEach(subject => {
            console.log(`                ${subject.name}: ${subject.marks}`);
        });
        console.log('--------------------------------------');
    });
}


function addStudent() {
    console.log('Enter student details:');
    const fullName = readlineSync.question('Full Name: ');
    const age = parseInt(readlineSync.question('Age: '));
    const dateOfBirth = readlineSync.question('Date of Birth: ');
    const studentClass = readlineSync.question('Class: ');

    const subjects = [];
    const numSubjects = parseInt(readlineSync.question('Enter the number of subjects: '));
    for (let i = 0; i < numSubjects; i++) {
        const subjectName = readlineSync.question(`Subject ${i + 1} Name: `);
        const marks = parseInt(readlineSync.question(`Enter marks for ${subjectName}: `));
        subjects.push({ name: subjectName, marks });
    }

    const newStudent = new Student(fullName, age, dateOfBirth, studentClass, subjects);
    StudentManager.addStudent(newStudent);
    console.log('Student added successfully!');
}

function updateStudent() {
    const fullNameToUpdate = readlineSync.question('Enter the Full Name of the student to update: ');
    const studentToUpdate = StudentManager.getAllStudents().find(std => std.fullName === fullNameToUpdate);

    if (studentToUpdate) {
        console.log('Enter updated student details:');
        const updatedFullName = readlineSync.question('Full Name: ') || studentToUpdate.fullName;
        const updatedAge = parseInt(readlineSync.question('Age: ')) || studentToUpdate.age;
        const updatedDateOfBirth = readlineSync.question('Date of Birth: ') || studentToUpdate.dateOfBirth;
        const updatedStudentClass = readlineSync.question('Class: ') || studentToUpdate.studentClass;

        const updatedSubjects = [];
        const numSubjects = parseInt(readlineSync.question('Enter the number of subjects: '));
        for (let i = 0; i < numSubjects; i++) {
            const subjectName = readlineSync.question(`Subject ${i + 1} Name: `) || studentToUpdate.subjects[i].name;
            const marks = parseInt(readlineSync.question(`Enter marks for ${subjectName}: `)) || studentToUpdate.subjects[i].marks;
            updatedSubjects.push({ name: subjectName, marks });
        }

        const updatedStudent = new Student(updatedFullName, updatedAge, updatedDateOfBirth, updatedStudentClass, updatedSubjects);
        StudentManager.updateStudent(updatedStudent);
        console.log('Student updated successfully!');
    } else {
        console.log('Student not found.');
    }
}

function deleteStudent() {
    const fullNameToDelete = readlineSync.question('Enter the Full Name of the student to delete: ');
    StudentManager.deleteStudent(fullNameToDelete);
    console.log('Student deleted successfully!');
}

function filterStudents() {
    const classToFilter = readlineSync.question('Enter the Class to filter: ');
    const filteredStudents = StudentManager.getAllStudents().filter(std => std.studentClass === classToFilter);
    console.log(filteredStudents.length > 0 ? filteredStudents : 'No students found in the specified class.');
}

function searchStudent() {
    const fullNameToSearch = readlineSync.question('Enter the Full Name of the student to search: ');
    const foundStudent = StudentManager.getAllStudents().find(std => std.fullName === fullNameToSearch);
    console.log(foundStudent ? foundStudent : 'Student not found.');
}

function getAveragePercentageOfClass() {
    const studentClassForAverage = readlineSync.question('Enter the Class to calculate average percentage: ');
    const averagePercentage = StudentManager.getAveragePercentageOfClass(studentClassForAverage);
    console.log(averagePercentage ? `Average Percentage in ${studentClassForAverage}: ${averagePercentage.toFixed(2)}%` : 'No students found in the specified class.');
}

function getAverageMarksOfStudent() {
    const fullNameForAverage = readlineSync.question('Enter the Full Name of the student to calculate average marks: ');
    const averageMarks = StudentManager.getAverageMarksOfStudent(fullNameForAverage);
    console.log(averageMarks ? `Average Marks for ${fullNameForAverage}: ${averageMarks.toFixed(2)}` : 'Student not found.');
}

main();