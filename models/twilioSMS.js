module.exports = (db) => {
  const sendSMS = (result) => {
    // imports.
    const accountSID = process.env.ACCOUNT_SID
    const authToken  = process.env.AUTH_TOKEN
    const client     = require('twilio')(accountSID, authToken)
    // -------
    const orderId    = result[0].order_id
    let message = "Krust Krab Confirmation\n"
    // get the estimated order duration.
    const cookTimes = []
    result.forEach(row => cookTimes.push(row.cook_time_millisec))
    // take the max of the result and use it as the order duration.
    const orderDuration = Math.max(...cookTimes) / 1000
    message += "Order Number: #" + orderId + "\n"
    message += "Est. order time: " + orderDuration + " seconds\n"
    // calculate the order total.
    let total = 0
    result.forEach(row => total += row.quantity * row.price)
    message += "Order Total: $" + (total / 100)
  
    client.messages.create({
        body: `${message}`,
        from: '+17024302673',
        to: `${result[0].cell_number}`
      })
      .then(message => {
        setTimeout(() => {
          client.messages.create({
            body: "Order is ready for pick-up!",
            from: '+17024302673',
            to: `${result[0].cell_number}`
          }) // then update the database to close the order (status = f)
          .then(() => {
            db.query(`
              UPDATE orders SET status = 't' WHERE id = $1;
            `, [orderId])
          })
        }, orderDuration * 1000)
      })
  }

  return { sendSMS }
}

