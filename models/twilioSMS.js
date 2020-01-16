module.exports = (db) => {
  const sendSMS = (result) => {
    const accountSID = process.env.ACCOUNT_SID
    const authToken  = process.env.AUTH_TOKEN
    const client     = require('twilio')(accountSID, authToken)
    let message    = "Krust Krab Confirmation\n"
    const getEstTime = () => {
      const cookTimes = []
      result.forEach(row => {
        cookTimes.push(row.cook_time_millisec)
      })
      message += "Order Number: #" + result[0].order_id + "\n"
      message += "Est. order time: " + (Math.max(...cookTimes) / 1000) + " seconds"
    }

    getEstTime()
  
    client.messages
      .create({
        body: `${message}`,
        from: '+17024302673',
        to: `${result[0].cell_number}`
      })
      .then(message => console.log(message.sid))
  }
    /*
    const messagingResponse = require('twilio').twiml.MessagingResponse

    app.post('/sms', (req, res) => {
      const twiml = new MessagingResponse()
      twiml.message('The Robots are coming! Head for the hills')

      res.writeHead(200, {'Content-Type': 'text/xml'})
      res.end(twiml.toString())
    */

  return { sendSMS }
}

