const {
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
  getOnePlan,
} = require('./plan.service')

async function createPlanHandler(req, res) {
  const data = req.body
  try {
    const plan = await createPlan(data)
    return res.status(201).json({ message: 'Plan created', data: plan })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Plan could not been created', data: error })
  }
}

async function updatePlanHandler(req, res) {
  const data = req.body
  const { planId } = req.params
  try {
    const plan = await updatePlan(planId, data)
    return res.status(200).json({ message: 'Plan updated', data: plan })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Plan could not been updated', data: error })
  }
}

async function deletePlanHandler(req, res) {
  const { planId } = req.params
  try {
    const plan = await deletePlan(planId)
    return res.status(200).json({ message: 'Plan deleted', data: plan })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Plan could not been deleted', data: error })
  }
}

async function getAllPlansHandler(_, res) {
  try {
    const plans = await getAllPlans()
    return res.status(200).json({ message: 'Plans found', data: plans })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Plans could not been found', data: error })
  }
}

async function getOnePlanHandler(req, res) {
  const { planId } = req.params
  try {
    const plan = await getOnePlan(planId)
    return res.status(200).json({ message: 'Plan found', data: plan })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Plan could not been found', data: error })
  }
}

module.exports = {
  getAllPlansHandler,
  getOnePlanHandler,
  deletePlanHandler,
  createPlanHandler,
  updatePlanHandler,
}
