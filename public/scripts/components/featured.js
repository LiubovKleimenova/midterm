window.Meowza.createFeatured = cat => {
  if (cat.is_featured) {
    // console.log('returning a cat!');
    return $(`
      <div class="carousel-cell">
        <img src="${cat.main_photo_url}" alt=${cat.name}>
      </div>
    `)
  }
};
