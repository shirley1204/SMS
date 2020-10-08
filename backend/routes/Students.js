const express = require ('express')
const passport = require("passport");
const multer = require("../config/multer");
const aws = require("aws-sdk");
const router =express.Router()
const fileUpload = require("../config/multer");

const Student = require('../models/Students');
 const User = require('../models/Users')

router.get('/admin/students',passport.authenticate("jwt", { session: false }),
async (req,res) =>{
  console.log("im here");
 Student.find({ adminId: req.user.id })
            .then(student =>{
              console.log("now im hwere");
                if(student.length > 0){
                    res.status(200).json(student);
                }else{
                    res.status(404).json({msg:'no Students Data found'})
                }
            })
})

// post request

router.post('/admin/students',passport.authenticate("jwt", { session: false }) ,(req,res) =>{
 
    const newStudent = Student({
     
      adminId: req.user.id,
      studentname:req.body.studentname,
      std: req.body.std,
      board: req.body.board,
      school: req.body.school,
      batch: req.body.batch,
     fees: req.body.fees,
    
    })
console.log(newStudent);
newStudent
.save()
.then((student) => {
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(400).json({ msg: "something went wrong" });
  }
})
.catch((err) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});
})

router.put("/admin/student/:id",  passport.authenticate("jwt", { session: false }), (req, res) => {

   Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            studentname:req.body.studentname,
            std: req.body.std,
            board: req.body.board,
            school: req.body.school,
            batch: req.body.batch,
           fees: req.body.fees,
         
        },
      }
    )
      .then((student) => {
        res.status(200).json(student);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  //get single Resource
  router.get("/admin/student/:id", (req, res) => {
   Student.findOne({ _id: req.params.id })
      .then((student) => {
        res.status(200).json(student);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.delete('/admin/student/delete/:id', (req,res) => {
    Student.deleteOne({_id:req.params.id}).
    then((res) => {
      console.log(res);
  
    })
  })
module.exports = router;