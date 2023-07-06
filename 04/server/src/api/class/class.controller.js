const _Class = require('./class.model');
const Course = require('../course/course.model');

const list = (req, res) => {
  console.log('class controller, method List')
  _Class.find({classOfCourse: req.params.courseId})/* .populate({
    path: 'Course',
    select: 'fullName email payment'
  }) */
  .then( classes => res.status(200).json({message: 'clases ubicados exitosamente', data: classes}))
  .catch( err => res.status(200).json({message: 'no se pudo ubicar', data: err}))
}

const show = async (req, res) => {
try {
  const { classId } = req.params;
  const _class = await _Class.findById(classId)/* .populate({
    path: 'user',
    select: 'fullName email payment'
  }) */
  res.status(200).json({message: 'clase ubicado exitosamente', data: _class})
} catch (error) {
  res.status(200).json({message: 'no se pudo ubicar el curso', data: error})
}

}

const createBlankClass = (req, res) => {
  _Class.create(req.body)
    .then( _class => res.status(200).json({message: 'Unrelated class created succesfully', data: _class}))
    .catch( err => res.status(400).json({message: 'it could not be created', data: err}))
}

const create = async (req, res) => {
  try {
  const { courseId } = req.params;
  const data = req.body;

  const course = await Course.findById(courseId);
  if(!course) throw new Error('No parent course associated ');

  const newClass = {
    ...data,
    classOfCourse: courseId
  }

  const _class = await _Class.create(newClass);
  course.classes.push(_class);
  await course.save({ validateBeforeSave: false });

  res.status(200).json({message: '✅Succesflull class creation ', data: _class})
  } catch (err) {
    console.log(err);
    res.status(400).json({message: '❌ Unsuccesflull class creation', data: err})
  }
}

const update = (req, res) => {
  const { classId } = req.params;

  _Class.findByIdAndUpdate(classId, req.body, {new: true})
    .then( lesson => res.status(200).json({message: 'Clase modificada exitosamente', data: lesson}))
    .catch( err => res.status(200).json({message: 'no se pudo modificar', data: err}))
}

const destroy = (req, res) => {
  const { classId } = req.params;

  _Class.findByIdAndRemove(classId)
    .then( lesson => res.status(200).json({message: 'clase eliminada exitosamente', data: lesson}))
    .catch( err => res.status(200).json({message: 'no se pudo eliminar', data: err}))
}

module.exports = {
  // class CRUD
  // 1 traer el id del curso al que va Params
  // 2 create clase
  // 3 push al modelo de course
  // 4 confirmar cambio con save de mongoose al modelo de curso
  // para cambiar info de un curso put con el id de clase
  create, createBlankClass,
  show, list,
  update,
  destroy
}
