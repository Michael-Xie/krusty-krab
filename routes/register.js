const express = require('express');
const bcrypt = require('bcrypt');

module.exports = (db) => {
  const router = express.Router();
  const register = require('../models/register')(db)

  router.get("/", (req, res) => {
    let templateVars = {};
    res.render("register", templateVars);
  });

  router.post("/", (req, res) => {
    // import register from models to place user in db.
    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password, 10)
    const sms      = req.body.cellNumber

    // call verify username from our models.
    register.verifyUsername(username)
      .then(result => {
        if (!result) {
          register.verifySMS(sms)
            .then(result => {
              if (!result) {
                // add customer to db and re-route to orders.
                register.addCustomer(username, password, sms)
                  .then(result => {
                    if (result) {
                      res.redirect("orders")
                    }
                    console.log("DB error: could not add user")
                    res.redirect("/")
                  })
              }
            })
            .catch(err => console.log(err))
        } else {
          // tell user username/sms is already taken.
          console.log("TAKEN!");
          res.status(403).send("ERROR: Username or SMS is already taken.");
        }
      })
      .catch(err => console.log(err))
    return;
  });

  return router;
};
