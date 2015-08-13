function createtable(arr) {
  $("table tbody").empty();
  arr.map(function(val) {
    return $("table tbody").append(
      "<tr>" + "<td>" + val.name + "</td>" +
      "<td>" + val.math + "</td>" +
      "<td>" + val.english + "</td>" +
      "<td>" + val.chinese + "</td>" + "</tr>"
    )
  })
}
$(function() {

  $("thead").on("click", "th", function() {
    var $th = $(this);
    if ($th.data("tag") === "name") {
      return;
    }
    var key = $th.data("tag");
    var flag = $th.data("flag");
    $.get("/score", {
      sortkey: key,
      asc: flag
    }, function(resq) {
      result = resq;
      createtable(result);
    })
    $th.data("flag", -flag);

  })
})