let utilities = new randomUtilities();

/**
 * start random soup screen
 */
function startRandomSoupScreen() 
{
    let screen;
    screen = new randomSoupScreen({
        sleepMilliseconds: utilities.getQueryVariable('sleepMilliseconds'),
        maxCycles: utilities.getQueryVariable('maxCycles'),
        characters: decodeURIComponent(utilities.getQueryVariable('characters')),
        specialProbability: utilities.getQueryVariable('specialProbability'),
        specialCharacters: decodeURIComponent(utilities.getQueryVariable('specialCharacters')),
        enableAudio: utilities.getQueryVariable('enableAudio') == 1 ? true : false,
        enableFadeOut: utilities.getQueryVariable('enableFadeOut') == 1 ? true : false,
        enableRotation: utilities.getQueryVariable('enableRotation') == 1 ? true : false,
        enableFadeOutRotation: utilities.getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
    });
}

/**
 * start random soup stripes
 */
function startRandomSoupStripe() 
{
    let i;
    let stripes = [];
    let stripeCount = utilities.getQueryVariable('stripeCount');
    for (i = 0; i < stripeCount; i++) {
        stripes[i] = createStripe();  
    }
    setInterval(function() {
        stripes.shift().destroy();
        stripes.push(createStripe());
    }, 5000)
}

/**
 * create stripe instance
 */
function createStripe() {
    return new randomSoupStripe({
        stripeHeight: utilities.randomInteger(180, window.innerHeight),
        stripeLeft: utilities.randomInteger(0, window.innerWidth),
        sleepMilliseconds: utilities.getQueryVariable('sleepMilliseconds'),
        fontSizes: [
            utilities.randomInteger(16, 24),
        ],
        maxCycles: utilities.getQueryVariable('maxCycles'),
        characters: decodeURIComponent(utilities.getQueryVariable('characters')),
        specialProbability: utilities.getQueryVariable('specialProbability'),
        specialCharacters: decodeURIComponent(utilities.getQueryVariable('specialCharacters')),
        enableAudio: utilities.getQueryVariable('enableAudio') == 1 ? true : false,
        enableFadeOut: utilities.getQueryVariable('enableFadeOut') == 1 ? true : false,
        enableRotation: utilities.getQueryVariable('enableRotation') == 1 ? true : false,
        enableFadeOutRotation: utilities.getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
    });
}

/**
 * start soup
 */
switch (utilities.getQueryVariable('type')) {
    case 'screen':
        startRandomSoupScreen();
        break;

    case 'stripe':
        startRandomSoupStripe();
        break;
}
