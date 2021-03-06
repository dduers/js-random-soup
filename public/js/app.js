let utilities = new Utilities();

/**
 * DEMO "SCREEN SAVER"
 */
if (utilities.getQueryVariable('type') === false) {
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
        type: utilities.getQueryVariable('type'),
        sleepMilliseconds: utilities.getQueryVariable('sleepMilliseconds'),
        maxCycles: utilities.getQueryVariable('maxCycles'),
        characters: decodeURIComponent(utilities.getQueryVariable('characters')),
        words: utilities.getQueryVariable('words') !== '' && utilities.getQueryVariable('words') !== false ? decodeURIComponent(utilities.getQueryVariable('words')).split(',') : [],
        specialProbability: utilities.getQueryVariable('specialProbability'),
        specialCharacters: decodeURIComponent(utilities.getQueryVariable('specialCharacters')),
        enableAudio: utilities.getQueryVariable('enableAudio') == 1 ? true : false,
        enableFadeOut: utilities.getQueryVariable('enableFadeOut') == 1 ? true : false,
        enableShadows: utilities.getQueryVariable('enableShadows') == 1 ? true : false,
        enableRotation: utilities.getQueryVariable('enableRotation') == 1 ? true : false,
        enableFadeOutRotation: utilities.getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
        fontSizes: [
            utilities.randomInteger(18, 22),
        ],
        fontFamilies: [
            'Arial',
            'Times',
            'Courier',
        ],
        specialAudio: [
            'audio/1.mp3',
        ],
        stripeCount: utilities.getQueryVariable('stripeCount'),
        stripeRecycleMilliseconds: 5000,
        backgroundColor: 'black',
    };
    // if stripe mode and independant selected
    if (utilities.getQueryVariable('runIndependant') == 1 && utilities.getQueryVariable('type') == 'stripe') {
        randomSoupConfig.stripeCount = 1;
        for (let i = 0; i < utilities.getQueryVariable('stripeCount'); i++) {
            randomSoupConfig.stripeRecycleMilliseconds = utilities.randomInteger(10000, 60000);
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
    document.addEventListener('dblclick', utilities.toggleFullScreen);
}
