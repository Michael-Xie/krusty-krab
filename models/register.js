module.exports = (db) => {
  const verifyUsername = (user) =>
    db.query(`
      SELECT * FROM customers WHERE username = $1;
    `, [user])
      .then(results => results.rows[0])

  const verifySMS = (SMS) =>
    db.query(`
      SELECT * FROM customers WHERE cell_number = $1;
    `, [SMS])
      .then(results => results.rows[0])
  return { verifyUsername, verifySMS }
}
