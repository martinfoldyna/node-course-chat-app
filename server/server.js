const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

    socket.on('createMessage', function (createdMessage) {
        console.log('createMessage', createdMessage);

        io.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text));

        // socket.broadcast.emit('newMessage', {
        //     from: createdMessage.from,
        //     text: createdMessage.text,
        //     createdAt: new Date().getTime()
        // })
    })
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});