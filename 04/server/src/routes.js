/* aplication routes */
const userRoute = require('./api/user/user.routes')
const instructorRoute = require('./api/instructor/instructor.routes')
const courseRoute = require('./api/course/course.routes')
const classRoute = require('./api/class/class.routes')
const mediaRoute = require('./api/multimedia/media.routes');

function routes(app) {
  app.use('/users', userRoute);
  app.use('/instructors', instructorRoute);
  app.use('/courses', courseRoute);
  app.use('/classes', classRoute)
  app.use(mediaRoute);
};


 module.exports = routes;
