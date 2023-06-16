const { Schema, model, models } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please fill a valid email address'],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.User.findOne({ email: value })
              return !user
            } catch {
              return false
            }
          },
          message: 'It is already exist a user with this email',
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    terms: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'customer',
    },
    city: {
      type: String,
    },
    price: {
      type: Number,
    },
    instrument: String,
    genre: String,
    imagesDone: {
      avatar: {
        type: String,
        required: false,
        default:
          'https://res.cloudinary.com/dhrs1koll/image/upload/v1667361279/SillevonPosts/blank-profile-picture-g7b6595fac_640_tbldur.png',
      },
      background: {
        type: String,
        required: false,
        default:
          'https://res.cloudinary.com/dhrs1koll/image/upload/v1667361272/SillevonPosts/background-g4cd895aa3_1280_lqqr8p.png',
      },
    },
    location: {
      lat: Number,
      lng: Number,
    },
    skills: {
      improvisation: Number,
      show: Number,
      repertoire: Number,
      versatility: Number,
      instrumentation: Number,
    },
    favoriteGenres: [{}],
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },
    contracts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Contract' }],
    },
    connections: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Connection' }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

userSchema.plugin(mongoosePaginate)
const User = model('User', userSchema)

module.exports = User
