const router = require('express').Router()
const guest = require('./guestRouter')
const user = require('./userRoute')

router.use('/', user)
router.use('/invitations', invitation)
router.use('/guest', guest)


module.exports=router