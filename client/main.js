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
    .done((todos) => {
        beforeLogin()
        $('#front-page').hide()
        // $('#navbar-todos').show()
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