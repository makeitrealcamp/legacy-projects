const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const verify = async (transporter) => {
  const connection = await transporter.verify()
  if (connection) {
    console.log('Server is ready to take our messages')
  }
}

const welcome = (user) => {
  return {
    from: `"${process.env.SMTP_USERNAME}"<${process.env.SMTP_USER}`,
    to: user.email,
    subject: 'Welcome to Sillevon',
    html: `
    <body styles={{display: 'flex', justify-content: 'center', align-items: 'center'}}>
      <h1>Welcome to sillevon ${user.name}</h1>
      <p>
        Enjoy the journey and choose the artist/band of your choice!
      </p>
    </body>
  `,
    text: `Welcome ${user.name}`,
  }
}

const contractAlert = (client, artist) => {
  return {
    from: `"${process.env.SMTP_USERNAME}"<${process.env.SMTP_USER}`,
    to: artist.email,
    subject: 'Contract notification',
    html: `
    <body styles={{display: 'flex', justify-content: 'center', align-items: 'center'}}>
      <h1>Hello, ${artist.name},</h1>
      <p>
        The client ${client.name} wants to use your services, go to <a href="https://sillevon.vercel.app">Sillevon</a> to answer.
      </p>
    </body>
  `,
    text: `Go to your profile, you have notifications ${artist.name}`,
  }
}
const contractConfirmation = (client, artist) => {
  return {
    from: `"${process.env.SMTP_USERNAME}"<${process.env.SMTP_USER}`,
    to: artist.email,
    subject: 'Contract notification',
    html: `
    <body styles={{display: 'flex', justify-content: 'center', align-items: 'center'}}>
      <h1>Hello, ${artist.name},</h1>
      <p>
        The client ${client.name} already pay the contract, go to <a href="https://sillevon.vercel.app">Sillevon</a> to chat and talk about details.
      </p>
    </body>
  `,
    text: `Go to your profile, you have notifications ${artist.name}`,
  }
}

const connectionRequest = (artist, client) => {
  return {
    from: `"${process.env.SMTP_USERNAME}"<${process.env.SMTP_USER}`,
    to: artist.email,
    subject: 'Connection notification',
    html: `
    <body styles={{display: 'flex', justify-content: 'center', align-items: 'center'}}>
      <h1>Hello, ${artist.name},</h1>
      <p>
        The client ${client.name} wants to connect with you, go to <a href="https://sillevon.vercel.app">Sillevon</a> to answer.
      </p>
    </body>
  `,
    text: `Go to your profile, you have notifications, ${artist.name}`,
  }
}

const connectionConfirmation = (artist, client) => {
  return {
    from: `"${process.env.SMTP_USERNAME}"<${process.env.SMTP_USER}`,
    to: client.email,
    subject: 'Connection notification',
    html: `
    <body styles={{display: 'flex', justify-content: 'center', align-items: 'center'}}>
      <h1>Hello, ${client.name},</h1>
      <p>
        The artist ${artist.name} accepted your connect request, go to <a href="https://sillevon.vercel.app">Sillevon</a> to chat about bussiness.
      </p>
    </body>
  `,
    text: `Go to your profile, you have notifications ${client.name}`,
  }
}

module.exports = {
  transporter,
  verify,
  welcome,
  contractAlert,
  connectionConfirmation,
  contractConfirmation,
  connectionRequest,
}
