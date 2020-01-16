const express = require('express');
const bcrypt = require('bcrypt');

const formatPhoneNumber = (sms) => {
  const regex = /^[\+]?([0-9]{1})?[-]?[(]?([0-9]{3})[)]?[-\s\.]?([0-9]{3})[-\s\.]?([0-9]{4,6})$/im;
  const maxLength = 2 + 3 + 7;
  const result = sms.match(regex);

  if (sms.length <= maxLength && result) {
    console.log(result);
    const countryCode = result[1];
    const areaCode = result[2];
    const phoneNumber = result[3] + result[4];
    let phoneArr = ['+'];
    if (areaCode && phoneNumber) {
      if (!countryCode) {
        phoneArr.push('1');
      } else {
        phoneArr.push(countryCode);
      }
      phoneArr.push(areaCode);
      phoneArr.push(phoneNumber);
      return phoneArr.join('');
    }
    return '';
  }
  return '';
}

module.exports = (db) => {
  const router = express.Router();
  const register = require('../models/register')(db)

  router.get("/", (req, res) => {
    // ensure that the user is not logged in.
    if (req.session.customer_id) {
      res.redirect('/')
      return;
    }
    res.render('register', {customer: req.session.customer_id, username: req.session.username, error: ""})
  });

 // POST /register - Register new user

  router.post("/", (req, res) => {
    // import register from models to place user in db.
    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password, 10)
    const sms      = req.body.cellNumber

    // call verify username from our models.
    register.verifyUsername(username)
      .then(result => {
        if (!result) {
          // verify the SMS input is good.
          register.verifySMS(formatPhoneNumber(sms))
            .then(result => {
              if (result) {
                // add customer to db and re-route to orders.
                register.addCustomer(username, password, sms)
                  .then(result => {
                    if (result) {
                      req.session.customer_id = result.id
                      res.redirect("/order")
                      return;
                    }
                    res.redirect('/')
                  })
                  .catch(err => res.send(err))
              } else {
                res.render("register", {customer: req.session.customer_id, username: req.session.username, error: "Phone number invalid or taken. Use format XXX-XXX-XXXX, where X is a number"});
                // res.status(403).send("ERROR: SMS taken or bad input")
              }
            })
            .catch(err => res.send(err))
        } else {
          // tell user username/sms is already taken.
          // $('.error-message').text("Username already taken. Try Again.");
          res.render("register", {customer: req.session.customer_id, username: req.session.username, error: `${username} already taken. Try again.`});
          // res.status(403).send("ERROR: username already taken");
        }
      })
      .catch(err => res.send(err))
  })

  return router;
};
