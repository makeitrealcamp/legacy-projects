const { model, Schema, models } = require('mongoose')

const Payment = new Schema(
  {
    sendMoney: {
      userId: String,
      paymentId: String,
      ammount: String
    },
    receibedMoney: {
      // correo para decirle que le pagan
      // cuenta bancaria
    }
  },{ timestamps: true });


