const router = require('express').Router()
const invitation = require('./invitationRoute')
const user = require('./userRoute')

router.use('/',user)
router.use('/invitations',invitation)

module.exports=router