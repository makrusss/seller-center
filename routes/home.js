const express = require('express')
const router = express.Router()

const profile = require('./profile')
const Controller = require("../controllers/homeController")

router.get('/', Controller.renderHome)
router.get('/:id', Controller.renderProductDetail)

router.use('/profile', profile)

module.exports = router  