// helper utilities
let utilities = new Utilities();

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
    enableShadows: utilities.getQueryVariable('enableShadows') == 1 ? true : false,
    enableRotation: utilities.getQueryVariable('enableRotation') == 1 ? true : false,
    enableFadeOutRotation: utilities.getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
    enableOverlay: true,
    fontSizes: [
        utilities.randomInteger(18, 22),
    ],
    /*fontFamilies: [
        'Courier'
    ],*/
    stripeCount: utilities.getQueryVariable('stripeCount'),
    stripeRecycleMilliseconds: 5000,
    backgroundColor: 'black',
};

// if stripe mode and independant selected
if (utilities.getQueryVariable('runIndependant') == 1 && utilities.getQueryVariable('type') == 'stripe') {

    // single stripe per instance
    config.stripeCount = 1;

    // random soup instances
    let randomSoups = [];
    
    // start random soup
    for (let i = 0; i < utilities.getQueryVariable('stripeCount'); i++) {

        // random recycle milliseconds for every instance
        config.stripeRecycleMilliseconds = utilities.randomInteger(10000, 60000);

        // create instance
        randomSoups[i] = new RandomSoup(config);
    }

} else {

    // single random soup instance
    let randomSoup = new RandomSoup(config);
}
