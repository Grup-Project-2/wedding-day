$(document).ready(function () {
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

})