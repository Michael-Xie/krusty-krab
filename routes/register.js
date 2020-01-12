const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

module.exports = (db) => {
  const register = require('../models/register')(db)
  
  // GET /login - Render login page
  router.get("/", (req, res) => {
    let templateVars = {};
    res.render("register", templateVars);
  });

  // POST /login - Log-in into valid account
  router.post("/", (req, res) => {
    console.log('Posted Registration Information');
    const username = req.body.username
    const sms      = req.body.cellNumber
    register.verifyUsername(username)
      .then(result => { 
        console.log(result)
      })
      .catch(err => console.log(err))
    register.verifySMS(sms)
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
    return;
  });

  return router;
};
