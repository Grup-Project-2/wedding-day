const router = require('express').Router()
const sendEmailController = require('../controllers/SendEmailController')



router.post('/', sendEmailController.sendEmail)


module.exports=router
