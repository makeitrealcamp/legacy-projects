const Comments = require("./Comments.model");
const Users = require("../Users/Users.model");
const Homes = require("../Homes/Homes.model");

module.exports = {
  //get all
  async list(req, res) {
    try {
      const comments = await Comments.find().populate({
        path: "userId",
        select: "-_id name",
      });
      res.status(201).json({ message: "Comments found", data: comments });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //getID
  async show(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comments.findById(commentId).populate({
        path: "userId",
        select: "-_id name rol",
      });
      //populates
      if (!comment) {
        throw new Error("Comment not found");
      }
      res.status(201).json({ message: "Comment found", data: comment });
    } catch (err) {
      res.status(400).json({ message: "error", data: err.message });
    }
  },
  // post

  async create(req, res) {
    try {
      const userId = req.userId;
      const { homeId } = req.params;
      const data = req.body;
      const user = await Users.findById(userId);
      const home = await Homes.findById(homeId);

      if (!user) {
        throw new Error("Usuario invalido");
      }
      if (!home) {
        throw new Error("casa Invalida");
      }
      const homeScore = home.scorearrays;
      const commentScore = data.score;

      home.totalreviews = home.comments.length + 1;
      homeScore.cleanlinessarray.push(commentScore.cleanliness);
      homeScore.accuracyarray.push(commentScore.accuracy);
      homeScore.communicationarray.push(commentScore.communication);
      homeScore.locationarray.push(commentScore.location);
      homeScore.checkinarray.push(commentScore.checkin);
      homeScore.valuearray.push(commentScore.value);

      home.scorecleanliness = parseFloat(
        homeScore.cleanlinessarray.reduce((a, b) => a + b) / home.totalreviews
      ).toFixed(2);
      home.scoreaccuracy = parseFloat(
        homeScore.accuracyarray.reduce((a, b) => a + b) / home.totalreviews
      ).toFixed(2);
      home.scorecommunication = parseFloat(
        homeScore.communicationarray.reduce((a, b) => a + b) / home.totalreviews
      ).toFixed(2);
      home.scorelocation = parseFloat(
        homeScore.locationarray.reduce((a, b) => a + b) / home.totalreviews
      ).toFixed(2);
      home.scorecheckin = parseFloat(
        homeScore.checkinarray.reduce((a, b) => a + b) / home.totalreviews
      ).toFixed(2);
      home.scorevalue = parseFloat(
        homeScore.valuearray.reduce((a, b) => a + b) / home.totalreviews
      ).toFixed(2);

      home.totalScore = parseFloat(
        (home.scorecleanliness +
          home.scoreaccuracy +
          home.scorecheckin +
          home.scorecommunication +
          home.scorelocation +
          home.scorevalue) /
          6
      ).toFixed(2);

      const newComment = {
        ...data,
        userId: userId,
        homeId: homeId,
      };
      const comment = await Comments.create(newComment);

      user.comments.push(comment);
      await user.save({ validateBeforeSave: false });
      home.comments.push(comment);
      await home.save({ validateBeforeSave: false });

      res.status(201).json({ message: "Comment Created", data: comment });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Comment could not be created", data: error.message });
    }
  },
  //update
  async update(req, res) {
    try {
      const user = req.userId;
      const data = req.body;
      const { commentId } = req.params;
      let { userId } = await Comments.findById(commentId);

      if (!userId) {
        throw new Error("Comentario invalido");
      }

      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }

      const commentUpdate = await Comments.findByIdAndUpdate(commentId, data, {
        new: true,
      });
      res.status(200).json({ message: "Comment Updated", data: commentUpdate });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Comment could not be Updated", data: error.message });
    }
  },
  //delete
  async destroy(req, res) {
    try {
      const user = req.userId;
      const { commentId } = req.params;
      let { userId, homeId } = await Comments.findById(commentId);

      if (userId.toString() !== user) {
        throw new Error("Usuario invalido");
      }

      const userCom = await Users.findById(userId);
      const homeCom = await Homes.findById(homeId);

      const newUserComment = userCom.comments.filter(
        (item) => commentId !== item.toString()
      );
      userCom.comments = newUserComment;
      await userCom.save({ validateBeforeSave: false });
      const newHomeComment = homeCom.comments.filter(
        (item) => commentId !== item.toString()
      );
      homeCom.
      homeCom.comments = newHomeComment;
      await homeCom.save({ validateBeforeSave: false });

      const comment = await Comments.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comment Deleted", data: comment });
    } catch (error) {
      res
        .status(400)
        .json({ Message: "Comment could not be Deleted", data: error.message });
    }
  },
};
