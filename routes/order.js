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
        let categoryInfo = {};
        let newObj = {};
        for (let obj of result) {
          if(!categoryInfo[obj.category_id]) {
            categoryInfo[obj.category_id] = obj.category_name;
          }
          let formattedObj = {
            id: obj.id,
            name: obj.name,
            cook_time_millisec: obj.cook_time_millisec,
            description: obj.description,
            image_url: obj.image_url,
            price: obj.price
          };

          if (newObj[obj.category_id]) {
            newObj[obj.category_id].push(formattedObj)
          } else {
            newObj[obj.category_id] = [formattedObj]
          }
        }
        res.render('order', {
          menuItems: newObj, 
          categoryInfo: categoryInfo, 
          customer: req.session.customer_id, 
          username: req.session.username
        });
      });
  });
  return router;
};

