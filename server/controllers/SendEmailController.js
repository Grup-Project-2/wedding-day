const mailgun = require('mailgun-js');


class sendEmailController {
    static sendEmail(req, res) {

        try{
            console.log('masuk send email >>>>>')
            console.log(req.body)
            var api_key = `${process.env.API_KEY}`;
        var domain = 'sandbox5659c7c808ac4462a0b1a8444d0f5be9.mailgun.org';
        const mg = mailgun({ apiKey: api_key, domain: domain });
        const data = {
            from: 'Wedding_CO <christonrinaldy.geodesy@gmail.com>',
            to: req.body.email,
            subject: 'Wedding Invitation',
            text: `Halo kami dari panitia pernikahan mengundang Anda untuk menghadiri acara pernikahan ${req.body.title} yang diselenggarakan,
                            pada waktu: ${req.body.time},
                            lokasi    : ${req.body.location},
    
                            Kami, ${req.body.title} sangat mengharapkan kehadiran Anda.
                    
                    `
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);

        })

        res.status(200).json({message:'Sukses'})
        }catch(err){
            console.log(err)
        }
       
        
        
    }
}


module.exports = sendEmailController