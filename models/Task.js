const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    task_mentor_id: {
    type: String,
    required: true
  },
  task_name: {
    type: String,
    required: true
  },
  task_description: {
    type: String,
    required: true
  }
});
module.exports = Task = mongoose.model("tasks", TaskSchema);