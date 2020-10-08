const express = require ('express')
const passport = require("passport");
const multer = require("../config/multer");
const aws = require("aws-sdk");
const router =express.Router()
const fileUpload = require("../config/multer");

const Resource = require('../models/Resources');
 const User = require('../models/Users')

router.get('/admin/resources',passport.authenticate("jwt", { session: false }),
async (req,res) =>{
  console.log("im here");
 
 Resource.find({ adminId: req.user.id })
            .then(resource =>{
              console.log("now im hwere");
                if(resource.length > 0){
                    res.status(200).json(resource);
                }else{
                    res.status(404).json({msg:'no resource found'})
                }
            })
})

// post request

router.post('/admin/resources',fileUpload.single('resource'),passport.authenticate("jwt", { session: false }) ,(req,res) =>{
 
    const newResource = Resource({
     
      adminId: req.user.id,
    std: req.body.std,
    board: req.body.board,
    subject: req.body.subject,
    title: req.body.title,
    file: req.file.location,
    
    })
console.log(newResource);
newResource
.save()
.then((resource) => {
  if (resource) {
    res.status(200).json(resource);
  } else {
    res.status(400).json({ msg: "something went wrong" });
  }
})
.catch((err) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});
})

router.put("/admin/resource/:id",fileUpload.single('resource') ,  passport.authenticate("jwt", { session: false }), (req, res) => {

    Resource.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          subject: req.body.subject,
          std: req.body.std,
          board: req.body.board,
          title: req.body.title,
          file: req.file,
         
        },
      }
    )
      .then((resource) => {
        res.status(200).json(resource);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  //get single Resource
  router.get("/admin/resource/:id", (req, res) => {
    Resource.findOne({ _id: req.params.id })
      .then((resource) => {
        res.status(200).json(resource);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.delete('/admin/resource/delete/:id', (req,res) => {
    Resource.deleteOne({_id:req.params.id}).
    then((res) => {
      console.log(res);
  
    })
  })
module.exports = router;