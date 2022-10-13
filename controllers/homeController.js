const { Product, Profile, Seller } = require("../models/index")
const toRupiah = require('../helpers/toRupiah')
const qrcode = require("qrcode")
const { Op } = require("sequelize")

class Controller{
  static renderHome(req, res) {
    let sellerId = req.query.id
    let search = req.query.search
    let options = {
      include: {
        model: Seller
      },
      where: {
        SellerId: sellerId
      }
    }
    if (search){
      options.where= {
        ...options.where,
        name:{
          [Op.iLike] : `%${search}%`
        }
      }
    }
    Product.findAll(options)
    .then(data => {
      res.render('home', { data, sellerId, toRupiah })
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
        qr_code: src, data, toRupiah
        });
    })
    });
  }

  static renderAddProduct(req, res) {
    let sellerId = req.query.id
    res.render('addproduct', { sellerId })
  }

  static postAddProduct(req, res) {
    let { name, stock, price, description, imageURL } = req.body
    Product.create({
      name: name,
      stock: stock,
      price: price,
      description: description,
      imageURL: imageURL,
      SellerId: req.query.id,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(() => {
      res.redirect(`/home?id=${req.query.id}`)
    })
  }

  static renderEdit(req,res){
    let EmployeeId = +req.params.EmployeeId
    Employee.findByPk(EmployeeId)
    .then((employee)=>{
        employee.dataValues.dateOfBirth = employee.dataValues.dateOfBirth.toISOString().split('T')[0]
        res.render('editEmployee', {employee})
    })
    .catch((reject)=>{
        res.send(reject)
    })
}
}

module.exports = Controller