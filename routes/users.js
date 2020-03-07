/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (databaseHelperFunctions) => {
  // All cats are displayed when the user arrives on main page
  router.get("/", (req, res) => {
    console.log('IT WORKS');
    databaseHelperFunctions.getAllCats()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only favourite cats are displayed when the 'show favourites' button is clicked
  router.get("/favourites", (req, res) => {
    console.log('IT WORKS');
    databaseHelperFunctions.getFavourites()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });


  return router;
};
