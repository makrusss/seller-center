const express = require('express')
const router = express.Router()
const Controller = require("../controllers/homeController")

router.get('/', Controller.renderHome)

module.exports = router  