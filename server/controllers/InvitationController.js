const { Invitation } = require('../models')

class InvitationController {
    static add (req, res, next) {
        const newInvite = {
            title: req.body.title,
            time: req.body.time,
            location: req.body.location,
            UserId: req.userLogin.id,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=time: ${req.body.time}. location: ${req.body.location}`
        }

        Invitation.create(newInvite)
        .then((invite) => {
            return res.status(201).json(invite)
        })
        .catch((err) => {
            next(err)
        })
    }

    static showById (req, res, next) {
        console.log('masok aaa>>>>');
        const id = req.params.id

        Invitation.findByPk(id)
        .then((invite) => {
            if (!invite) {
                throw {status: 404, name: "ErrorValidation", message: "Invite Not Found"}
            } else {
                return res.status(200).json(invite)
            }
        })
        .catch((err) => {
            console.log('ini dia >>>', err);
            next(err)
        })
    }

    static destroy (req, res, next) {
        const id = req.params.id
        let deleted

        Invitation.findByPk(id)
        .then((invite) => {
            deleted = invite
            if (!invite) {
                throw {status: 404, name: "ErrorValidation", message: "Invite Not Found"}
            } else {
                return invite.destroy()
            }
        })
        .then((invite) => {
            return res.status(200).json(deleted)
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = InvitationController