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

    li.text('Admin: ');
    a.attr('href', newMessage.url);
    li.append(a);
    $('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageText = $('[name = message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageText.val()
    }, function (data) {
        messageText.val('')
    })
})

let locationButton = $('#sendLocation');
locationButton.on('click', function () {

    //Check if user has access to geolocation API (=> in older explorers not supported fore example IE)
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    //If they have access, then fetch their location
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');

        //Run if user for example not allowed to share his location in alert in browser
        alert('Unable to fetch location.')
    })
})