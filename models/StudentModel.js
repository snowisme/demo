//declare mongoose
var mongoose = require('mongoose');
//declare schema (table design/structure)
var StudentSchema = mongoose.Schema(
   {
      id: String,
      name: String,
      birthYear: Number,   //integer
      gender: String,
      gpa: Number,         //double
      image: String,
      city: String,
      //1 class - many students
      class: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'classes'
      }
   }
);
//declare model (to be used in routes - controllers)
var StudentModel = mongoose.model("students", StudentSchema);  //students: collection name
//Note: in case collection name is single form (without "s" at the end)
//var StudentModel = mongoose.model("sinh vien", StudentSchema, "student");
//export module
module.exports = StudentModel;

