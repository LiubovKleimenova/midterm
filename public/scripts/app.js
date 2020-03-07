$(() => {
  $.ajax({
    method: "GET",
    url: "/"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
