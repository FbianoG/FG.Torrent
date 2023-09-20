const router = require('express').Router()
const control = require('../controllers/controller')

//POST
router.post('/createPlan', control.createPlan)

//GET
router.get('/index', control.getPlans)
router.get('/find', control.findPlan)

//PUT
router.post('/att', control.updatePlan)



module.exports = router