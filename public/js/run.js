// helper utilities
let utilities = new randomUtilities();

// get config from script parameters
let config = {
    type: utilities.getQueryVariable('type'),
    sleepMilliseconds: utilities.getQueryVariable('sleepMilliseconds'),
    maxCycles: utilities.getQueryVariable('maxCycles'),
    characters: decodeURIComponent(utilities.getQueryVariable('characters')),
    specialProbability: utilities.getQueryVariable('specialProbability'),
    specialCharacters: decodeURIComponent(utilities.getQueryVariable('specialCharacters')),
    enableAudio: utilities.getQueryVariable('enableAudio') == 1 ? true : false,
    enableFadeOut: utilities.getQueryVariable('enableFadeOut') == 1 ? true : false,
    enableRotation: utilities.getQueryVariable('enableRotation') == 1 ? true : false,
    enableFadeOutRotation: utilities.getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
    fontSizes: [
        utilities.randomInteger(16, 24),
    ],
    fontFamilies: [
        'Courier'
    ],
    stripeCount: utilities.getQueryVariable('stripeCount'),
};

// start random soup
let randomSoup = new randomSoupOne(config);
