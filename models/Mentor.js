const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MentorSchema = new Schema({
    mentor_name: {
    type: String,
    required: true
  },
  mentor_email: {
    type: String,
    required: true
  },
  mentor_contact: {
    type: String,
    required: true
  },
  mentor_company: {
    type: String,
    default: true
  }
});
module.exports = Mentor = mongoose.model("mentors", MentorSchema);