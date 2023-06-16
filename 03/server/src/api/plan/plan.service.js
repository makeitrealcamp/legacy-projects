const Plan = require('./plan.model')

function createPlan(data) {
  return Plan.create(data)
}

function updatePlan(id, data) {
  return Plan.findByIdAndUpdate(id, data, { new: true })
}

function deletePlan(id) {
  return Plan.findByIdAndDelete(id)
}

function getAllPlans() {
  return Plan.find({})
}

function getOnePlan(id) {
  return Plan.findById(id)
}

module.exports = {
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
  getOnePlan,
}
