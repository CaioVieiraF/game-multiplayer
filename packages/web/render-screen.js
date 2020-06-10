const renderScreen = (gameFrame, game, requestAnimationFrame) => {
    const context = gameFrame.getContext('2d');

    context.fillStyle = 'white';
    context.clearRect(0, 0, gameFrame.width, gameFrame.height);

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    };

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    };

    requestAnimationFrame( () => {
        renderScreen(gameFrame, game, requestAnimationFrame);
    });

};

export default renderScreen;
