window.Meowza.createListing = (cat) => {
  let avalMessage = ''
  if (!cat.is_available) {
    avalMessage = 'SOLD';
  }
  return `
  <article class="cats-listing">
    <div class="cat_listing__interaction">
      <button type="button" class="cat_listing__interaction-button add-to-favourites">

        <img src="" alt="add to favourites" width="20" height="20">
      </button>
      <button type="button" class="cat_listing__interaction-button contact-button">

        <img src="" alt="contact the seller" width="20" height="20">
      </button>
    </div>
    <div class="cats-listing__preview-image">
      <img src="${cat.thumbnail_photo_url}" alt="cat's photo">
    </div>

    <section class="cat-listing__details">
      <h3 class="cat-listing__name">${cat.name}</h3>
      <ul class="cat-listing__details">
        <li>Age: ${date - Number(cat.birthdate.slice(0, 4))} years</li>
        <li>Region: ${cat.region}</li>
        <li>Species: ${cat.species}</li>
        <li>Size: ${cat.size}</li>
        <li>Description: ${cat.description}</li>
      </ul>
      <div class="cat-listing__availability">
        <div class="cat-listing__price">$${cat.fee}</div>
        <div class="cat-listing__availability">${cat.isAvailable}</div>
      </div>
      <div>
      <form>
        <textarea class="message"></textarea>
        <input type="email" class="users-mail">
        <button type="submit">Send message</button>
      </form>
    </section>
  </article>
  `;
}
