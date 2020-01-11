module.exports = (db) => {
  const verifyLogin = (user, pass) => {
    db.query(`
      SELECT * FROM customers WHERE username = user AND password = pass;
    `)
      .then(results => results.rows[0])
      .catch(err => res.send(err))
  }
}
