module.exports = {
  /*
  const sendSMS = () => {
    const accountSID = 'AC6ced67dd9caa509c53928f4398cb6ddc'
    const authToken  = '7f96ff0f19d3b90849970a68f3aac83c'
    const client     = require('twilio')(accountSID, authToken)

    client.messages
      .create({
        body: 'Order has been placed :)',
        from: '+12512559261',
        to: '+14169955011'
      })
      .then(message => console.log(message.sid))
    return;
  }
    /*
    const messagingResponse = require('twilio').twiml.MessagingResponse

    app.post('/sms', (req, res) => {
      const twiml = new MessagingResponse()
      
      twiml.message('The Robots are coming! Head for the hills')

      res.writeHead(200, {'Content-Type': 'text/xml'})
      res.end(twiml.toString())
    */
}

