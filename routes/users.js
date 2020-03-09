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
    userid =  req.session.userId
    databaseHelperFunctions.getFavourites(userid)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only filtered cats are displayed
  router.get('/filteredCats', (req, res) => {
    console.log(req.query);
    databaseHelperFunctions.filterBySearch(req.query)
    .then(cats => res.send({cats}))
    .catch(err => res.status(500).send(err))
  });


  // Allows user to post messages

  router.post('/sendMessage', (req, res) => {
    databaseHelperFunctions.createMsgPost(req.body)
  });
 // Displays the user's messages

 router.get('/myMessages', (req, res) => {
  userid =  req.session.userId
  databaseHelperFunctions.getMessages(userid)
  .then(data => res.json(data))
  .catch(err => res.status(500).send(err))
});

// Allows users to login and Logout

router.post('/login', (req, res) => {
  const {userId} = req.body;
  databaseHelperFunctions.login(userId)
  .then(user => {console.log(user[0].id)
  req.session.userId = user[0].id;
  res.json(user[0])
  })
  .catch(e => res.send(e));
});

router.get('/logout', (req, res) => {
  req.session.userId = null;
  res.send({});
});

  return router;
};
