const express = require('express');
const app = express();
const fs=require('fs');
const server=require('socket.io');


const io = server(app.listen(3000 || process.env.PORT));

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) throw err;
        res.send(data);
    });

});

io.on('connection', (socket) => {
    console.log('a user connected');
    let myname='';
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user-disconnected', myname);
    });
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message',msg);
    }
    );
    socket.on('new-user', (msg) => {
        myname=msg;
        console.log('new user: ' + msg);
        io.emit('new-user', msg);
    });



});
