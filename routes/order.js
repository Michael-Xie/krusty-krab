const express = require('express');

module.exports = (db) => {
  const router  = express.Router();
  const order   = require('../models/order')(db)
  const sendSMS = require('../models/twilioSMS')(db)

  router.get("/", (req, res) => {
    // if the customer is not logged in, redirect to login.
    if (!req.session.customer_id) {
      res.redirect('login')
      return;
    }

    order.getMenuItems()
      .then(result => {
        console.log("from query:", result);
        let categoryInfo = {};
        let newObj = {};
        for (let obj of result) {
          if(!categoryInfo[obj.category_id]) {
            categoryInfo[obj.category_id] = obj.category_name;
          }
          let formattedObj = {id: obj.id, name: obj.name, cook_time_millisec: obj.cook_time_millisec, description: obj.description, image_url: obj.image_url, price: obj.price};

          if (newObj[obj.category_id]) {
            newObj[obj.category_id].push(formattedObj)
          } else {
            newObj[obj.category_id] = [formattedObj]
          }
        }
        console.log(newObj);
        console.log(categoryInfo);
        res.render('order', {menuItems: newObj, categoryInfo: categoryInfo});
        // example of getting values
        // for (item of result) {
        //   console.log(item.category_name);
        // }
      });
  });

  router.post("/place_order", (req, res) => {
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
          console.log(item_length)
          for (let i = 0; i < item_length; i++) {
            order.getMenuIds(req.body.item[i])
              .then(resTwo => {
                // adding to order items.
                if (resTwo) {
                  order.postOrderItems(resOne.id, resTwo.id, req.body.quantity[i])
                    .then(resThree => {
                      order.getOrderData(resOne.id)
                        .then(result => {
                          if ((result.length === item_length || item_length === 1) && !isChecked) {
                            isChecked = true;
                            sendSMS.sendSMS(result)
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

