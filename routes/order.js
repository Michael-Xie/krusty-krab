const express = require('express');

module.exports = (db) => {
  const router  = express.Router();
  const order   = require('../models/order')(db)
  const sendSMS = require('../models/twilioSMS')()

  router.get("/", (req, res) => {
    // if the customer is not logged in, redirect to login.
    if (!req.session.customer_id) {
      res.redirect('login')
      return;
    }

    order.getMenuItems()
      .then(result => {
        res.render('order', {menuItems: result});
      });
  });

  router.post("/place_order", (req, res) => {
    // create a new order.
    const customer_id = req.session.customer_id
    order.createOrder(customer_id)
      .then(resOne => {
        if (resOne) {
          // get menu_item id for each item then add it to the order_items.
          for (let i = 0; i < req.body.item.length; i++) {
            order.getMenuIds(req.body.item[i])
              .then(resTwo => {
                // adding to order items.
                if (resTwo) {
                  order.postOrderItems(resOne.id, resTwo.id, req.body.quantity[i])
                    .then(resThree => console.log('success'))
                    .catch(err => console.log(err))
                }
              })
              .catch(err => console.log(err))
          }
        }
      })
        .catch(err => console.log(err))
    })
    //req.body.item.forEach(items => console.log(item))
    // generate and order
    //sendSMS.sendSMS()

  return router;
};

