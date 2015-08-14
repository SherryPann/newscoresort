var express = require('express');
var hbs = require("hbs");
var app = express();
var fs = require("fs");
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set("view engine", "html");
app.engine("html", hbs.__express);
var score;
app.get('/', function(req, res) {
  fs.readFile("score.js","utf-8",function(err,data){
  score = data;
  score = eval(data);
  res.render('index', {
score: score
});
  })
});

app.get('/score',function(req,res) {
  var key = req.query.sortkey;
  var flag = req.query.asc;
  var arr = score.sort(function(a,b) {
    return (a[key] - b[key]) * flag;
  });
  res.send(arr);

});
app.listen(3000);
console.log('Listening on port http://locallhost:3000');
