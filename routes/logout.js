const express = require('express');
// const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.customer_id) {
      req.session = null
      res.redirect("/")
      return
    }
    /*
    let templateVars = {}
    res.render("login", templateVars)
    /*
     * talk to julie about how to handle this.
    */
    res.redirect("/")
  });

  return router;
};
