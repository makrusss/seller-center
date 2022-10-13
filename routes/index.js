const express = require('express')
const router = express.Router()
const login = require('./login')
const homePage = require('./home')
const profilePage = require('./profile')
const logout = require('./logout')

router.get('/', (req,res)=>{
    res.redirect('/login')
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/home', homePage)
router.use('/profile', profilePage)

module.exports = router  