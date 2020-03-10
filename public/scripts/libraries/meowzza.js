window.Meowza = {};

const getUser = () => {
  //console.log("getUser invoked");
  //console.log($(".login-form").serialize());
  //e.preventDefault();
  $.ajax({
    url: `/users/login`,
    type: "POST",
    data: $(".login-form").serialize(),
    success: response => {
      //console.log(response);
      window.Meowza.user = response;
      //console.log(window.Meowza.user);
      Meowza.update(Meowza.user);
      Meowza.addNewCatForm(Meowza.user);
    }
  });
}


$(document).ready(() => {
  Meowza.update(Meowza.user);
  loadCats();
  $(document).on("submit", ".login-form", e => {
    //console.log(e);
    e.preventDefault();
    getUser();
  });

  // ---------CREATE NEW CAT---------
  $(".create-cat").submit(e => {
    console.log("create cat foem submitted");
    $.ajax({
      url: `/admin/newcat`,
      type: "POST",
      data: $(".new-cat-from").serialize(),
      success: () => {
        console.log("data submitted to db succ");
        $.ajax({
          url: `/users/`,
          type: "GET",
          dataType: "JSON",
          success: data => {
            console.log("data recieved from server")
            $(".cats-container").empty();
            renderCats(data);
          }
        });
      }
    });
  });


  $(document).on("click", ".add-to-favourites",
    addToFavourites
  )
});
//console.log({ meowza: window.Meowza })

const loadCats = () => {
  //console.log('loadcats invoked');
  $.ajax({
    url: `/users/`,
    type: "GET",
    dataType: "JSON",
    success: response => {
      renderCats(response);
    }
  });
};

const loadFavouriteCats = () => {
  console.log("loadcats invoked");
  $.ajax({
    url: `/users/favourites`,
    type: "GET",
    dataType: "JSON",
    success: response => {
      renderCats(response);
    }
  });
};

const loadMyCats = () => {
  console.log("loadcats invoked");
  $.ajax({
    url: `/admin/mycats`,
    type: "GET",
    dataType: "JSON",
    success: response => {
      renderCats(response);
    }
  });
};

let today = new Date();
let date = today.getFullYear();

const renderCats = cats => {
  const $catListings = $(`
  <section class="cats-container">
  </section>
  `);
  //console.log(cats);
  window.Meowza.catListings = $catListings;

  cats.forEach(cat => {
    //console.log(cat)
    $catListings.append(Meowza.createListing(cat));
  });
  $("main").append($catListings);
};


// --------------FILTER CATS --------------
const loadFilteredCats = () => {
  console.log("loadFilteredCats invoked");
  console.log($(".filters-form").serialize());
  $.ajax({
    url: `/users/filteredCats`,
    type: "GET",
    //dataType: "JSON",
    data: $(".filters-form").serialize(),
    success: response => {
      //console.log(response);
      renderCats(response);
    }
  });
};


$(".filters-form").submit((e) => {
  //console.log(e);
  e.preventDefault();
  //console.log("filtered");
  window.Meowza.catListings.empty();
  loadFilteredCats();
});


// --------------ADD TO FAVOURITES --------------
const addToFavourites = function ()  {
  console.log("addToFAvs invoked");
  console.log(this);
  const catId= $(this).data("catid");
  console.log(catId);
  $.ajax({
    url: `/users/addToFavourites`,
    type: "POST",
    data: `catId=${catId}`,
    success: response => {
      console.log(response);
    }
  });
}

// $(".add-to-favourites").click(() => {
//   console.log("add-btn was cliked");
//   addToFavourites();
// });
