const router = require('express').Router()
const InvitationController = require('../controllers/InvitationController')
const authenticate = require('../middlewares/authenticate')

router.post('/invitations',authenticate, InvitationController.create)
router.post('/guests',authenticate, InvitationController.addSendTo)
router.get('/guests',authenticate, InvitationController.findSendTo)


module.exports=router