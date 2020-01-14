module.exports = () => {
  const sendSMS = () => {
    const accountSID = process.env.ACCOUNT_SID
    const authToken  = process.env.AUTH_TOKEN
    const client     = require('twilio')(accountSID, authToken)
    console.log("here")
    client.messages
      .create({
        body: 'Order has been placed :)',
        from: '+17014011189',
        to: '+14169318503'
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

