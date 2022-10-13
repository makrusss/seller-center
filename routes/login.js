const express = require('express')
const router = express.Router()
const Controller = require("../controllers/loginController")

router.get('/', (req,res)=>{
  res.redirect('/login')
})

module.exports = router  