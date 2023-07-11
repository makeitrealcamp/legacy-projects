const { Schema, model, models } = require("mongoose");
const priceRegex = new RegExp(
  "^(0*[1-9][0-9]*([,.][0-9]+)?|0+.[0-9]*[1-9][0-9]*)$"
);

const homeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    location: {
      coordinates: {
        type: Object,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: [true, "Debe ingresar un precio."],
      match: [priceRegex, "Ingrese un precio valido superior a 0.00"],
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
      required: false,
    },
    images: {
      type: Array,
      required: [true, "Debe ingresar las imagenes del inmueble."],
    },
    amenities: {
      type: Array,
      required: [true, "Debe ingresar las comodidades del inmueble."],
    },
    capacity: {
      type: Number,
      required: [true, "Debe ingresar la capacidad total del inmueble."],
    },
    totalreviews: {
      type: Number,
      default: 0,
      required: false,
    },
    totalScore: {
      type: Number,
      default: 0,
      required: false,
    },
    scorearrays: {
      cleanlinessarray: {
        type: Array,
        required: false,
      },
      accuracyarray: {
        type: Array,
        required: false,
      },
      communicationarray: {
        type: Array,
        required: false,
      },
      locationarray: {
        type: Array,
        required: false,
      },
      checkinarray: {
        type: Array,
        required: false,
      },
      valuearray: {
        type: Array,
        required: false,
      },
    },
    scorecleanliness: {
      type: Number,
      default: 0,
      required: false,
    },
    scoreaccuracy: {
      type: Number,
      default: 0,
      required: false,
    },
    scorecommunication: {
      type: Number,
      default: 0,
      required: false,
    },
    scorelocation: {
      type: Number,
      default: 0,
      required: false,
    },
    scorecheckin: {
      type: Number,
      default: 0,
      required: false,
    },
    scorevalue: {
      type: Number,
      default: 0,
      required: true,
    },
    dates: {
      type: String,
      required: [
        false,
        "Debe ingresar las fechas de disponibilidad del inmueble.",
      ],
    },
    rooms: {
      type: Number,
      required: [true, "Debe ingresar el numero de habitaciones del inmueble."],
    },
    reservations: {
      type: [{ type: Schema.Types.ObjectId, ref: "Reservations" }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Homes = model("Homes", homeSchema);

module.exports = Homes;
