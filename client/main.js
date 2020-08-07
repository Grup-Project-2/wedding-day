$(document).ready(function () {
    if (localStorage.token) {
        afterLogin()
    } else {
        beforeLogin()
    }
});

function beforeLogin () {
    $("#register-form").hide()
    $("#login-form").hide()
    $("#logout").hide()
    $("#add-card").hide()

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
    $("#card-wedding").show()
    $("#show-login").show()
    $("#card-list-container").show()

    getCardList()
}

function afterLogin () {
    $("#register-form").hide()
    $("#login-form").hide()
    $("#logout").show()

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
    $("#add-card").show()
    $("#show-login").hide()
    $("#card-list-container").show()

    getCardList()
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
        localStorage.token = invite.Mytoken
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

function calender (event) {
    event.preventDefault()

    $("#calender-page").show()
    $("#add-button").hide()
    $("#card-wedding").hide()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/calender`
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

function getCardList () {
    $('#card-list').empty()
    $.ajax({
      method: "GET",
      url: `${baseUrl}/invitations`,
    })
    .done((invite) => {
        invite.forEach(item => {
            let time = new Date(item.time)
            let getDate = `${time.getFullYear()}-0${time.getMonth()+1}-${time.getDate()}`
        
            $('#card-list').append(`
            <div class="card mx-2 mt-4 col-3" id="card-wedding" style="width: 18rem;">
            <img class="card-img-top" src="${item.qrCode}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <h6 class="card-title">${getDate}</h6>
              <h6 class="card-title">${item.location}</h6>
              <button type="button" class="btn btn-info" id="add-card" data-toggle="modal" data-target="#inviteModal">Send Invitation</button>
            </div>
            </div>
                `)
    });
        console.log(invite);
    })
    .fail(err => {
        console.log("Error:", err)
    })
    .always(() => {})
}

function addCard (event) {
    event.preventDefault()

    const newData = {
        title: $('#add-title').val(),
        time: $('#add-time').val(),
        location: $('#add-location').val(),
    }
    $.ajax({
        method: "POST",
        url: `${baseUrl}/invitations`,
        data: {
            title: newData.title,
            time: newData.time,
            location: newData.location,
        },
        headers: {
            atoken: localStorage.token
        }
    })
    .done((invite) => {
        $('#exampleModal').modal('hide')
        afterLogin()
    })
}

function back (event) {
    event.preventDefault()

    if (localStorage.token) {
        afterLogin()
    } else {
        beforeLogin()
    }
}
function showLogin (event) {
    event.preventDefault()
    $("#card-wedding").hide()
    $("#login-form").show()
    $("#show-login").hide()
    $("#card-list-container").hide()  
}