const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = Schema({
adminId: {
        type: String,
        required:true,
     },
     
    studentname:{
        type:String,
        required:true
    },
    std:{
        type:Number,
        required:true
    },
    board:{
        type:String,
        required:true
    },
    school:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
 
   fees: {
    type: Number,
    required: true,
  },
  joiningDate:{
    type:Date,
    default:Date.now()
},
});

module.exports = Student= mongoose.model("student",studentSchema);