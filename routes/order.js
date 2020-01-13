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
        // console.log(result)
        let categoryInfo = {};
        let newObj = {};
        for (let obj of result) {
          console.log("from loop:", obj);
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
        //res.render('order', {menuItems: newObj, categoryInfo: categoryInfo});
        // example of getting values
        // for (item of result) {
        //   console.log(item.category_name);
        // }
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

