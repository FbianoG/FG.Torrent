const router = require('express').Router()
const control = require('../controllers/controller')

//POST
router.post('/createPlan', control.createPlan)
router.post('/createRamal', control.createRamal)

//GET
router.get('/index', control.getPlans)
router.get('/ramais', control.getRamais)

router.get('/getData', control.getData)

//PUT
router.post('/updatePlan', control.updatePlan)
router.post('/updateBranche', control.updateBranche)



module.exports = router