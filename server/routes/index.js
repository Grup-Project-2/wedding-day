const router = require('express').Router()
const user = require('./userRoute')
const invitation = require('./invitationRoute')
const guest = require('./guestRouter')
const calender = require('./calenderRoute')
const googleAuth = require('../controllers/OauthController')



router.post('/googleSignin', googleAuth.googleSignin)
router.use('/', user)
router.use('/invitations', invitation)
router.use('/guest', guest)
router.use('/',calender)

module.exports=router