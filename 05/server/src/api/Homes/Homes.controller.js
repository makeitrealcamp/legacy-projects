
const Homes = require("./Homes.model");
const Users = require("../Users/Users.model");
const Reservations = require("../Reservations/reservation.model");

module.exports = {
  //get all
  async list(req, res) {
    try {
      const homes = await Homes.find()
        .populate({
          path: "userId",
          select: "-_id name email rol",
        })
        
      res.status(201).json({ message: "Homes found", data: homes });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //getID
  async show(req, res) {
    try {
      const { homeId } = req.params;
      const home = await Homes.findById(homeId)
        .populate({ path: "userId", select: "-_id name email rol profileimg createdAt" })
        .populate({ path: "reservations", select: "-user -home" })
        .populate({
          path: "comments",
          select: "message createdAt",
          populate: {
            path: "userId",
            select: "-_id name profileimg",
          },
        });
      
      if(!home){
        throw new Error('Home not found');
      }
      res.status(201).json({ message: "Home found", data: home });
    } catch (error) {
      
      res.status(400).json({message: "error", data: error.message});
    }
  },
  // post

  async create(req, res) {
    try {
      const userId = req.userId;
      const data = req.body;
      const user = await Users.findById(userId);

      if (!user) {
        throw new Error("Usuario invalido");
      }
      const newHome = {
        ...data,
        userId: userId,
      };
      const home = await Homes.create(newHome);
      user.rol = "host";
      user.homes.push(home._id);
      await user.save({ validateBeforeSave: false });

      res.status(201).json({ message: "Home Created", data: home });
    } catch (err) {
      res.status(400).json({ message: "Home could not be created", data: err.message });
    }
  },
  async update(req, res) {
    try {
      const user = req.userId;
      const data = req.body;
      const { homeId } = req.params;
      let { userId } = await Homes.findById(homeId);

      if (!userId) {
        throw new Error("casa invalida");
      }

      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }

      const homeUpdate = await Homes.findByIdAndUpdate(homeId, data, {
        new: true,
      });
      res.status(200).json({ message: "Home Updated", data: homeUpdate });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Home could not be Updated", data: error.message });
    }
  },
  async destroy(req, res) {
    try {
      const user = req.userId;
      const { homeId } = req.params;
      let { userId } = await Homes.findById(homeId);

      if (userId._id.valueOf() !== user) {
        throw new Error("Usuario invalido");
      }
      const userHom = await Users.findById(userId);
      const newHomes = userHom.homes.filter(item => homeId !== item.toString());
      userHom.homes = newHomes;
      await userHom.save({validateBeforeSave: false});
      const home = await Homes.findByIdAndDelete(homeId);
      res.status(200).json({ message: "Home Deleted", data: home });
    } catch (error) {
      res
        .status(400)
        .json({ Message: "Home could not be Deleted", data: error.message });
    }
  },

  //get users homes
  async showUser (req,res) {
    try{
      const userId = req.userId
      const user = await Users.findById(userId,'homes -_id').populate({
        path:'homes'
      })

      if(!user){
        return res.status(400).json({message:'No user found'})
      }

      res.status(200).json({message:'homes found',data:user})
    } catch(err){
      res.status(400).json({message:'no hoes found',data:err})
    }
  },

  async listFilter(req, res) {
    try {
      const { coordinates, dates, people, flexRange } = req.body;
      let reserve2 = []
      
      switch(flexRange){
        case 'one':
          reserve2 = [Date.parse(dates[0])+(1*24*60*60*1000),Date.parse(dates[1])-(1*24*60*60*1000)]
        case 'three':
          reserve2 = [Date.parse(dates[0])+(3*24*60*60*1000),Date.parse(dates[1])-(3*24*60*60*1000)]
        case 'seven':
          reserve2 = [Date.parse(dates[0])+(3*24*60*60*1000),Date.parse(dates[1])-(3*24*60*60*1000)]
        case 'normal':
          reserve2 = [Date.parse(dates[0]),Date.parse(dates[1])]   
        default:
          reserve2 = [Date.parse(dates[0]),Date.parse(dates[1])]  
      }
      
      const respf =[];
      const capacity = Object.values(people).reduce((a, b) => a + b, 0);
      const bounds = {
        north: coordinates[0] + 0.2,
        south: coordinates[0] - 0.2,
        east: coordinates[1] + 0.2,
        west: coordinates[1] - 0.2,
      };

      const homes = await Homes.find()

      async function searchReservation (resId,home){
        try{ 
          const reservation = await Reservations.findById(resId)
          if (
            !(reserve2[0] >= reservation.initialDdate && reserve2[0] <= reservation.finalDate) ||
            !(reserve2[1] >= reservation.initialDdate && reserve2[1] <= reservation.finalDate)
          ) {
            home.filter = home.filter && true
          } else {
            home.filter = home.filter && false
          }
        } catch (err) {
          const e = err
        }
      }

      async function runReserve (home){
        try{
          home.filter = true
          await home.reservations.reduce((acum, next) => {
            return acum.then(() => {
              return searchReservation(next,home);
            });
          }, Promise.resolve());
        } catch(err){
          const e = err
        }
      }

      await homes.reduce((acum, next) => {
        return acum.then(() => {
          return runReserve(next);
        });
      }, Promise.resolve());


      homes.forEach((item) => {
        if (!(item.filter)) return 
        if (
          item.location.coordinates.lat < bounds.north &&
          item.location.coordinates.lat > bounds.south &&
          item.location.coordinates.lng < bounds.east &&
          item.location.coordinates.lng > bounds.west &&
          item.capacity >= capacity
        ) {
          respf.push(item);
        }
      });
      
      res.status(200).json({ message: "filter found", data: respf });
    } catch (err) {
      res.status(400).json({ message: "no filter applied", data: err });
    }
  },
};
