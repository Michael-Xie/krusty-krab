module.exports = (db) => {
  const verifyUsername = (user) =>
    db.query(`
      SELECT * FROM customers WHERE username = $1;
    `, [user])
      .then(results => results.rows[0]);

  const verifySMS = (SMS) =>
    db.query(`
      SELECT * FROM customers WHERE cell_number = $1;
    `, [SMS])
      .then(results => results.rows[0]);

  const registerUser = (user, password, cell_number) =>
    db.query(`
    INSERT INTO customers (username, password, cell_number) VALUES ($1, $2, $3) RETURNING *;
    `, [user, password, cell_number])
      .then(result => result.rows[0]);

  return { verifyUsername, verifySMS, registerUser };
}
