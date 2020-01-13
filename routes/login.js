const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const login = require('../models/login')(db)
  // GET /login - Render login page
  router.get("/", (req, res) => {
    if (req.session.customer_id) {
      res.redirect("/order/new");
      return;
    }
    let templateVars = {};
    res.render("login", templateVars);
  });

  // POST /login - Log-in into valid account
  router.post("/", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    login.verifyLogin(username, password)
      .then(customer => {
        if (!customer) {
          res.status(404).send("ERROR: Please enter valid username/password");
        } else {
          req.session.customer_id = customer
          res.redirect('/order/new');
        }
      })
      .catch(err => console.log(err))
  })
  return router;
};
