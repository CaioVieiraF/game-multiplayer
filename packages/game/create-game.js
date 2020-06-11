
const createGame = (gameFrame) => {

    const state = {
        players: {},
        fruits: {},
    };

    const observers = [];

    function start() {
        const frequency = 2000;
        setInterval(addFruit, frequency);
    };

    function setState(newState) {
        Object.assign(state, newState);
    };

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    };

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command);
        };
    };

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * gameFrame.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * gameFrame.height);

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            points: 0
        };

        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY
        });
    };

    function removePlayer(command) {
        const playerId = command.playerId;

        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId
        });
    };

    function addFruit(command) {
        const fruitId = command ? command.fruitX : Math.floor(Math.random() * 10000000);
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * gameFrame.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * gameFrame.height);

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };

        notifyAll({
            type: 'add-fruit',
            fruitId,
            fruitX,
            fruitY
        });
    };

    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId
        });
    };

    function movePlayer(command) {
        notifyAll(command);

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
                player.points++;
            };
        };
    };

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
        setState,
        start,
        subscribe
    };
};

export default createGame;
