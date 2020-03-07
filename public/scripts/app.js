$(() => {
  $.ajax({
    method: "GET",
    url: "/users",
    dataType: "JSON",
    success: response => {
      console.log('response');
    }
  });
  // .done((users) => {
  //   console.log(users);
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
});
