const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authenticate(req,res,next){

    if(!req.headers.atoken){
        return res.status(500).json({
            msg: 'not authenticated'
        })
    }

    try {
        const userToken = jwt.verify(
          req.headers.atoken,
          process.env.JWT_TOKEN
        )
        User
          .findOne({
            where: {
              email: userToken.email
            }
          })
          .then(user => {
            if (!user) {
              res.status(401).json({
                msg: 'not authenticated'
              })
            } else {
              req.userLogin = user
              next()
            }
          })
      } catch (err) {
        console.log(err)
        res.status(401).json({
          msg: 'not authenticated'
        })
      }
}

module.exports=authenticate;