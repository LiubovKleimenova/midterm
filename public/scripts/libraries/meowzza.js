$(document).ready(() => loadCats());
window.Meowza = {}
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



const renderCats = function (cats) {
  // const catListings = cats.map(cat => Meowza.createListing(cat))
  console.log('rendercats invoked');
  const $catListings = $(`
    <section class="cats-container">
      <h1>hello</h1>

    </section>
  `);

  // cats.forEach(cat => {

  // });

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
