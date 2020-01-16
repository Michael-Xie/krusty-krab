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
    res.render('register', { customer: req.session.customer_id, username: req.session.username, errors: [] })
  });

  // POST /register - Register new user

  router.post("/", (req, res) => {
    // import register from models to place user in db.
    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password, 10)
    const sms = req.body.cellNumber

    const errorMessages = [];

    if (username.trim().length === 0) {
      errorMessages.push("Please enter a username");
    }
    if (req.body.password.trim().length === 0) {
      errorMessages.push("Please enter a password");
    }

    // call verify username from our models.
    register.verifyUsername(username)
      .then(result => {
        if (!result) {
          // verify the SMS input is good.
          register.verifySMS(formatPhoneNumber(sms))
            .then(result => {
              if (result) {
                // add customer to db and re-route to orders.
                register.addCustomer(username, password, formatPhoneNumber(sms))
                  .then(result => {
                    if (result && errorMessages.length === 0) {
                      req.session.customer_id = result.id
                      req.session.username = username;
                      res.redirect("/order")
                      return;
                    }
                    res.redirect('/')
                  })
                  .catch(err => res.send(err))
              } else {
                errorMessages.push("Phone number invalid or taken. Use format XXX-XXX-XXXX, where X is a number");
                console.log(errorMessages);
                res.render("register", {customer: req.session.customer_id, username: req.session.username, errors: errorMessages});
                // res.status(403).send("ERROR: SMS taken or bad input")
              }
            })
            .catch(err => res.send(err))
        } else {
          // tell user username/sms is already taken.
          // $('.error-message').text("Username already taken. Try Again.");
          errorMessages.push(`${username} already taken. Try again.`)
          res.render("register", {customer: req.session.customer_id, username: req.session.username, errors: errorMessages});
          console.log(errorMessages);
          // res.status(403).send("ERROR: username already taken");
        }
      })
      .catch(err => res.send(err))
    // res.render("register", {customer: req.session.customer_id, username: req.session.username, errors: errorMessages});

  })

  return router;
};
