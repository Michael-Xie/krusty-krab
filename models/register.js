module.exports = (db) => {
  const verifyUsername = (user) =>
    db.query(`
      SELECT * FROM customers WHERE username = $1;
    `, [user])
      .then(results => results.rows[0])

  const verifySMS = (sms) =>
    db.query(`
      SELECT cell_number FROM customers WHERE cell_number = $1;
    `, [sms])
      .then(results => {
        // if there are results -- the cell_number is taken.
        if (results.rows[0])
          return false
        /* two checks on our given SMS number
         * 1. ensure that it is a number beyond the first index
         * 2. ensure that the first index is '+'
         * 3. ensure that the length of the string is 12
         */
        const sliceNum = parseInt(sms.slice(1), 10)
        if (!Number.isInteger(sliceNum) ||
            sms[0] !== '+') 
          return false
        if (sms.length !== 12) 
          return false
        return true
      })
      .catch(err => console.log(err))
  
  const addCustomer = (user, pass, sms) => 
    db.query(`
      INSERT INTO customers (username, password, cell_number)
      VALUES ($1, $2, $3) RETURNING *;
    `, [user, pass, sms])
      .then(results => results.rows[0])
      .catch(err => console.log(err))


  return { verifyUsername, verifySMS, addCustomer }

}
