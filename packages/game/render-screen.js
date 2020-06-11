const renderScreen = (gameFrame, game, requestAnimationFrame, currentPlayerId) => {
    const context = gameFrame.getContext('2d');

    context.fillStyle = '#09090c';
    context.clearRect(0, 0, gameFrame.width, gameFrame.height);

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId];

        context.fillStyle = '#F0DB4F';
        context.fillRect(player.x, player.y, 1, 1);
    };

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];

        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    };

    const currentPlayer = game.state.players[currentPlayerId];

    if (currentPlayer) {
        context.fillStyle = '#40d0e0';
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
    };

    requestAnimationFrame( () => {
        renderScreen(gameFrame, game, requestAnimationFrame, currentPlayerId);
    });

};

export default renderScreen;
