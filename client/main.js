$(document).ready(function () {
    if (localStorage.token) {
        afterLogin()
    } else {
        beforeLogin()
    }
});

function beforeLogin () {
    $("#register-form").hide()
    $("#login-form").show()
    $("#logout").hide()

    $("#table").hide()
    $("#table-list").hide()
    $("#add-button").hide()
    $("#form-add").hide()
    $("#form-edit").hide()

    $("#add-error").hide()
    $("#edit-error").hide()
    $("#back-button").hide()

    $("#error-add").hide()
    $("#error-login").hide()
    $("#error-register").hide()
    $("#error-add").hide()
    $("#calender-page").hide()
    $("#card-wedding").hide()
}

function afterLogin () {
    $("#register-form").hide()
    $("#login-form").hide()
    $("#logout").show()

    $("#table").show()
    $("#table-list").show()
    $("#add-button").show()
    $("#form-add").hide()
    $("#form-edit").hide()

    $("#add-error").hide()
    $("#edit-error").hide()
    $("#back-button").hide()

    $("#error-add").hide()
    $("#error-login").hide()
    $("#error-register").hide()
    $("#error-add").hide()
    $("#calender-page").hide()
    $("#card-wedding").show()

    getTodoList()
}

const baseUrl = `http://localhost:3000`

function processLogin (event) {
    event.preventDefault();
    
    $.ajax({
        method: "POST",
        url: `${baseUrl}/login`,
        data: {
            email: $('#emailLogin').val(),
            password: $('#passwordLogin').val(),
        }
    })
    .done((invite) => {
        localStorage.token = invite.atoken
        afterLogin()
    })
    .fail((err) => {
        $("#error-login").text(err.responseJSON.message).show()
        console.log('Error:', err);
    })
    .always(() => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
    })
}

function processRegister (event) {
    event.preventDefault();
  
    $.ajax({
      method: "POST",
      url: `${baseUrl}/register`,
      data: {
          email: $('#emailRegister').val(),
          password: $('#passwordRegister').val()
      }
    })
    .done((invite) => {
        beforeLogin()
        $('#front-page').hide()
        // $('#navbar-invite').show()
        $("#login-form").show()
        console.log('Success Register');
    })
    .fail((err) => {
        $('#error-register').text(err.responseJSON.message).show()
        console.log("Error:", err)
    })
    .always(() => {
        $('#emailRegister').val('')
        $('#passwordRegister').val('')
    })
}

function logOut (event) {
    event.preventDefault()

    localStorage.clear()
    beforeLogin()
}

function makeAccount (event) {
    event.preventDefault()
    $('#register-form').show()
    $('#login-form').hide()
}

function haveAccount (event) {
    event.preventDefault()
    $('#register-form').hide()
    $('#login-form').show()
}

function calendar (event) {
    event.preventDefault()

    $("#calender-page").show()
    
    $.ajax('http://localhost:3000/calender',{
        method: 'POST',
        headers: {
            accesstoken: localStorage.accessToken
        }
    })
    .done(function (data){
        data.forEach(e => {
            $('#bodyTable').append(`
            <tr class="bg-warning">
            <th scope="row">${e.name}</th>
            <td>${e.weekdayName}</td>
            <td>${e.date}</td>
            <td>${e.types[0].name}</td>
            </tr>
            `)
        });
    })
    .fail(function (err){
        console.log('err',err);
    })
    .always(function (){
        console.log('selesai');
    })
    
}
function sendEmail(event){
    event.preventDefault()

    $.ajax('http://localhost:3000/invitationsByUserId',{
            method:'GET',
            headers:{
                atoken: localStorage.accessToken
            }
        })
    .done(function (invtData){

        $.ajax('http://localhost:3000/guest',{
            method:'GET',
            headers:{
                atoken: localStorage.accessToken
            }
        })
        .done(function(guestData){
            guestData.forEach(el=>{
                var mailgun=require('mailgun-js');
                var api_key = '7c9014c35525cfa2fd605d387239ebb7-f7d0b107-a28d3715';
                var domain = 'sandboxab030eee0128476ba50243aa630654a1.mailgun.org';
                const mg = mailgun({apiKey: api_key, domain: domain});
            const data = {
                from: 'Wedding_CO <christonrinaldy.geodesy@gmail.com>',
                to: el.toSend,
                subject: 'grup_project',
                text:  `Halo kami dari panitia pernikahan mengundang Anda untuk menghadiri acara pernikahan ${invtData.title} yang diselenggarakan,
                        pada waktu: ${invtData.time},
                        lokasi    : ${invtData.location},

                        Kami, ${invtData.title} sangat mengharapkan kehadiran Anda.
                
                `
            };
            mg.messages().send(data, function (error, body) {
            console.log(body);
            
            })
            })
        })    
        .fail(function(err){

        })
        .always(function(){
            
        })


        
    })
    .fail(function (err){
        
    })
    .always(function (){

    })

}