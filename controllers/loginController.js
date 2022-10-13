const { Profile, Seller } = require('../models/index')

class Controller {
    static login(req,res){
        res.render('login')
    }
    
    static registrationForm(req,res){
        res.render('registration')
    }

    static registration(req,res){
        console.log(req.body)
        let {username, password, fullName, dateOfBirth, gender, email, address, photo} = req.body
        Seller.create({
            username,
            password
        })
        .then((data)=>{
            Profile.create({
                fullName:fullName,
                dateOfBirth:dateOfBirth,
                gender:gender,
                email:email,    
                address:address,
                photo:photo,
                SellerId:data.id})

        res.redirect(`/`)
        })
        .catch((reject)=>{
            res.send(reject)
        })
    }
}

module.exports=Controller