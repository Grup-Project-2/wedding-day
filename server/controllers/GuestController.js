const {Guest , Invitation} = require('../models')

class GuestController{

    static addSendTo(req,res){
        let SendtoMail = {
            toSend : req.body.email,
            UserId : req.userLogin.id
        }
        Guest.create(SendtoMail)
            .then((sentTo)=>{
                res.status(201).json(sentTo)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    }

    static findSendTo(req,res){
        let UserId =  req.userLogin.id
        Guest.findAll({
            where : {
                UserId 
            }
        })
        .then((guest=>{
            res.status(200).json(guest)
        }))
        .catch((err)=>{
            res.status(400).json(err)
        })
    }
}

module.exports = GuestController;