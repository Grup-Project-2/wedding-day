const router = require('express').Router()
const GuestController = require('../controllers/GuestController')
const authenticate = require('../middlewares/authenticate')

router.post('/guests',authenticate, GuestController.addSendTo)
router.get('/guests',authenticate, GuestController.findSendTo)


module.exports=router