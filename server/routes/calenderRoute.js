const router = require('express').Router()
const Controller = require('../controllers/CalenderController')

router.post('/calender', Controller.showHoliday)
module.exports=router