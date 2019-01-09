let color = 'white';

const express = require('express');

const app = express();

const server = app.listen(1337);

const bodyParser = require('body-parser');

const session = require('express-session')({
    secret: 'keyboardkittehMEEEEEEEEEEEOOOOWWWWWWWWWWWWWWWWW',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
});

const io = require('socket.io')(server);

const sharedsession = require("express-socket.io-session");

io.use(sharedsession(session, { autoSave: true }));

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname}/views`);

app.set('view engine', 'ejs');


io.on('connection', function (socket) {

    socket.emit('welcome',color);

    socket.on('color_change', function(newColor){
        socket.handshake.session.color = newColor;
        socket.handshake.session.save();
        color = newColor;
        sessionColor = socket.handshake.session.color;
        socket.emit('update', sessionColor);
    });

});


app.get('/', function (request, response) {
    response.render('index');
});
