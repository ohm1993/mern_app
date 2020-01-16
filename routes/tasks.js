const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
router.post("/create", (req, res) => {
        Task.create(req.body, function (err, task) {
          if (err) res.status(400).send('unbale to create');
          res.json(task);
        });
});
router.get("/:id", (req,res) => {
    Task.find({ task_mentor_id : req.params.id}, function (err, tasks) {
    if (err) return res.status(400).send('unbale to get the task');
    res.json(tasks);
    });
})
router.delete('/:id', function(req, res) {
  Task.findByIdAndRemove(req.params.id,function (err, mentor) {
    if (err) return res.status(400).send('unbale to delete');
    res.json(mentor);
  });
});
module.exports = router;