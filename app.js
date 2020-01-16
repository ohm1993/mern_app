var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mentor = require('./routes/mentors');
var task = require('./routes/tasks');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mern-crud', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var app = express(); 
const port = 3000 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/mentor',mentor);
app.use('/api/task',task);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))