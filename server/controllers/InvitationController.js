const {Guest , Invitation} = require('../models')

class InvitationController{
    static create(req,res){
        let newInvitation = {
            title : req.body.title,
            location : req.body.location,
            date : req.body.date
        }
        Invitation.create(newInvitation)
            .then((invitation)=>{
                res.status(201).json(invitation)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    }

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

module.exports = InvitationController;