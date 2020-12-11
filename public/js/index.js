let randomSoup = null;
let timer = null;
let timeOut = 1000;

let randomSoupConfig = {
    type: 'screen',
    backgroundColor: 'black',
    sleepMilliseconds: 20,
    maxCycles: 100,
    characters: '*°.',
    specialProbability: 200,
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
    enableShadows: true,
    type: 'screen',
    backgroundColor: 'black',
    sleepMilliseconds: 20,
    maxCycles: 100,
    characters: '°',
    specialProbability: 200,
    words: [
        'SWIS',
    ],
    colors: [
        '#333333',
        '#222222',
        '#111111',
        '#000000',
    ],
    specialWords: [
        'Bartgeier',
        'Antarktis',
        'Monitoring',
        'Rothirsch',
    ],
    specialColors: [
        '#9e8e5e',
    ],
    textShadows: [
        'none',
    ],
    specialTextShadows: [
        '0px 0px 10px #9E8E5E',
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
