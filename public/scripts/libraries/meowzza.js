window.Meowza = {};

$(document).ready(() => {
  Meowza.update(Meowza.user);
  loadCats();
  $(document).on("submit", ".login-form", e => {
    e.preventDefault();
    getUser();
  });

  $(document).on("click", ".add-to-favourites", addToFavourites);

  $(document).on("submit", "#new-cat-form", e => {
    e.preventDefault();
    createNewCat();
  });

  $(document).on("click", ".logout-button", logOut);
});

const getUser = () => {
  $.ajax({
    url: `/login`,
    type: "POST",
    data: $(".login-form").serialize(),
    success: response => {
      window.Meowza.user = response;
      Meowza.update(Meowza.user);
      Meowza.addNewCatForm(Meowza.user);
    }
  });
}

const logOut = () => {
  return $.ajax({
    method: "POST",
    url: "/logout",
    // data:
    success: () => {
      Meowza.update(null)
      // $(".new-cat-form").remove();
    }
  })
}

const loadCats = () => {
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
  $("main").find(".cats-container").remove();
  const $catListings = $(`
  <section class="cats-container">
  </section>
  `);
  window.Meowza.catListings = $catListings;

  cats.forEach(cat => {
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

$(".filters-form").submit(e => {
  //console.log(e);
  e.preventDefault();
  //console.log("filtered");
  window.Meowza.catListings.empty();
  loadFilteredCats();
});

// --------------ADD TO FAVOURITES --------------
const addToFavourites = function() {
  console.log("addToFAvs invoked");
  console.log(this);
  const catId = $(this).data("catid");
  console.log(catId);
  $.ajax({
    url: `/users/addToFavourites`,
    type: "POST",
    data: `catId=${catId}`,
    success: response => {
      console.log(response);
    }
  });
};

// ---------CREATE NEW CAT---------
const createNewCat = function() {
  console.log($(".new-cat-form").serialize());
  console.log("create cat foem submitted");
  $.ajax({
    url: `/admin/newcat`,
    type: "POST",
    data: $(".new-cat-form").serialize(),
    success: () => {
      //console.log("data submitted to db succ");
      $.ajax({
        url: `/users/`,
        type: "GET",
        dataType: "JSON",
        success: data => {
          //console.log("data recieved from server");
          $(".cats-container").empty();
          renderCats(data);
        }
      });
    }
  });
};

//--------------
