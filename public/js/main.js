var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'hey@shit.cz',
        text: 'LLOl'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (newMessage) {
    console.log('newMessage', newMessage);
})