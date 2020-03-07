
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

  return {getAllCats, getAllUsers};
};
