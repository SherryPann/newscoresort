function createtable(arr) {
  $("table tbody").empty();
  arr.map(function(val) {
    return $("table tbody").append(
      "<tr>" + "<td>" + val.name + "</td>" +
      "<td>" + val.math + "</td>" +
      "<td>" + val.english + "</td>" +
      "<td>" + val.chinese + "</td>"+"<td class='delete' data-name ={{name}}> Delete</td>"+"</tr>"
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


$(".delete").on("click",function(){

  var name1 = $(this).data("name");
  console.log(name1);
  $.get("/del",{nm:name1},function(resq){

  });
});

        $("#btnAdd").on("click",function(){
            var name1=prompt("please input the new name：");
            var math1=prompt("please input the math score：");
            var english1=prompt("please input the englsih score：");
            var chinese1=prompt("please input the chinese score：");
            $.get("/add",{name2:name1,math:math1,english:english1,chinese:chinese1},function(resq){

            });
            var newRow="<tr><td>"+name1+"</td><td>"+math1+"</td><td>"
            +english1+"</td><td>"+chinese1+"</td>"+" <td class='delete' data-name ={{name}}> Delete</td><tr>";
            $("tbody").append(newRow);
        });


})
