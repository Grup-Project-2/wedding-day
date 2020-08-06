const router = require('express').Router()
const invitation = require('./invitationRoute')
const user = require('./userRoute')
const calender = require('./calenderRoute')


router.use('/',user)
router.use('/',invitation)
router.use('/',calender)


module.exports=router