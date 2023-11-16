const router = require('express').Router()
const control = require('../controllers/controller')
const mid = require('../controllers/middlewares')


//POST
router.post('/createPlan', control.createPlan)
router.post('/createRamal', control.createRamal)
router.post('/createDocs', mid.upload.single("file"), control.createDocs)

router.post('/login', control.login)

//GET


//Busca de dados DataBase
router.get('/getPlans', mid.verifyToken, control.getPlans)
router.get('/getDocs', mid.verifyToken, control.getDocs)
router.get('/getBranches', mid.verifyToken, control.getBranches)
// router.get('/getSites', mid.verifyToken, control.findById)

//Paginas html
router.get('/planos', mid.verifyToken, control.planos)
router.get('/termos', mid.verifyToken, control.termos)
router.get('/guias', mid.verifyToken, control.guias)
router.get('/cadastro', mid.verifyToken, control.cadastro)
router.get('/etiqueta', mid.verifyToken, control.etiqueta)
router.get('/ramais', mid.verifyToken, control.ramais)
router.get('/sites', mid.verifyToken, control.sites)
router.get('/config', mid.verifyToken, control.config)

//GET => config.html
router.get('/getData', control.getData)

//PUT
router.post('/updatePlan', control.updatePlan) // Atualiza plano
router.post('/updateDocs', mid.upload.single("file"), control.updateDocs) // Atualiza ramal
router.post('/updateBranche', control.updateBranche) // Atualiza ramal











module.exports = router