const router = require('express').Router()
const user = require('./userRoute')
const invitation = require('./invitationRoute')
const guest = require('./guestRouter')

router.use('/', user)
router.use('/invitations', invitation)
router.use('/guest', guest)


module.exports=router