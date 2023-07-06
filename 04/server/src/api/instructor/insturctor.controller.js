const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(req, res) {
    try {

      const encriptedPassord = await bcrypt.hash(req.body.password, 11);
      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: encriptedPassord,
        isInstructor: true,
      });

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, {
        expiresIn: 60 * 60 * 24,
      });
      const {
        studentCourses,
        teacherCourses,
        isInstructor,
        fullName,
        avatar,
        email,
      } = user;
      res.status(201).json({
        message: "✅Instructor created",
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
      res
        .status(400)
        .json({ message: "❌Instructor could NOT be created", data: error });
    }
  },
};
