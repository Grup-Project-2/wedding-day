const router = require('express').Router()
const invitationController = require('../controllers/InvitationController')
const authenticate = require('../middlewares/authenticate')

router.get('/', invitationController.show)
router.use(authenticate)
router.post('/', invitationController.add)
router.delete('/:id', invitationController.destroy)

module.exports=router
