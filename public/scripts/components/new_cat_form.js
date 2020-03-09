function addNewCatForm(user) {
  const $pageHeader = $(".page-header");
  const $newListing = $(".new-listing");
  let $newCatForm = `<form action="/" method="post" id="new-cat-form" class="new-cat-form">
      <p>Create new</p>
      <fieldset class="new-cat-form__field-wrapper">
        <label for="new-name-form__name">Name</label>
        <input type="text" name="name" placeholder="Fluffy" id="new-cat-form__name">
      </fieldset>

      <fieldset>
        <label for="new-cat-form__photo">Name</label>
        <input type="file" name="cat_photo" id="new-cat-form__photo">
      </fieldset>

      <fieldset class="new-cat-form__field-wrapper">
        <label for="new-cat-form__description">Description</label>
        <textarea placeholder="Add your description here" name="description" id="cat-form__description" cols="50" rows="10"></textarea>
      </fieldset>


      <div class="new-cat-form__field-wrapper">
        <label for="new-cat-form__birth-date">Date of birth</label>
        <input placeholder="2018-12-31" type="number" name="birth-date" id="new-cat-form__birth-date">

        <label for="new-cat-form__species">Species</label>
        <input placeholder="Puma" type="text" name="species" id="new-cat-form__species">

        <label for="new-cat-form__size">Size</label>
        <select id="new-cat-form__size" name="size">
          <option name="size" value="s">S</option>
          <option name="size" value="m">M</option>
          <option name="size" value="l">L</option>
        </select>
      </div>

      <div class="new-cat-form__field-wrapper">
        <label for="new-cat-form__region">Region</label>
        <select id="new-cat-form__region" name="region">
          <option name="region" value="asia">Asia</option>
          <option name="region" value="europe">Europe</option>
          <option name="region" value="africa">Africa</option>
          <option name="region" value="northAmerica">North America</option>
          <option name="region" value="southAmerica">South America</option>
        </select>
      </div>

      <div class="new-cat-form__field-wrapper">
        <label for="new-cat-form__fee">Adoption fee</label>
        <input placeholder="5000" type="number" name="adoption_fee" id="new-cat-form__fee">
      </div>

      <div class="new-cat-form__field-wrapper">
        <label for="new-cat-form__cover">Cat's Image</label>
        <input placeholder="Cover Image" type="text" name="cover_photo_url" id="new-cat-form__cover">
      </div>

      <div class="new-cat-form__field-wrapper">
        <button type="submit">Create</button>
        <button type="reset">Reset</button>
      </div>

    </form>`;
  if (user.is_admin) {
    $pageHeader.append($newCatForm);
  }
}

window.Meowza.addNewCatForm = addNewCatForm;

//addNewCatForm(user1);

// $newcatForm.addressfield({
//   json: "javascript/libraries/addressfield/addressfield.min.json",
//   fields: {
//     country: "#new-cat-form__country",
//     locality: "#new-cat-form__locality-fields",
//     localityname: "#new-cat-form__city",
//     administrativearea: "#new-cat-form__state",
//     postalcode: "#new-cat-form__zip"
//   }
// });

// $newcatForm.on("submit", function(event) {
//   event.preventDefault();

//   views_manager.show("none");

//   const data = $(this).serialize();
//   submitcat(data)
//     .then(() => {
//       views_manager.show("listings");
//     })
//     .catch(error => {
//       console.error(error);
//       views_manager.show("listings");
//     });
// });

// $("body").on("click", "#cat-form__cancel", function() {
//   views_manager.show("listings");
//   return false;
// });
