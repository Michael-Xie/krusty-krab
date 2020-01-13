const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    // if the customer is not logged in, redirect to login.
    if (!req.session.customer_id) {
      res.redirect('login')
      return;
    }
    res.render('order')
  });
  
  return router;
};
