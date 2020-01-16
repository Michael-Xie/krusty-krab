const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const login = require('../models/login')(db)
  // GET /login - Render login page
  router.get("/", (req, res) => {
    if (req.session.customer_id) {
      res.redirect("/order");
      return;
    }
    let templateVars = {customer: req.session.customer_id, username: req.session.username, errors: []};
    res.render("login", templateVars);
  });

  // POST /login - Log-in into valid account
  router.post("/", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const errorMessages = [];

    login.verifyLogin(username, password)
      .then(customer => {
        if (!customer) {
          // res.status(404).send("ERROR: Please enter valid username/password");
          errorMessages.push("Please enter a valid username or password");
          res.render("login", {customer: req.session.customer_id, username: req.session.username, errors: errorMessages});
        } else {
          req.session.customer_id = customer
          req.session.username = username
          res.redirect('/order');
        }
      })
      .catch(err => console.log(err))
  })
  return router;
};
