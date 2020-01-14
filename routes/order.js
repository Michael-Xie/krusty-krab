const express = require('express');

module.exports = (db) => {
  const router  = express.Router();
  const order   = require('../models/order')(db)
  const sendSMS = require('../models/twilioSMS')

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
        res.render('order', {menuItems: newObj, categoryInfo: categoryInfo});
        // example of getting values
        // for (item of result) {
        //   console.log(item.category_name);
        // }
      });
  });

  router.post("/place_order", (req, res) => {
    console.log(req.body)
    res.redirect("/order")
  })

  return router;
};
