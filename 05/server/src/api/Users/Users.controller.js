const { create } = require('./Users.model');
const User = require('./Users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter, welcome } = require('../Utils/mailer');
const Reservations = require('../Reservations/reservation.model');

module.exports = {
  //get all

  async singup(req, res, next) {
    try {
      const data = req.body;

      //brcypt recibe (password,Salto)
      const encPassword = await bcrypt.hash(data.password, 8);

      const newUser = {
        ...data,
        password: encPassword,
      };

      const user = await User.create(newUser);

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      console.log(
        ` user: ${process.env.MAIL_USER}, pass: ${process.env.MAIL_PASSWORD}`,
      );
      await transporter.sendMail(welcome(newUser));

      res
        .status(200)
        .json({ message: 'User created', data: { email: data.email, token } });
    } catch (err) {
      next(err);
    }
  },

  async singin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error('Not valid credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      const rol = user.rol;
      const profileimg = user.profileimg;
      res.status(200).json({
        message: 'Valid User',
        data: { email, token, rol, profileimg },
      });
    } catch (err) {
      res.status(400).json({ message: 'Unvalid Data', data: err });
    }
  },

  async show(req, res) {
    try {
      const userId = req.userId;
      const user = await User.findById(userId)
        .select('-_id name ')
        .populate({
          path: 'reservations',
          select: '-user -createdAt -updatedAt',
          populate: {
            path: 'home',
            select: '_id userId location  ',
            populate: {
              path: 'userId',
              select: '-_id profileimg name ',
            },
          },
        });
      //populates
      res.status(201).json({ message: 'user found', data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  /*
  async list(req, res) {
    try {
      const user = await User.find();
      res.status(201).json({ message: 'user found', data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //getID
  async show(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      //populates
      res.status(201).json({ message: 'user found', data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // post

  async create(req, res) {
    try {
      const data = req.body;

      const user = await User.create(data);

      res.status(201).json({ message: 'User Created', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User could not be created', data: err });
    }
  },
    */
  async update(req, res) {
    try {
      const data = req.body;
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      res.status(200).json({ message: 'User Updated', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User could not be Updated', data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: 'Home Deleted', data: user });
    } catch (error) {
      res.status(400).json({ Message: 'Home could not be Deleted', data: err });
    }
  },
};
