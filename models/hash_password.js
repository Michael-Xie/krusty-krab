const bcrypt = require('bcrypt')

module.exports = (db) => {
  const hash = () =>
    db.query(`SELECT username, password FROM customers;`)
      .then(results => {
        results.rows.forEach(row => {
          const password = bcrypt.hashSync(row.password, 10)
          db.query(`
            UPDATE customers 
            SET password = $1 
            WHERE username = $2;`,
            [password, row.username])
        })
      })
  return { hash }
}
