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

    // [TODO] sanitize input 
    const username = req.body.username
    const sms      = req.body.cellNumber

    // call verify username from our models.
    register.verifyUsername(username)
      .then(result => {
        if (!result) {
          register.verifySMS(sms)
            .then(result => {
              if (!result) {
                // handle re-routing to orders.
                console.log(result)
              }
            })
            .catch(err => console.log(err))
        } else {
          // tell user username/sms is already taken.
          console.log("TAKEN!")
        }
      })
      .catch(err => console.log(err))
    return;
  });

  return router;
};
