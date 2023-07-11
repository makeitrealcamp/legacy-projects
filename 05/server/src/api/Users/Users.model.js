const { Schema, model, models } = require('mongoose');
const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Debe ingresar un nombre.'],
      minlength: [4, 'El nombre es muy corto'],
      maxlength: [20, 'El nombre es muy largo'],
    },
    email: {
      type: String,
      required: [true, 'Debe ingresar un correo electronico.'],
      match: [emailRegex, 'Ingrese un correo electronico valido'],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.Users.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: 'Ya existe un usuario registrado con ese correo',
        },
      ],
    },
    password: {
      type: String,
      required: [true, 'Debe ingresar una contraseña.'],
      minlength: [4, 'El password es muy corto'],
      //maxlength: [20, 'El password es muy largo'],
    },
    rol: {
      type: String,
      required: true,
      enum: {
        values: ['admin', 'host', 'client'],
        message: 'Invalid rol',
      },
    },
    location: {
      type: String,
      required: false,
    },
    reservations: {
      type: [{type:Schema.Types.ObjectId,ref:'Reservations'}],
      required: false,
    },
    profileimg: {
      type: String,
      required: false,
    },
    homes: {
      type: [{type:Schema.Types.ObjectId,ref:'Homes'}],
      required: false,
    },
    comments:{
      type:[{type:Schema.Types.ObjectId,ref:'Comments'}],
      required: false,
    }
  },
  {
    timestamps: true,
  },
);
const Users = model('Users', UsersSchema);

module.exports = Users;
