const router = require('express').Router()
const invitationController = require('../controllers/InvitationController')

router.post('/', invitationController.add)
router.get('/:id', invitationController.showById)
router.delete('/:id', invitationController.destroy)

module.exports=router