function startRandomSoup() {
    new randomSoupScreen({
        sleepMilliseconds: document.getElementById('sleepMilliseconds').value,
        maxCycles: document.getElementById('maxCycles').value,
        characters: document.getElementById('characters').value,
        specialProbability: document.getElementById('specialProbability').value,
        specialCharacters: document.getElementById('specialCharacters').value,
        enableAudio: document.getElementById('enableAudio').checked,
        enableFullScreen: document.getElementById('enableFullScreen').checked,
        enableFadeOut: document.getElementById('enableFadeOut').checked,
        enableRotation: document.getElementById('enableRotation').checked,
        enableFadeOutRotation: document.getElementById('enableFadeOutRotation').checked,
    });
}


let utilities = new randomUtilities();
let stripes = [];
let i;
let stripeCount = 100;

for (i = 0; i < stripeCount; i++) {
    stripes[i] = new randomSoupStripe({
        stripeHeight: utilities.randomInteger(180, window.innerHeight),
        stripeLeft: utilities.randomInteger(0, window.innerWidth),
    });
}
