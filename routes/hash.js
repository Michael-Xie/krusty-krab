const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const hashPasswords = require('../models/hash_password')(db)
  
  router.get("/", (req, res) => {
    hashPasswords.hash()
      .then(results => res.redirect('/'))
  });

  return router;
};
