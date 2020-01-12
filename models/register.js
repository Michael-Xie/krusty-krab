module.exports = (db) => {
  const verifyUsername = (user) =>
    db.query(`
      SELECT * FROM customers WHERE username = $1;
    `, [user])
      .then(results => results.rows[0])

  const verifySMS = (sms) =>
    db.query(`
      SELECT * FROM customers WHERE cell_number = $1;
    `, [sms])
      .then(results => results.rows[0])
  
  const addCustomer = (user, pass, sms) => 
    db.query(`
      INSERT INTO customers (username, password, cell_number)
      VALUES ($1, $2, $3) RETURNING *;
    `, [user, pass, sms])
      .then(results => results.rows[0])

  return { verifyUsername, verifySMS, addCustomer }

}
