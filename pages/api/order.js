require('dotenv').config()
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.EMAIL_TEST_APP
  }
});

export default async function Orderhandler(req, res) {
  const {name, tableNumber, orders, total} = req.body

  const mailOptions = {
    from: process.env.USER,
    to: process.env.USER,
    subject: `Order From labongoes Menu Web`,
    html: `<h1>Order To The Receiptionist</h1>
           <p>Name: ${name}</p>
           <p>Table Number: ${tableNumber}</p>
           <p>Total: ${total}</p>
           <p>Order Items: ${orders}</p>`,
  };

  try {
    transporter.sendMail(mailOptions, function(err, info){
      if (err) {
        return res.status(500).json({error: err.message})
      }
      return res.status(200).json({message: 'Email Sent'})
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
