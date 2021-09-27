/**
 * DEMO "SCREEN SAVER"
 */
if (Utilities.getQueryVariable('type') === false) {
    let timer;
    let timeOut = 15000;
    let randomSoupInstance;
    let randomSoupConfig = {
        type: 'screen',
        backgroundColor: 'black',
        sleepMilliseconds: 60,
        maxCycles: 60,
        characters: '*°.',
        specialProbability: 150,
        specialWords: [
            'believe',
            'in',
            'yourself',
        ],
        specialColors: [
            'darkred',
        ],   
    };
    document.addEventListener('mousemove', randomSoupStarter);
    document.addEventListener('DOMContentLoaded', randomSoupStarter);
    function randomSoupStarter() {
        if (randomSoupInstance) {
            randomSoupInstance.destroy();
            randomSoupInstance = null;
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            if (!randomSoupInstance)
                randomSoupInstance = new RandomSoup(randomSoupConfig);
        }, timeOut);
    }

/**
 * STARTUP FROM FORM PARAMETERS
 */
} else {
    let randomSoupInstances = [];
    let randomSoupConfig = {
        type: Utilities.getQueryVariable('type'),
        sleepMilliseconds: Utilities.getQueryVariable('sleepMilliseconds'),
        maxCycles: Utilities.getQueryVariable('maxCycles'),
        characters: decodeURIComponent(Utilities.getQueryVariable('characters')),
        words: Utilities.getQueryVariable('words') !== '' && Utilities.getQueryVariable('words') !== false ? decodeURIComponent(Utilities.getQueryVariable('words')).split(',') : [],
        specialProbability: Utilities.getQueryVariable('specialProbability'),
        specialCharacters: decodeURIComponent(Utilities.getQueryVariable('specialCharacters')),
        enableAudio: Utilities.getQueryVariable('enableAudio') == 1 ? true : false,
        enableFadeOut: Utilities.getQueryVariable('enableFadeOut') == 1 ? true : false,
        enableShadows: Utilities.getQueryVariable('enableShadows') == 1 ? true : false,
        enableRotation: Utilities.getQueryVariable('enableRotation') == 1 ? true : false,
        enableFadeOutRotation: Utilities.getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
        fontSizes: [
            Utilities.randomInteger(18, 22),
        ],
        fontFamilies: [
            'Arial',
            'Times',
            'Courier',
        ],
        specialAudio: [
            'audio/1.mp3',
        ],
        stripeCount: Utilities.getQueryVariable('stripeCount'),
        stripeRecycleMilliseconds: 5000,
        backgroundColor: 'black',
    };
    // if stripe mode and independant selected
    if (Utilities.getQueryVariable('runIndependant') == 1 && Utilities.getQueryVariable('type') == 'stripe') {
        randomSoupConfig.stripeCount = 1;
        for (let i = 0; i < Utilities.getQueryVariable('stripeCount'); i++) {
            randomSoupConfig.stripeRecycleMilliseconds = Utilities.randomInteger(10000, 60000);
            randomSoupInstances[i] = new RandomSoup(randomSoupConfig);
        }
    } else {
        randomSoupInstances[0] = new RandomSoup(randomSoupConfig);
    }
    // stop with anykey
    document.addEventListener('keydown', function(event) {
        event = event || window.event;
        if (event.key) {
            let instance;
            while (instance = randomSoupInstances.shift())
                instance.destroy();
            window.location.href = 'index.html';
        }
    });
    // full screen with doubleclick
    document.addEventListener('dblclick', Utilities.toggleFullScreen);
}
