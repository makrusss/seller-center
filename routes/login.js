const express = require('express')
const Controller = require('../controllers/loginController')
const router = express.Router()


router.get('/', Controller.login)
router.post('/',Controller.postLogin)

router.get('/registration', Controller.registrationForm )
router.post('/registration', Controller.registration )

//--> ini buat : Kalau udah "logout", dan masih maksa masuk. "Please Login First"
router.use(function (req, res, next) {
    if(!req.session.sellerId) {
        const error = "Please Login First"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

module.exports = router  