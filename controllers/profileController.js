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

  static renderEditProfile(req, res) {
    Profile.findByPk(req.params.id, {
      include: {
        model: Seller
      }
    })
    .then(data => {
      res.render('editProfile', { data })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static postEditData(req, res) {
    console.log(req.body);
    let id = req.params.id
    let { fullName, email, dateOfBirth, photo, address, gender } = req.body
    Profile.update({
      fullName,
      email,
      dateOfBirth,
      photo,
      address,
      gender
    }, {
      where: {
        id: id
      }
    })
    .then(() => {
      res.redirect(`/profile/${id}`)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller