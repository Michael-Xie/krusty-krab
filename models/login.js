const bcrypt = require('bcrypt')

module.exports = (db) => {
  const verifyLogin = (user, pass) =>
    // get the user then check the password using bcrypt.
    // if password = true (match) else (no match)
    db.query(`SELECT * FROM customers WHERE username = $1`, [user])
      .then(result => {
        let password = result.rows[0].password
        password = bcrypt.compareSync(pass, password)
        // if password checks-out return the id of the user (for cookie)
        if (password)
          return result.rows[0].id
        return result
      })
  return { verifyLogin }
}
