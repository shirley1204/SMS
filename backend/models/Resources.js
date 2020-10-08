const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = Schema({
  adminId: {
    type: String,
    required:true,
  
  },
 std: {
    type: Number,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
 
  file: {
    type: String,
  
  },
});

module.exports = Resource = mongoose.model("resource", ResourceSchema);
