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

  let allOrders = ''
  let totalPrice = 0
  orders.forEach(function(item) {
    allOrders += `<tr><td>${item.name}</td><td>${item.qty}</td><td>₦ ${Number(item.price).toLocaleString("en-US") + '.00'}</td><td>₦ ${Number(item.qty * item.price).toLocaleString("en-US") + '.00'}</td></tr>`
  })

  orders.forEach(function(item) {
    totalPrice += item.qty * item.price
  })

  const date = new Date()
  const MM = '0'+(date.getMonth()+1)
  const DD = '0'+(date.getDate())
  const YY = date.getFullYear()
  const hrs = date.getHours()
  const mins = date.getMinutes()
  const OrderTime = hrs+':'+mins
  const OrderDate = YY+'-'+MM.substr(-2) +'-'+DD.substr(-2)



  const mailOptions = {
    from: process.env.USER,
    to: process.env.USER,
    subject: `Order From labongoes Menu Web`,
    html: `<h1>Order To The Receiptionist</h1>
           <p>Order Date: ${OrderDate}</p>
           <p>Order Time: ${OrderTime}</p>
           <p>Name: ${name}</p>
           <p>Table Number: ${tableNumber}</p>
           <p>Order Items: </p>
           <table cellspacing='30' style="border: 1px solid black; text-align: center;"> <tr style="border: 1px solid black;" ><th>Name</th><th>Qty</th><th>Amount</th><th>Total</th></tr> 
           ${allOrders}
           </table>
           <p><b>Total Orders: ₦ ${Number(totalPrice).toLocaleString("en-US") + '.00'}</b></p>`
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
