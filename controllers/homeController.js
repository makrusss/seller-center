const { Product, Profile, Seller } = require("../models/index")
const qrcode = require("qrcode")

class Controller{
  static renderHome(req, res) {
    let sellerId = req.query.id
    Product.findAll({
      where: {
        SellerId: sellerId
      },
      include: {
        model: Seller
      }
    })
    .then(data => {
      res.render('home', { data, sellerId })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static renderProductDetail(req, res) {
    let id = req.params.id
    const input_text = `http://localhost:3000/home/${req.params.id}`
    qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("Something went wrong!!");
    Product.findOne({
      where: {
        id
      },
      include: {
        model: Seller,
        include: {
          model: Profile
        }
      }
    })
    .then(data => {
      console.log(data.Seller);
      res.render("productDetail", {
        qr_code: src, data
        });
    })
    });
  }

  static addProduct(req, res) {
    res.render('addProduct')
  }
}

module.exports = Controller