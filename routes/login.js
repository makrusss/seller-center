const express = require('express')
const Controller = require('../controllers/loginController')
const router = express.Router()


router.get('/', Controller.login)

router.get('/registration', Controller.registrationForm )
router.post('/registration', Controller.registration )

module.exports = router  