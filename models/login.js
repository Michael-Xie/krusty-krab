module.exports = (db) => {
  const verifyLogin = (user, pass) =>
    db.query(`
      SELECT * FROM customers WHERE username = $1 AND password = $2;
    `, [user, pass])
      .then(results => results.rows[0])
  return { verifyLogin }
}
