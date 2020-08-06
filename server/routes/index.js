const router = require('express').Router()
const guest = require('./guestRouter')
const user = require('./userRoute')

router.use('/',user)
router.use('/',guest)

module.exports=router