function gettable(scores) {
  var score_table = [];
  scores.forEach(function(val) {
    find_same_name(val, score_table);
  });

    score_table.forEach(function(val) {
      val.subjects.forEach(function(obj) {
        val[obj.subject] = obj.score;
      });
  })
  return score_table;
}

function find_same_name(val, score_table) {
  for (var i = 0; i < score_table.length; i++) {
    if (score_table[i].name === val.student_name) {
      score_table[i]['subjects'].push({
        subject: val.subject_name,
        score: val.score
      });
      return;
    }
  }
  score_table.push({
  //  id:val.student_id,
    name: val.student_name,
    subjects: [{
      subject: val.subject_name,
      score: val.score
    }],
  });
}
module.exports = gettable;
