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

const loadCats = function() {
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

const loadFavouriteCats = function() {
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

const loadMyCats = function() {
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

const renderCats = function (cats) {
    const $catListings = $(`
    <section class="cats-container">
    </section>
  `);

  window.Meowza.catListings = $catListings;

  cats.forEach(cat => {
    console.log(cat)
    $catListings.append(Meowza.createListing(cat));
  });
  $("main").append($catListings);
};




// window.$catListings = $catListings;
// window.catListings = {};

// function addCat(newCat) {
//   $catListings.append(newCat);
// }

// function clearCats() {
//   $catListings.empty();
// }
// window.catListings.clearCats = clearCats;

// function addCats(cats) {
//   clearCats();
//   for (const catId in cats) {
//     const cat = cats[catId];
//     const listing = catListing.createListing(cat);
//     addListing(listing);
//   }
// }
// window.catListings.addCats = addCats;
