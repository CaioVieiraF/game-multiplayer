const createKeyboardListener = (document) => {
    document.addEventListener('keydown', handleKeydown);

    const state = {
        observers: [],
        playerId: null
    };

    function registerPlayer(playerId) {
        state.playerId = playerId;
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function unbscribe(observerFunction) {
        delete state.observers[observerFunction];
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        };
    };

    function handleKeydown( event ) {
        const keyPressed = event.key;

        const command = {
            type: 'move-player',
            playerId: state.playerId,
            keyPressed
        };

        notifyAll(command);
    };

    return {
        subscribe,
        unbscribe,
        registerPlayer
    };

};

export default createKeyboardListener;
