const router = require('express').Router()
const guest = require('./guestRouter')
const user = require('./userRoute')
const calender = require('./calenderRoute')

router.use('/', user)
router.use('/invitations', invitation)
router.use('/guest', guest)
router.use('/',calender)

module.exports=router