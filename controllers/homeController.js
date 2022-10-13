const { Product, Profile, Seller } = require("../models/index")

class Controller{
  static renderHome(req, res) {
    Product.findAll()
    .then(data => {
      res.render('home')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller