class Controller{
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err)
      else {
          res.redirect('/login')
      }
  })
    // req.session.user = null
    // req.session.save(function (err) {
    //   if (err) next(err)
  
    //   req.session.regenerate(function (err) {
    //     if (err) next(err)
    //     res.redirect('/login')
    //   })
    // })
  }
}

module.exports = Controller