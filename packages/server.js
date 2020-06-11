import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import createGame from './game/create-game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('game'));

const game = createGame();

game.subscribe( command => {
    sockets.emit(command.type, command);
});

sockets.on('connection', socket => {
    const playerId = socket.id;
    console.log(`player ${playerId} is connected`);
    game.addPlayer({ playerId });
    console.log(game.state);
    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        game.removePlayer({ playerId });
    });

    socket.on('move-player', command => {
        command.playerId = playerId;
        command.type = 'move-player';

        game.movePlayer(command);

    });

});

server.listen(3022, () => {

});
