var express = require('express');
const StudentModel = require('../models/StudentModel');
const CityModel = require('../models/CityModel');
const ClassModel = require('../models/ClassModel');
var router = express.Router();

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   //SQL: SELECT * FROM students
   var studentList = await StudentModel.find({}).populate('class');
   //console.log(studentList);
   res.render('student/index', { studentList });
});

//DELETE feature
router.get('/delete/:id', async (req, res) => {
   //get id from url
   let id = req.params.id;
   //delete document in collection by id
   //SQL: DELETE FROM students WHERE id = "id"
   await StudentModel.findByIdAndDelete(id);
   //console.log("Delete student succeed !");
   //redirect to student list page
   res.redirect('/student');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM students
   //SQL: TRUNCATE TABLE students
   await StudentModel.deleteMany();
   res.redirect('/student');
})

//step 1: render "Add student" form for user to input data
router.get('/add', async (req, res) => {
   var cities = await CityModel.find({});
   var classes = await ClassModel.find({});
   res.render('student/add', { cities, classes });
})

//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   //get input data from form
   var student = req.body;
   //add data to database
   await StudentModel.create(student);
   //redirect to student homepage
   res.redirect('/student');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var student = await StudentModel.findById(id);
   res.render('student/edit', { student });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var student = req.body;
   await StudentModel.findByIdAndUpdate(id,student);
   res.redirect('/student');
})

//show student detail
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   var student = await StudentModel.findById(id);
   res.render('student/detail', { student });
})

//show student list (customer layout)(
router.get('/list', async (req, res) => {
   var students = await StudentModel.find({});
   res.render('student/list', { students });
})

//search by student name
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let students = await StudentModel.find({ name: new RegExp(keyword, "i") });
   res.render('student/index', { studentList : students });
})

//sort by student id ascending
router.get('/sortid/asc', async (req, res) => {
   let studentList = await StudentModel.find().sort({ name: 1 });
   res.render('student/index', { studentList });
})

//sort by student id descending
router.get('/sortid/desc', async (req, res) => {
   let studentList = await StudentModel.find().sort({ name: -1 });
   res.render('student/index', { studentList });
})

//filter student by "male" gender
router.get('/male', async (req, res) => {
   let studentList = await StudentModel.find({ gender : "Male"});
   res.render('student/index', { studentList });
})

//filter student by "female" gender
router.get('/female', async (req, res) => {
   let studentList = await StudentModel.find({ gender: "Female" });
   res.render('student/index', { studentList });
})

module.exports = router;
