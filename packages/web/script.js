import createKeyboardListener from './keyboard-listener.js';
import createGame from './create-game.js';
import renderScreen from './render-screen.js';

function main() {
    const gameFrame = document.getElementById('screen');

    const game = createGame(gameFrame);
    game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 });
    game.addFruit({ fruitId: 'fruit1', fruitX: 4, fruitY: 3});
    const keyboardListener = createKeyboardListener(document);

    keyboardListener.subscribe(game.movePlayer);

    renderScreen(gameFrame, game, requestAnimationFrame);

};

main();
