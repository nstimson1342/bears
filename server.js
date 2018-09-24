
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
})

router.route('/bears')
.post(function(req, res) {

  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err) {
    if (err)
      res.send(err);


    res.json({ message: 'Bear created!' });
  })
})
.get(function(req, res) {
  Bear.find(function(err, bears) {
    if(err)
        res.send(err);
  })
})

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
