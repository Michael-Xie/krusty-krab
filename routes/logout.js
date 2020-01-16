const express = require('express');
// const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.customer_id) {
      req.session = null
      res.redirect("/login")
      return
    }
    res.redirect("/login")
  });

  return router;
};
