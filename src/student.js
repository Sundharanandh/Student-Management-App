class Student {
    constructor(fullName, age, dateOfBirth, studentClass, subjects) {
        this.fullName = fullName;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
        this.studentClass = studentClass;
        this.subjects = subjects;
        this.calculatePercentageAndGrade();
    }
  
    calculatePercentageAndGrade() {
        const totalMarks = this.subjects.reduce((total, subject) => total + subject.marks, 0);
        this.percentage = (totalMarks / (this.subjects.length * 100)) * 100;
  
        if (this.percentage >= 90) {
            this.grade = 'A+';
        } else if (this.percentage >= 80) {
            this.grade = 'A';
        } else if (this.percentage >= 70) {
            this.grade = 'B';
        } else if (this.percentage >= 60) {
            this.grade = 'C';
        } else if (this.percentage >= 50) {
            this.grade = 'D';
        } else {
            this.grade = 'F';
        }
    }
  }
  
module.exports = Student;