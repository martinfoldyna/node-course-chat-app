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