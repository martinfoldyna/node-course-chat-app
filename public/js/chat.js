var socket = io();

function scrollToBottom() {
    //Selectors
    let messages = $('#messages');
    let newMessages = messages.children('li:last-child');

    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessages.innerHeight();
    let lastMessageHeight = newMessages.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    let params = JSON.parse(sessionStorage.getItem('user'));
    console.log(params.name)

    socket.emit('join', params, function (error) {
        if(error) {
            alert(error);
            window.location.href = "/";
        } else {
            console.log('No error');
        }
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('updateUserList', function (users) {
    let ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user))

    });
    $('#users').html(ol)
})

socket.on('newMessage', function (newMessage) {
    let formattedTime = moment(newMessage.createdAt).format('H:mm');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
})

socket.on('newLocationMessage', function (newMessage) {
    let formattedTime = moment(newMessage.createdAt).format('H:mm');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        from: newMessage.from,
        url: newMessage.url,
        createdAt: formattedTime
    })

    $('#messages').append(html);
    scrollToBottom();
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageText = $('[name = message]')

    socket.emit('createMessage', {
        text: messageText.val()
    }, function () {
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
});

$('#logout').on('click', function () {
    sessionStorage.removeItem('user');
    window.location.href = '/';
})