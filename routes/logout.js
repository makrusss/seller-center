const express = require('express')
const router = express.Router()
const Controller = require("../controllers/logoutController")

router.get('/', Controller.logout)

module.exports = router  