const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = Schema({
    adminId: {
        type: String,
      },
      
  class: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  personal: {
    type: String,
    required: true,
  },
  professional_detail: {
    type: String,
    required: true,
  },
  payslip: {
    type: Number,
    required: true,
  },
  experince: {
    type: Number,
    required: true,
  },
});

module.exports = Teacher = mongoose.model("teacher",teacherSchema);