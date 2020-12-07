function startRandomSoupScreen() 
{
    let utilities = new randomUtilities();
    let screen;
    /*
    let enableFullScreen = getQueryVariable('enableFullScreen');

    if (enableFullScreen == 1) {
        utilities.openFullScreen();
    }*/

    screen = new randomSoupScreen({
        sleepMilliseconds: getQueryVariable('sleepMilliseconds'),
        maxCycles: getQueryVariable('maxCycles'),
        characters: getQueryVariable('characters'),
        specialProbability: getQueryVariable('specialProbability'),
        specialCharacters: getQueryVariable('specialCharacters'),
        enableAudio: getQueryVariable('enableAudio') == 1 ? true : false,
        enableFadeOut: getQueryVariable('enableFadeOut') == 1 ? true : false,
        enableRotation: getQueryVariable('enableRotation') == 1 ? true : false,
        enableFadeOutRotation: getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
    });
}

function startRandomSoupStripe() 
{
    let utilities = new randomUtilities();
    let i;
    let stripes = [];
    let stripeCount = getQueryVariable('stripeCount');

    /*
    let enableFullScreen = getQueryVariable('enableFullScreen');

    if (enableFullScreen == 1) {
        utilities.openFullScreen();
    }*/

    for (i = 0; i < stripeCount; i++) {
        stripes[i] = new randomSoupStripe({
            stripeHeight: utilities.randomInteger(180, window.innerHeight),
            stripeLeft: utilities.randomInteger(0, window.innerWidth),
            sleepMilliseconds: getQueryVariable('sleepMilliseconds'),
            maxCycles: getQueryVariable('maxCycles'),
            characters: getQueryVariable('characters'),
            specialProbability: getQueryVariable('specialProbability'),
            specialCharacters: getQueryVariable('specialCharacters'),
            enableAudio: getQueryVariable('enableAudio') == 1 ? true : false,
            enableFadeOut: getQueryVariable('enableFadeOut') == 1 ? true : false,
            enableRotation: getQueryVariable('enableRotation') == 1 ? true : false,
            enableFadeOutRotation: getQueryVariable('enableFadeOutRotation') == 1 ? true : false,
        });   
    }
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i=0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable){return pair[1];}
    }
    return false;
}


switch (getQueryVariable('type')) {

    case 'screen':
        startRandomSoupScreen();
        break;

    case 'stripe':
        startRandomSoupStripe();
        break;
}
