module.exports = (db) => {
  const verifyUsername = (user) =>
    db.query(`
      SELECT * FROM customers WHERE username = ${user};
    `)
      .then(results => results.rows[0])
      .catch(err => res.send(err))

  const verifySMS = (SMS) =>
    db.query(`
      SELECT * FROM customers WHERE cell_number = ${SMS};
    `)
      .then(results => results.rows[0])
      .catch(err => res.send(err))
}
