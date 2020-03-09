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
    databaseHelperFunctions.getFavouritesUser()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only filtered cats are displayed
  router.get('/filteredCats', (req, res) => {
    databaseHelperFunctions.filterBySearch(req.query)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Allows users to login and Logout

  router.post('/login', (req, res) => {
    const {userId} = req.body;
    databaseHelperFunctions.login(userId)
      .then(user => {
        console.log(user[0].id)
        req.session.userId = user[0].id;
        res.json(user)
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  // Allows user to post messages

  // If we want to show the result of a user posting a msg (by viewing the msg on the admin side), the msg that the user sends must be sent pertaining to cat_id= 3, and reciever ID must be one 1. This is because the getMessages function is hard coded for this particular admin and cat ID.
  router.post('/sendMessage', (req, res) => {
    databaseHelperFunctions.createMsgPost(req.body)
  });


  //

  return router;
};
