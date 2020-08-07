const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static register(req,res){
        let hash = bcrypt.hashSync(req.body.password, 10);
        let newUser = {
            email : req.body.email,
            password : hash
        }
        User.create(newUser)
            .then((user)=>{
                res.status(201).json(user)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    }

    static login(req,res){
        User.findOne({
            where : {
                email : req.body.email
            }
        })
            .then((user)=>{
                if(!user){
                    return res.status(401).json({err : `email or password wrong`})
                }

                const compare = bcrypt.compareSync(req.body.password, user.password);
                if(compare){

                    var token = jwt.sign({
                        id : user.id,
                        email : user.email
                    }, process.env.JWT_TOKEN)

                    res.status(200).json({
                        Mytoken : token
                    })


                }else{
                    return res.status(401).json({err : `email or password wrong`})
                }
       
            })
            .catch((err)=>{
                res.status(500).json({err:err.message})
            })
    }
}

module.exports=UserController