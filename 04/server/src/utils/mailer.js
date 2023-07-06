const nodemailer = require('nodemailer')

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

exports.verify = async (transporter) => {
  try {
    const connection = await transporter.verify()
    if (connection) {
      console.log("✅ Server is ready to take our mail messages")
    }

  } catch (error) {
    console.log(`❌ something wrong in mail connection ${error}`)
  }
}

exports.welcome = (user) => {
  return {
    from: `<${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "Welcome to Udemy",
    html: `
      <div>
        <h1> Welcome ${user.fullName}</h1>
      </div>
    `,
    text: `Welcome ${user.fullName}`
  }
}
