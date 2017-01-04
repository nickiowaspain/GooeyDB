'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('aeqxadhz', 'aeqxadhz', 'qHz6IxCJsV2GXmiQRzEPTU_wj4WufZQh', {
  host: 'elmer-02.db.elephantsql.com',
  dialect: 'postgres'
});

sequelize
.authenticate()
.then((err) => console.log('SUCCESS!'))
.catch((err) => console.log('FAIL!'));

const Tutors = sequelize.define('tutors', {
  tutorId: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  studentId: Sequelize.INTEGER
});

const Students = sequelize.define('student', {
  studentId: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  tutorId: Sequelize.INTEGER
});

const fakeTutor = {
  firstName: 'Joe', 
  lastName: 'Kim',
  studentId: 1
}

const anotherOne = {
  firstName: 'Jimmy', 
  lastName: 'John',
  studentId: 2
}

const fakeStudent = {
  firstName: 'Scott', 
  lastName: 'Storch',
  tutorId: 1
}

const anotherStudent = {
  firstName: 'Will', 
  lastName: 'Sentance',
  tutorId: 2
}

Students.sync().then(() => {
  Students.create(fakeStudent);
});

Tutors.sync().then(() => {
  Tutors.create(fakeTutor);
});

Students.sync().then(() => {
  Students.create(anotherStudent);
});

Tutors.sync().then(() => {
  Tutors.create(anotherOne);
});

