const express = require("express");
const router = express.Router();
const paginate = require('jw-paginate');
const Mentor = require("../models/Mentor");
router.post("/register", (req, res) => {
    Mentor.findOne({ mentor_email: req.body.mentor_email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        Mentor.create(req.body, function (err, mentor) {
          if (err) return next(err);
          res.json(mentor);
        });
      }
    });
});
router.get("/getall", (req,res) => {
  Mentor.find({}).sort([['mentor_company', 1]]).exec(function (err, mentors) {
    if (err) return next(err);
     const page = parseInt(req.query.page) || 1;
     const pageSize = 9;
     const pager = paginate(mentors.length, page, pageSize);
     var mentors = mentors.slice(pager.startIndex, pager.endIndex + 1);
     return res.json({ pager, mentors });
  });
})
router.get('/:id', function(req, res) {
  Mentor.findById(req.params.id, function (err, mentor) {
    if (err) res.status(400).send('unbale to get detail');
    res.json(mentor);
  });
});
router.put('/:id', function(req, res) {
  Mentor.findByIdAndUpdate(req.params.id, req.body, function (err, mentor) {
    if (err) res.status(400).send('unbale to update');
    res.json(mentor);
  });
});
router.delete('/:id', function(req, res) {
  Mentor.findByIdAndRemove(req.params.id,function (err, mentor) {
    if (err) res.status(400).send('unbale to delete');
    res.json(mentor);
  });
});

module.exports = router;