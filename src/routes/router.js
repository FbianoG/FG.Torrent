const router = require('express').Router()
const control = require('../controllers/controller')

//POST
router.post('/createPlan', control.createPlan)
router.post('/createRamal', control.createRamal)

//GET
router.get('/index', control.getPlans)
router.get('/find', control.findPlan)
router.get('/find-ramais', control.getRamais)

router.get('/getData', control.getData)

//PUT
router.post('/updatePlan', control.updatePlan)




module.exports = router