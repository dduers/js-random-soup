let randomSoup = null;
let timer = null;
let timeOut = 5000;

// screen saver like demo
document.body.addEventListener('mouseleave', function() {
    timer = setTimeout(function() {
        randomSoup = new RandomSoup();
    }, timeOut);
});

document.body.addEventListener('mouseenter', function() {
    clearTimeout(timer);
    if (randomSoup) {
        randomSoup.destroy();
        randomSoup = null;
    }
});
