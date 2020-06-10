const createGame = (gameFrame) => {
    const state = {
        players: {},
        fruits: {}
    };

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        };
    };

    function removePlayer(command) {
        const playerId = command.playerId;

        delete state.players[playerId];
    };

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };
    };

    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];
    };

    function movePlayer(command) {

        const keyPressed = command.keyPressed;
        const player = state.players[command.playerId];

        const keys = {
            'ArrowUp': player => {
                player.y = Math.max(player.y - 1, 0);
            },
            'ArrowDown': player => {
                player.y = Math.min(player.y + 1, gameFrame.height - 1);
            },
            'ArrowLeft': player => {
                player.x = Math.max(player.x - 1, 0);
            },
            'ArrowRight': player => {
                player.x = Math.min(player.x + 1, gameFrame.width - 1);
            }
        };

        if (player && keys[keyPressed]) {
            keys[keyPressed](player);
            collectCoin(player);
        };

    };

    function collectCoin(player) {
        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];
            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId });
            };
        };
    };

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    };
};

export default createGame;
