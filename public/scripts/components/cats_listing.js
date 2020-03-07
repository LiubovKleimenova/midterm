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

  // function addProperties(properties, isReservation = false) {
  //   clearListings();
  //   for (const propertyId in properties) {
  //     const property = properties[propertyId];
  //     const listing = propertyListing.createListing(property, isReservation);
  //     addListing(listing);
  //   }
  // }
  // window.propertyListings.addProperties = addProperties;

  const $pageMain = $("main");
  $pageMain.append($catListings);
});
