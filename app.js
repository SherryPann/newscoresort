var express = require('express');
var hbs = require("hbs");
var fs = require("fs");
var gettable = require("./gettable.js");
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var app = express();
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

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
var scorelist = [];

connection.connect();


app.get('/', function(req, res) {
  connection.query("select student_name,subject_name,score from scores,students,subjects where students.student_id = scores.student_id and scores.subject_id = subjects.subject_id",
    function(err, rows) {
      if (err) throw err;
      rows = gettable(rows);
      console.log(rows);
      res.render('index', {
        score: rows
      });
    });
});

app.get('/score', function(req, res) {
  var key = req.query.sortkey;
  var flag = req.query.asc;
  connection.query("select student_name,subject_name,score from scores,students,subjects where students.student_id = scores.student_id and scores.subject_id = subjects.subject_id",
    function(err, rows) {
      if (err) throw err;
      rows = gettable(rows);
      var arr = rows.sort(function(a, b) {
        return (a[key] - b[key]) * flag;
      });
      res.send(arr);
    });
});


app.post("/add", function(req, res) {
  console.log(req.body);
  var name = req.body.name;
  var math = req.body.math;
  var english = req.body.english;
  var chinese = req.body.chinese;
  var sql = "insert into students(student_name)values(" + '\'' + name + '\'' + ");";
  connection.query(sql, function(err, rows) {
    if (err) throw err;
    var id = rows.insertId;
    connection.query("insert into scores(student_id,subject_id,score)values(" + id + ',1,' + math + "),(" + id + ',2,' + english + "),(" + id + ',3,' + chinese + ');', function(err, rows) {
      if (err) throw err;
      var messages = {};
      if (rows.affectedRows > 0) {
        messages = {
          status: 200,
          message: "",
          data: ""
        };
      } else {
        messages = {
          status: 404,
          message: "delete failed!",
          data: ""
        };
      res.send(messages);
    });
  });
});

app.delete("/delete", function(req, res) {
  var sql = "delete from students where student_name=" + '\'' + req.query.nm + '\'';
  connection.query(sql, function(err, rows) {
    if (err) throw err;
    var messages = {};
    if (rows.affectedRows > 0) {
      messages = {
        status: 200,
        message: "",
        data: ""
      };
    } else {
      messages = {
        status: 404,
        message: "delete failed!",
        data: ""
      };
    }
    res.send(messages);
  });
});

// app.get("/search", function(req, res) {
//     var name = req.query.namese;
//     console.log(name);
//   })
//connection.end();

app.listen(8080);
console.log('Listening on port http://locallhost:8080');
