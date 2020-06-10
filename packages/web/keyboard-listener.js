const createKeyboardListener = (document) => {
    document.addEventListener('keydown', handleKeydown);

    const state = {
        observers: []
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        };
    };

    function handleKeydown( event ) {
        const keyPressed = event.key;

        const command = {
            playerId: 'player1',
            keyPressed
        };

        notifyAll(command);
    };

    return {
        subscribe
    };

};

export default createKeyboardListener;