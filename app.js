var score = [{"name": "sherry","math": 90,"english": 80,"chinese":88},
             {"name": "Domen","math": 99,"english": 83,"chinese":87},
             {"name": "qiaotao","math": 100,"english": 78,"chinese":81},
             {"name": "snow","math": 92,"english": 88,"chinese":82 },
             {"name": "haha","math": 82,"english": 98,"chinese":83 },
             {"name": "john","math": 60,"english": 70,"chinese":84 },
             {"name": "kim","math": 96,"english": 95,"chinese":86 },
             {"name": "john","math": 86,"english": 84,"chinese":89 }
             ];
var express = require('express');
var hbs = require("hbs");
var app = express();
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set("view engine", "html");
app.engine("html", hbs.__express);
app.get('/', function(req, res) {
  res.render('index',{score:score});
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
