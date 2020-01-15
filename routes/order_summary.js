const express = require('express');

module.exports = (db) => {
  const router  = express.Router();
  const order   = require('../models/order')(db)
  const sendSMS = require('../models/twilioSMS')(db)

  router.post("/", (req, res) => {
    // create a new order.
    let isChecked = false;
    const customer_id = req.session.customer_id
    // go through the process of creating an order and filling it with items.
    order.createOrder(customer_id)
      .then(resOne => {
        if (resOne) {
          // get menu_item id for each item then add it to the order_items.
          let item_length = req.body.item.length
          if (!Array.isArray(req.body.item))
            item_length = 1 
          // iterate through each item in the order_items.
          for (let i = 0; i < item_length; i++) {
            // do a check to see how many items we need to pass through
            let menu_ids = req.body.item[i]
            if (!Array.isArray(req.body.item))
              menu_ids = req.body.item
            // since all we have is the menu names, we need to get the ids.
            order.getMenuIds(menu_ids)
              .then(resTwo => {
                // adding to order items.
                if (resTwo) {
                  order.postOrderItems(resOne.id, resTwo.id, req.body.quantity[i])
                    .then(resThree => {
                      order.getOrderData(resOne.id)
                        .then(result => {
                          if ((result.length === item_length || item_length === 1) && !isChecked) {
                            // send the SMS
                            sendSMS.sendSMS(result)
                            res.render("order_summary", { result, customer: customer_id, username: req.session.username })
                            // will disable any further SMS messages.
                            isChecked = true;
                            return Promise.reject("stopping further SMS requests...")
                          }
                      })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                    // retrieve the order data then send out the sms.
                }
              })
              .catch(err => console.log(err))
          }
        }
      })
      .catch(err => console.log(err))
    })

  return router;
};

