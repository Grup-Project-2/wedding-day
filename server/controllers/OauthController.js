require('dotenv').config()
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { encode } = require('../helpers/jwt')

class googleAuth {
    static googleSignin (req, res, next) {
        const id_token = req.body.id_token
        console.log('>>> masuk');
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        console.log('>>> Masuk', client);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            console.log(">>>> Ticket: ",ticket);
            payload = ticket.getPayload();
            console.log(payload, ">>>> DATAGOOGLE")
            const userid = payload['sub']
            console.log(userid, '>> ini data dari');
            return User.findOne({ where: { email: payload["email"] } })
        })
        .then(user => {
            if (user) {
            console.log("MASUK THEN DI USER UDH ADA")
            return user;
            } else {
            let dataUser = {
                email: payload['email'],
                password: 'admin',
            }
            return User.create(dataUser)
            }
        })
        .then(data => {
            let access_token = encode({ id: data.id, email: data.email })

            console.log("SUKSES BROW")
            return res.status(200).json({ access_token })
        })
        .catch(err => {

            console.log(err, "INI ERROR GUYS")
            res.status(400).send(err, "INI ERROR GUYS")
        })
    }
}

module.exports = googleAuth