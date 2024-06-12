const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a transporter object using SMTP transport 
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'adkadk99990@gmail.com', // Your email address
    pass: 'uzpgccooyghzhksf' // Your email password
  }
});

// Route to send email
router.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'adkadk99990@gmail.com', // Sender email address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: body // Plain text body
    });

    console.log('Email sent: ', info);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;

// var nodemailer = require('nodemailer');
// const express = require('express');
// const router = express.Router();


// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'noormohommaduakeel@gmail.com',
//     pass: 'uqoyxneeybaqopje'
//   }
// });

// var mailOptions = {
//   from: 'noormohommaduakeel@gmail.com',
//   to: 'adkadk99990@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });













// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Create a transporter object using SMTP transport 
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'noormohommaduakeel@gmail.com', // Your email address
//     pass: 'uqoyxneeybaqopje' // Your email password
//   }
// });

// // Route to send email
// router.post('/send-email', async (req, res) => {
//   const { to, subject, body } = req.body;

//   try {
//     // Send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: 'noormohommaduakeel@gmail.com', // Sender email address
//       to: 'adkadk99990@gmail.com', // List of recipients
//       subject: subject, // Subject line
//       text: body // Plain text body
//     });

//     console.log('Email sent: ', info);
//     res.status(200).json({ message: 'Email sent successfully.' });
//   } catch (error) {
//     console.error('Error sending email: ', error);
//     res.status(500).json({ error: 'Failed to send email.' });
//   }
// });

// module.exports = router;
