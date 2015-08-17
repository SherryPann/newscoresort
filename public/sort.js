function createtable(arr) {
  $("table tbody").empty();
  arr.map(function(val) {
    return $("table tbody").append(
      "<tr id =" + val.name + ">" + "<td>" + val.name + "</td>" +
      "<td>" + val.math + "</td>" +
      "<td>" + val.english + "</td>" +
      "<td>" + val.chinese + "</td>" + "<td class='delete' data-name =" + val.name + "> Delete</td>" + "</tr>"
    )
  });
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

  $("tbody").on("click", ".delete", function() {
    var name = $(this).data("name");
    $.ajax({
      url: '/delete?nm=' + name,
      type: "DELETE",
      success: function(msg) {
        $("tbody #" + name).remove();
        if(msg.status === 200){
          alert("deleted successfully!");
        }
        else if(msg.status===404){
          alert(msg.message);
        }
      }
    });
  });


  $("#btnAdd").on("click", function() {
    var name = prompt("please input the new name：");
    var math = prompt("please input the math score：");
    var english = prompt("please input the englsih score：");
    var chinese = prompt("please input the chinese score：");

    $.ajax({
      url: '/add',
      type: "POST",
      data: {
        name: name,
        math: math,
        english: english,
        chinese: chinese
      },
      success: function(msg) {
        var newRow = "<tr id=" + name + "><td>" + name + "</td><td>" + math + "</td><td>" + english + "</td><td>" + chinese + "</td>" +
          " <td class='delete' data-name =" + name + "> Delete</td>" + "  <td class='modify' data-name =" + name + "> Modify</td></tr>";
        $("tbody").append(newRow);
        if(msg.status===200){
          alert("addded successfully!");
        }
        else if(msg.status===404){
          alert(msg.message);
        }
      }
    });
  });

  // $("#search").on("click",function(){
  //   var name = prompt("please input the name you searched:");
  //   $.get("/search",{namese:name},function(resq){
  //     console.log(resq);
  //   })
  // })

})
