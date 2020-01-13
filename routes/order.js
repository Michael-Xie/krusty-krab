const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const order = require('../models/order')(db)

  router.get("/", (req, res) => {
    // if the customer is not logged in, redirect to login.
    if (!req.session.customer_id) {
      res.redirect('login')
      return;
    }
    order.getMenuItems()
      .then(result => {
        console.log(result)
        res.render('order', {menuItems: result});
        // example of getting values
        // for (item of result) {
        //   console.log(item.category_name);
        // }
      });
  });

  return router;
};
