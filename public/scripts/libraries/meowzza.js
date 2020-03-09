window.Meowza = {};

window.Meowza.user1 = {
  isAdmin: true,
  name: "Luba"
};

$(document).ready(() => {
  Meowza.update(Meowza.user1);
  loadCats();
  Meowza.addNewCatForm(Meowza.user1);
});
console.log({ meowza: window.Meowza })

const loadCats = () => {
  console.log('loadcats invoked');
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
  console.log(cats);
  window.Meowza.catListings = $catListings;

  cats.forEach(cat => {
    console.log(cat)
    $catListings.append(Meowza.createListing(cat));
  });
  $("main").append($catListings);
};

const loadFilteredCats = () => {
  console.log("loadFilteredCats invoked");
  $.ajax({
    url: `/users/filteredCats`,
    type: "GET",
    //dataType: "JSON",
    data: $(".filters-form").serialize(),
    success: response => {
      renderCats(response);
    }
  });
};


$(".filters-form").submit((e) => {
  console.log(e);
  //e.preventDefault();
  console.log("filtered");
  window.Meowza.catListings.empty();
  loadFilteredCats();
});


