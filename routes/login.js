const express = require('express');
// const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (db) => {

  const login = require('../models/login')(db)
  // GET /login - Render login page
  router.get("/", (req, res) => {
    if (req.session.customer_id) {
      res.redirect("/orders/new");
      return;
    }

    let templateVars = {};
    res.render("login", templateVars);
  });

  // POST /login - Log-in into valid account
  router.post("/", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    login.verifyLogin(username, password)
      .then(customer => {
        console.log(customer);
        if (!customer) {
          res.status(404).send("ERROR: Please enter valid username/password");
        } else {
          console.log('Posted Login Information');
          req.session.customer_id = customer.id
          res.redirect('/orders/new');
        }
      })
      .catch(err => console.log(err))
    return;
  });
  return router;
};
