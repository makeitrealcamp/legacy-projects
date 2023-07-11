const Homes = require("../Homes/Homes.model");
const Users = require("../Users/Users.model");
const Reservations = require("./reservation.model");

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;

      const user = await Users.findById(req.userId);

      const home = await Homes.findById(data.homeId);

      const newReservation = {
        ...data,
        home: home,
        user: user,
        initialDdate: Date.parse(data.date[0]),
        finalDate: Date.parse(data.date[1])
      };

      const reservation = await Reservations.create(newReservation);

      user.reservations.push(reservation._id);
      await user.save({ validateBeforeSave: false });

      home.reservations.push(reservation._id);
      await home.save({ validateBeforeSave: false });

      res
        .status(200)
        .json({ message: "Reservation created", data: reservation });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Could not create reservation", data: err.message });
    }
  },

  async show(req, res) {
    try {
      const data = req.body;

      const user = await Users.findById(req.userId);
      const home = await Homes.findById(data.homeId);
      const reservation = await Reservations.findById(data.reservationId);

      if (
        !(
          user._id.equals(reservation.user) || home._id.equals(reservation.home)
        )
      ) {
        return new Error("Not valid credentials");
      }

      res.status(200).json({ message: "reservation found", data: reservation });
    } catch (err) {
      res.status(400).json({ message: "No reservation found", data: err });
    }
  },

  async showHost (req,res){
    try{
      const user = await Users.findById(req.userId).select('homes -_id').populate({
        path:'homes',
        select:'_id reservations location',
        populate: {
          path: 'reservations',
          populate: {
            path: 'user home',
            select: 'profileimg name -_id location'
          }
        }
      });

      res.status(200).json({data:user})
    } catch (err){
      res.status(400).json({message:'no reservations found',data:err})
    }
  },
};
