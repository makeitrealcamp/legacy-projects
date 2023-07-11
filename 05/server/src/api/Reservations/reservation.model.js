const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
  {
    initialDdate: {
      type: Number,
      required: true,
    },
    finalDate: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    guests: {
      type: {
        adults: {
          type: Number,
          required: true,
        },
        childs: {
          type: Number,
          required: false,
        },
        babys: {
          type: Number,
          required: false,
        },
        prependListener: {
          type: Number,
          required: false,
        },
      },
      required: true,
    },
    home: {
      type: Schema.Types.ObjectId,
      ref: "Homes",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservations = model("Reservations", reservationSchema);

module.exports = Reservations;
