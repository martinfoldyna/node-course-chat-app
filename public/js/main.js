var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (newMessage) {
    console.log('newMessage', newMessage);
    let li = $('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);

    $('#messages').append(li);
})

socket.on('newLocationMessage', function (newMessage) {
    console.log('here');
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');

    li.text(`${newMessage.from}: `);
    a.attr('href', newMessage.url);
    li.append(a);
    $('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: $('[name = from]').val(),
        text: $('[name = message]').val()
    }, function (data) {
        console.log('Got it', data);
        // resultPar.innerHTML = '<b>Got it.</b> <br>Message from server: <b>' + data + '</b>';
    })
})

let locationButton = $('#sendLocation');
locationButton.on('click', function () {

    //Check if user has access to geolocation API (=> in older explorers not supported fore example IE)
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    //If they have access, then fetch their location
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        //Run if user for example not allowed to share his location in alert in browser
        alert('Unable to fetch location.')
    })
})