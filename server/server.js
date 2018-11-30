const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'shit@example.com',
        text: 'Hey, what is up',
        createdAt: 123
    })

    socket.on('createMessage', function (createdMessage) {
        console.log('createMessage', createdMessage);

        io.emit('newMessage', {
            from: createdMessage.from,
            text: createdMessage.text,
            createdAt: new Date().getTime()
        })
    })
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});