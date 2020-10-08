const express = require ('express')
const passport = require("passport");
const multer = require("../config/multer");
const aws = require("aws-sdk");
const router =express.Router()
const fileUpload = require("../config/multer");

const Teacher = require('../models/Teachers');
 const User = require('../models/Users')

router.get('/admin/teachers',passport.authenticate("jwt", { session: false }),
async (req,res) =>{
  console.log("im here");
 Teacher.find({ adminId: req.user.id })
            .then(teacher =>{
              console.log("now im hwere");
                if(student.length > 0){
                    res.status(200).json(teacher);
                }else{
                    res.status(404).json({msg:'no Students Data found'})
                }
            })
})

// post request

router.post('/admin/teachers',passport.authenticate("jwt", { session: false }) ,(req,res) =>{
 
    const newTeacher = Teacher({
     
      adminId: req.user.id,
      class: req.body.class,
      board: req.body.board,
      personal: req.body.personal,
      professional_detail: req.body.professional_detail,
      payslip: req.body.payslip,
      experince: req.body.experince,
    
    })
console.log(newTeacher);
newTeacher
.save()
.then((teacher) => {
  if (teacher) {
    res.status(200).json(teacher);
  } else {
    res.status(400).json({ msg: "something went wrong" });
  }
})
.catch((err) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});
})

router.put("/admin/teacher/:id",  passport.authenticate("jwt", { session: false }), (req, res) => {

   Teacher.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            class: req.body.class,
            board: req.body.board,
            personal: req.body.personal,
            professional_detail: req.body.professional_detail,
            payslip: req.body.payslip,
            experince: req.body.experince,
         
        },
      }
    )
      .then((teacher) => {
        res.status(200).json(teacher);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  //get single Resource
  router.get("/admin/teacher/:id", (req, res) => {
   Teacher.findOne({ _id: req.params.id })
      .then((teacher) => {
        res.status(200).json(teacher);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.delete('/admin/teacher/delete/:id', (req,res) => {
    Teacher.deleteOne({_id:req.params.id}).
    then((res) => {
      console.log(res);
  
    })
  })
module.exports = router;