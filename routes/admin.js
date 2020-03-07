/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

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

  // Only filtered cats are displayed
  router.get('/filteredCats', (req, res) => {
    databaseHelperFunctions.filterBySearch(req.query)
    .then(cats => res.send({cats}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  // Only renders Admin's own cats

  router.get('/mycats', (req, res) => {
    databaseHelperFunctions.getMyCats(req.query)
    .then(cats => res.send({cats}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });



  return router;
};
