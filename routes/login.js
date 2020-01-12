const express = require('express');
// const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (db) => {

  const login = require('../models/login')(db)
  // GET /login - Render login page
  router.get("/", (req, res) => {
    let templateVars = {};
    res.render("login", templateVars);
  });

  // POST /login - Log-in into valid account
  router.post("/", (req, res) => {
    console.log('Posted Login Information');
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    login.verifyLogin(username, password)
      .then(result => console.log(result))
      .catch(err => console.log(err))
    return;
  });
  return router;
};
