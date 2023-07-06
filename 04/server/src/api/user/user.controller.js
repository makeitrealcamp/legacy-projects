const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter, welcome } = require("../../utils/mailer");

module.exports = {
  async signup(req, res) {
    try {

      const encriptedPassord = await bcrypt.hash(req.body.password, 11);
      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: encriptedPassord,
      });
      await transporter.sendMail(welcome(user));
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY_JWT,
        { expiresIn: 60 * 60 * 24 } //one day
      );
      const { studentCourses, teacherCourses, isInstructor, fullName, avatar ,email} =
        user;
      res
        .status(201)
        .json({
          message: "✅user created",
          data: {
            email,
            studentCourses,
            teacherCourses,
            isInstructor,
            fullName,
            avatar,
            token,
          },
        });
    } catch (error) {
      res.status(400).json({ message: `❌user could NOT be created ${error}` });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate({
        path: "teacherCourses",
        select: "title _id ",
      });

      if (!user) {
        throw new Error(`invalid credentials`);
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error(`invalid credentials`);
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, {
        expiresIn: 60 * 60 * 24,
      });
      const { studentCourses, teacherCourses, isInstructor, fullName, avatar } =
        user;
      res.status(200).json({
        message: "✅user logged in",
        data: {
          email,
          studentCourses,
          teacherCourses,
          isInstructor,
          fullName,
          avatar,
          token,
        },
      });
    } catch (error) {
      res.status(400).json(`❌user could not login: ${error}`);
    }
  },

  async showSingleUser(req, res) {
    try {
      const user = await User.findById(req.user).populate({
        path: "teacherCourses",
        select: "title _id ",
      });

      if (!user) {
        throw new Error("Token expired");
      }
      const {
        email,
        studentCourses,
        teacherCourses,
        isInstructor,
        fullName,
        avatar,
      } = user;
      res.status(200).json({
        message: "✅user found",
        data: {
          email,
          studentCourses,
          teacherCourses,
          isInstructor,
          fullName,
          avatar,
        },
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "❌user is not authenticated", data: error });
    }
  },

  async instructorTrue(req, res) {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("Token expired");
      }
      user.isInstructor = true;
      const instructorUser = await User.findByIdAndUpdate(req.user, user, {
        new: true,
      });
      const {
        email,
        studentCourses,
        teacherCourses,
        isInstructor,
        fullName,
        avatar,
      } = instructorUser;
      res.status(200).json({
        message: "✅user is now an instructor",
        data: {
          email,
          studentCourses,
          teacherCourses,
          isInstructor,
          fullName,
          avatar,
        },
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "❌user can't be an instructor", data: error });
    }
  },
};
