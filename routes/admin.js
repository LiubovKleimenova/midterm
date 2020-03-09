/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
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
    databaseHelperFunctions.getFavouritesAdmin()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only filtered cats are displayed
  router.get('/filteredCats', (req, res) => {
    databaseHelperFunctions.filterBySearch(req.query)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only renders Admin's own cats

  router.get('/mycats', (req, res) => {
    databaseHelperFunctions.getMyCats(req.query)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // route to handle email posts
  router.post('/send', (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const { to, subject, text } = req.body;
    databaseHelperFunctions.sendEmail(to, subject, text);
  });

  return router;
};

 // Only renders Admin's message history, in this case it is hard coded to search the database for messages pertaining to cat_id= 3, and admin is defined as sender/reciever ID 1

router.get('/myMessages', (req, res) => {
  databaseHelperFunctions.getMessages(req.query)
  .then(data => res.json(data))
  .catch(err => res.status(500).send(err))
});


