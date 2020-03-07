$(() => {
          const $catListings = $(`
    <section class="cats-container">
    <p>TEST</p>
    </section>
  `);

          window.$catListings = $catListings;
          window.catListings = {};

          function addCat(newCat) {
            $catListings.append(newCat);
          }

          function clearCats() {
            $catListings.empty();
          }
          window.catListings.clearCats = clearCats;

          // function addCats(cats) {
          //   clearCats();
          //   for (const catId in cats) {
          //     const cat = cats[catId];
          //     const listing = catListing.createListing(property, isReservation);
          //     addListing(listing);
          //   }
          // }
          // window.propertyListings.addProperties = addProperties;

          const $main = $("main");
          $main.append($catListings);
        });
