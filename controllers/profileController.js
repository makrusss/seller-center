const { Product, Profile, Seller } = require("../models/index")
const qrcode = require("qrcode")

class Controller{
  static renderProfile(req, res) {
    Profile.findByPk(req.params.id, {
      include: {
        model: Seller
      }
    })
    .then(data => {
      res.render('profile', { data })
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller