const router = require('express').Router()
const control = require('../controllers/controller')

const jwt = require('../middlewares/jwt')
const multer = require('../middlewares/multer')

//POST
router.post('/createPlan', control.createPlan)
router.post('/createRamal', control.createRamal)
router.post('/createDocs', multer.upload.single("file"), control.createDocs)
router.post('/createSite', control.createSites)

router.post('/login', control.login)

//GET


//Busca de dados DataBase
router.get('/getPlans', jwt.verifyToken, control.getPlans)
router.get('/getDocs', jwt.verifyToken, control.getDocs)
router.get('/getBranches', jwt.verifyToken, control.getBranches)
router.get('/getSites', jwt.verifyToken, control.getSites)

//Paginas html
router.get('/planos', jwt.verifyToken, control.planos)
router.get('/termos', jwt.verifyToken, control.termos)
router.get('/guias', jwt.verifyToken, control.guias)
router.get('/cadastro', jwt.verifyToken, control.cadastro)
router.get('/etiqueta', jwt.verifyToken, control.etiqueta)
router.get('/ramais', jwt.verifyToken, control.ramais)
router.get('/sites', jwt.verifyToken, control.sites)
router.get('/config', jwt.verifyToken, control.config)

//GET => config.html
// router.get('/getData', control.getData)

//PUT
router.post('/updatePlan', control.updatePlan) // Atualiza plano
router.post('/updateDocs', multer.upload.single("file"), control.updateDocs) // Atualiza Documento
router.post('/updateBranche', control.updateBranche) // Atualiza ramal
router.post('/updateSite', control.updateSite) // Atualiza Site











module.exports = router