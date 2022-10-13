const { Profile, Seller } = require('../models/index')
const bcrypt = require('bcryptjs')

class Controller {
    static login(req,res){
        const { error } = req.query
            res.render('login', { error } )
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
        },{returning:true})
        .then((data)=>{
            Profile.create({
                fullName:fullName,
                dateOfBirth:dateOfBirth,
                gender:gender,
                email:email,    
                address:address,
                photo:photo,
                SellerId:data.id})
                .then(()=>{
                    res.redirect(`/`)
                })
                .catch((reject)=>{
                    res.send(reject)
                })
        })
        .catch((reject)=>{
            res.send(reject)
        })
    }

    static postLogin(req,res){
        const {username,password} = req.body
        Seller.findOne({
            username})
        .then((seller)=>{
            console.log(seller,`<<<<<<<<<<<`)
            if(seller){
                const isValidPassword = bcrypt.compareSync(password,seller.password)  
                if(isValidPassword){
                    req.session.sellerId = seller.id 
                    return res.redirect('/home')
                } else {
                    const error = "Invalid Username/Password!"
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "Invalid Username/Password!"
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch((reject)=>{
            res.send(reject)
        })
    }
}

module.exports=Controller