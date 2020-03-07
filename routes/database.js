
module.exports = (db) => {

  const getAllCats = function () {
    return db.query(`SELECT * FROM cats;`)
    .then(res => res.rows)
    // .catch(err => console.error('query error', err.stack));
  }

  const getAllUsers = function () {
    return db.query(`SELECT * FROM users;`)
    .then(res => res.rows[0] )
    // .catch(err => console.error('query error', err.stack));
  }

  const getFavourites = function () {
    return db.query(`
    SELECT * FROM cats
    JOIN favourites ON cats.id = cat_id
    WHERE owner_id = 2;`)
    .then(res => res.rows )
  }

  const filterBySearch = function(options) {
    const queryParams = [];
    const whereClauses = [];
    let queryString = `
    SELECT *
    FROM cats
    `;

  if (options.minimum_fee && options.maximum_fee) {
    queryParams.push(`${options.minimum_fee}`);
    queryParams.push(`${options.options.maximum_fee}`);
    whereClauses.push(`fee >= $${queryParams.length - 1} AND fee <= $${queryParams.length} `);
  }
  if (options.region) {
    queryParams.push(`%${options.region}%`);
    whereClauses.push(`region = $${queryParams.length} `);
  }

  if (options.size) {
    queryParams.push(options.size);
    whereClauses.push(`size = $${queryParams.length} `);
  }

  if (options.species) {
    queryParams.push(`${options.species}`);
    whereClauses.push(`species >= $${queryParams.length}`);
  }

  if (whereClauses.length) {
    queryString += `WHERE ${whereClauses.join(' AND ')}`;
  }

    queryString += `
    ORDER BY fee
    LIMIT 10;
    `;

    // 6
    return db.query(queryString, queryParams)
    .then(res => res.rows);
  }

  return {getAllCats, getAllUsers, getFavourites, filterBySearch};
};
