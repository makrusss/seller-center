const express = require('express')
const router = express.Router()
const Controller = require("../controllers/profileController")

router.get('/:id', Controller.renderProfile)
router.get('/:id/edit', Controller.renderEditProfile)
router.post('/:id/edit', Controller.postEditData)

module.exports = router  