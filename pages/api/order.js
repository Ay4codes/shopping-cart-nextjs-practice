require('dotenv').config()
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.EMAIL_TEST_APP
  }
});

export default async function Orderhandler(req, res) {
  const {name, tableNumber, orders} = req.body

  function createOrder(orders) {
    orders.map((items) => {
      return `<p>${items.name}</p>`
    })
  }

  const mailOptions = {
    from: process.env.USER,
    to: process.env.USER,
    subject: `Order From labongoes Menu Web`,
    html: `<h1>Order To The Receiptionist</h1>
           <p>Name: ${name}</p>
           <p>Table Number: ${tableNumber}</p>
           <p>Order Items: </p>`,
  };

  try {
    await transporter.sendMail(mailOptions, function(err, info){
      if (err) {
        return res.status(500).json({error: err.message})
      }
      return res.status(200).json({message: 'Email Sent'})
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
