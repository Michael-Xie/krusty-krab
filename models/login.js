const bcrypt = require('bcrypt')

module.exports = (db) => {
  const verifyLogin = (user, pass) =>
    // get the user then check the password using bcrypt.
    // if password = true (match) else (no match)
    db.query(`SELECT * FROM customers WHERE username = $1`, [user])
      .then(result => {
        let password = result.rows[0].password
        console.log(password, pass)
        password = bcrypt.compareSync(pass, password)
        console.log(password)
        return password
      })
  return { verifyLogin }
}
