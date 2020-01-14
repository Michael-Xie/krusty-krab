module.exports = () => {
  const sendSMS = () => {
    const accountSID = process.env.ACCOUNT_SID
    const authToken  = process.env.AUTH_TOKEN
    const client     = require('twilio')(accountSID, authToken)
    client.messages
      .create({
        body: 'Order has been placed :)',
        from: '+17024302673',
        to: '+12267891776'
      })
      .then(message => console.log(message.sid))
  }

  const getOrderData = (order_id) =>
    db.query(`
      SELECT *
      FROM order_items
      JOIN menu_items ON menu_items.id = item_id
      WHERE order_items.id = $1
    `, [order_id])
      .then(result => console.log(result))

  return { sendSMS, getOrderData }
}

