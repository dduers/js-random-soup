let randomSoup = null;
let timer = null;
let timeOut = 1000;

let randomSoupConfig = {
    type: 'screen',
    backgroundColor: 'black',
    sleepMilliseconds: 50,
    maxCycles: 75,
    characters: '*°.',
    specialProbability: 250,
    specialWords: [
        'believe',
        'in',
        'yourself',
    ],
    specialColors: [
        'darkred',
    ],   
}

randomSoupConfig = {
    type: 'screen',
    opacity: 1,
    backgroundColor: '#fefefe',
    sleepMilliseconds: 50,
    maxCycles: 80,
    characters: '°',
    specialProbability: 200,
    words: [
        'SWIS',
        'Swiss',
        'Wildlife',
        'Information',
        'Service',
    ],
    colors: [
        '#d5d6c2',
        '#f7f8e4',
    ],
    fontFamilies: [
        'Arial',
    ],
    fontSizes: [
        18,
        20,
        22,
    ],
    specialFontSizes: [
        60,
        72,
        84,
    ],
    specialWords: [
        'Bartgeier',
        'Rothirsch',
        'Monitoring',
        'Schneehase',
        'Antarktis',
        'Australien',
    ],
    specialColors: [
        '#9e8e5e',
    ],
    enableShadows: true,
    textShadows: [
        'none',
    ],
    specialTextShadows: [
        'none',
    ],   
}

// screen saver like demo
document.body.addEventListener('mouseleave', function() {
    timer = setTimeout(function() {
        randomSoup = new RandomSoup(randomSoupConfig);
    }, timeOut);
});

document.body.addEventListener('mouseenter', function() {
    clearTimeout(timer);
    if (randomSoup) {
        randomSoup.destroy();
        randomSoup = null;
    }
});
