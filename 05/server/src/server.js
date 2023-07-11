require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./db');
const homesRoute = require('./api/Homes/Homes.route');
const userRoute = require('./api/Users/Users.route');
const reservationRoute = require('./api/Reservations/reservation.route');
const commentsRoute = require('./api/Comments/Comments.route');
const formData = require('./api/Utils/formData');

const app = express();
const port = process.env.PORT;
connect();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/homes', homesRoute);
app.use('/user', userRoute);
app.use('/reservations',reservationRoute);
app.use('/comments', commentsRoute);

app.post('/prueba',formData,(req,res)=>{
  res.status(200).json({...req.body})
})


app.listen(port, () => {
  console.log('Server Running Ok');
});
