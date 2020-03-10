window.Meowza.createListing = (cat) => {
  let avalMessage = ''
  if (!cat.is_available) {
    avalMessage = 'ADOPTED';
  }
  return `
  <article class="cats-listing mdc-card--outline">
    <div class="cat-details-container">
      <div class="cats-listing__preview-image">
        <img src="${cat.main_photo_url}" alt="cat's photo">
      </div>
      <div class="cat_listing__interaction">
        <div class="mdc-card__actions">
          <button class="mdc-icon-button
            mdc-card__action mdc-card__action--icon cat_listing__interaction-button add-to-favourites"
            aria-pressed="false"
            aria-label="Add to favorites"
            title="Add to favorites">
            <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
            <i class="material-icons mdc-icon-button__icon">favorite_border</i>
          </button>
        </div>
      </div>
      <ul class="cat-listing__details">
        <li>Age: ${date - Number(cat.birthdate.slice(0, 4))} years</li>
        <li>Region: ${cat.region}</li>
        <li>Species: ${cat.species}</li>
        <li>Size: ${cat.size}</li>
        <li class="cat-listing__price">Adoption fee: $${cat.fee}</li>
      </ul>
    </div>

    <section class="cat-listing__details">
      <h3 class="cat-listing__name">${cat.name}</h3>
      <p>${cat.description}</p>
      <form>
        <textarea class="message" placeholder="Interested? Leave a message directly for the owner!"></textarea>
        <label for="users-mail">Or get contacted by email:</label>
        <input type="email" class="users-mail" id="users-mail" placeholder="Your email">
        <button type="submit" class="mdc-button">
          <div class="mdc-button__ripple"></div>
          Send message
        </button>
      </form>
    </section>
  </article>
  `;
  // removed as we will not need to display is available
  // <div class="cat-listing__availability">
  //   <div class="cat-listing__availability">${cat.isAvailable}
  //   </div>
  // </div>
}
