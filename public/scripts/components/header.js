
  window.header = {};

  const $pageHeader = $(".page-header");
  const $newListing = $(".new-listing");
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find(".user-nav").remove();
    let userNav;

    if (!user.isAdmin) {
      userNav = `
      <nav class="user-nav">
      <div>
        <ul class="user-links">
          <li class="user-link home-button">
            <a href="#">Home page</a>
          </li>
          <li class="user-link favourites-button">
            <a>Favourites</a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="auth-links">
          <li>Hi, ${user.name}!</li>
          <button class="mdc-button mdc-button--raised">
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Log Out</span>
          </button>
          <div>
            <img class="user-avatar" src="" alt="" width="" height="">
          </div>
        </ul>
      </div>
    </nav>
      `;
    } else {
      userNav = `
      <nav class="user-nav">
      <div>
        <ul class="user-links">
          <li class="user-link home-button">
            <a href="#">Home page</a>
          </li>
          <li class="user-link favourites-button">
            <a>Favourites</a>
          </li>
          <li class="user-link owner-button">
            <a>My cats</a>
          </li>
          <li class="user-link create-button">
            <a>Add new cat</a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="auth-links">
          <li>Hi, ${user.name}!</li>
          <button class="mdc-button mdc-button--raised">
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Log Out</span>
          </button>
          <div>
            <img class="user-avatar" src="" alt="" width="" height="">
          </div>
        </ul>
      </div>
    </nav>
      `;
    }

    $pageHeader.prepend(userNav);
  }

  window.Meowza.update = updateHeader;

  //updateHeader(user1);


  // getMyDetails().then(function(json) {
  //   updateHeader(json.user);
  // });

   $("header").on("click", ".favourites-button", function() {
     window.Meowza.catListings.empty();
     loadFavouriteCats();
   })

   $("header").on("click", ".home-button", function() {
     window.Meowza.catListings.empty();
     loadCats();
   });

   $("header").on("click", ".owner-button", function() {
     window.Meowza.catListings.empty();
     loadMyCats();
   });

   $("header").on("click", ".create-button", function() {
     $(".new-cat-form").toggle();
    //  $("header").on("click", ".create-button", function() {
    //    $(".new-cat-form").hide();
    //  });
   });


  //   getAllReservations()
  //     .then(function(json) {
  //       propertyListings.addProperties(json.reservations, true);
  //       views_manager.show("listings");
  //     })
  //     .catch(error => console.error(error));
  // });
  // $("header").on("click", ".my_listing_button", function() {
  //   propertyListings.clearListings();
  //   getAllListings(`owner_id=${currentUser.id}`).then(function(json) {
  //     propertyListings.addProperties(json.properties);
  //     views_manager.show("listings");
  //   });
  // });

  // $("header").on("click", ".home", function() {
  //   propertyListings.clearListings();
  //   getAllListings().then(function(json) {
  //     propertyListings.addProperties(json.properties);
  //     views_manager.show("listings");
  //   });
  // });

  // $("header").on("click", ".search_button", function() {
  //   views_manager.show("searchProperty");
  // });

  // $("header").on("click", ".login_button", () => {
  //   views_manager.show("logIn");
  // });
  // $("header").on("click", ".sign-up_button", () => {
  //   views_manager.show("signUp");
  // });
  // $("header").on("click", ".logout_button", () => {
  //   logOut().then(() => {
  //     header.update(null);
  //   });
  // });

  // $("header").on("click", ".create_listing_button", function() {
  //   views_manager.show("newProperty");
  // });

