var express = require('express');
var hbs = require("hbs");
var fs = require("fs");
var gettable = require("./gettable.js");
var app = express();
var app = express();
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set("view engine", "html");
app.engine("html", hbs.__express);
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'TW_project'
});
var score = [];
connection.connect();
connection.query("select student_name,subject_name,score from scores,students,subjects where students.student_id = scores.student_id and scores.subject_id = subjects.subject_id",
function(err,rows){
  if(err) throw err;
   score = gettable(rows);

});

app.get('/', function(req, res) {
  console.log(score);
    res.render('index', {
      score: score
    });
});

app.get('/score',function(req,res) {
  var key = req.query.sortkey;
  var flag = req.query.asc;
  var arr = score.sort(function(a,b) {
    return (a[key] - b[key]) * flag;
  });
  res.send(arr);

});


app.get("/add",function(req,res){
  var name = req.query.name2;
  var math = req.query.math;
  var english = req.query.english;
  var chinese = req.query.chinese;
  var sql = "insert into scores (name,math,english,chinese) values ("+'\''+name+'\''+","+math+','+english+','+chinese+")";
  connection.query(sql,function(err,rows,field){
    if(err) throw err;
    //res.send("succese");
  });
});

app.get("/del",function(req,res){
  var sql = "delete from students where student_name=" +'\''+req.query.nm +'\'';
  connection.query(sql,function(err,rows){
    if(err) throw err;
  });
});

//connection.end();

app.listen(8080);
console.log('Listening on port http://locallhost:8080');
