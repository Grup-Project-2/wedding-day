const axios = require('axios')
class Controller {
    static showHoliday(req, res){
        axios({
            method: 'GET',
            url: 'https://api.festdays.dev/v1/holidays',
            params: {
                country: 'ID',
                size: '100',
                format: 'json',
                pretty: ['true', 'true'],
                year: '2020',
                key: '40fe6f04deab7414e5a846ea26c50985f7be28'
            },
            headers: {accept: 'application/json'}
        })
        .then((result) => {
            console.log(result.data.results);
            res.status(200).json(result.data.results)    
        }).catch((err) => {
            console.log(err);
            res.status(404).json(err)    
        });
    }
}

module.exports =Controller