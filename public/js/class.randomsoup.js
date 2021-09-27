/**
 * RANDOM SOUP CLASS (SCREEN)
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class RandomSoup {

    // default settings
    defaults = {

        // soup type, currently supported "screen" or "stripe"
        type: 'stripe',

        // opacity of the container element
        opacity: 1,

        // id of the container element
        containerElementId: 'randomSoupContainer',

        // sleep milliseconds between two drawing cycles
        sleepMilliseconds: 20,

        // max drawing cycles, before cleaning up kicks in
        maxCycles: 30,

        // enable sound fx
        enableAudio: false,

        // enable fade out effect on old characters when disappearing from the screen
        enableFadeOut: true,

        // enable rotation on fade out
        enableFadeOutRotation: false,

        // enable static character rotation
        enableRotation: false,

        // enable shadows on characters
        enableShadows: false,

        // stripe count, when stripe type
        stripeCount: 10,

        // min height of a stripe
        stripeMinHeight: Math.ceil(window.innerHeight / 8),

        // max height of a stripe
        stripeMaxHeight: window.innerHeight,

        // milliseconds between abandone the oldest stripe and replace with a new one
        stripeRecycleMilliseconds: 5000,

        // font families to randomly pick from
        fontFamilies: [
            'Arial',
            'Times',
            'Courier',
        ],

        // font sizes to randomly pick from
        fontSizes: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48],

        // characters to randomly pick from
        characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-=()&\*ç+°§?^![]$£{}àéèüöä|¢¬#@¦',

        // array of words to use instead of single characters
        // if empty, single characters are used
        words: [],
        specialWords: [],

        // colors to randomly pick from
        colors: [
            '#00FF00',
            '#33FF33',
            '#FFFFFF',
            '#CCCCCC',
            '#999999',
            '#666666',
            '#333333',
            'green',
        ],

        // text shadows to randomly pick from
        textShadows: [
            '1px 1px 2px #FFFFFF',
            '1px 1px 2px #00FF00',
            '1px 1px 2px #33FF33',
            '1px 1px 2px #FFFFFF',
            '1px 1px 2px #CCCCCC',
            '1px 1px 2px #999999',
            '1px 1px 2px #666666',
            '1px 1px 2px #333333',
            '1px 1px 2px green',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
        ],

        // probability that the special occurs
        specialProbability: 100000,

        // characters to randomly pick from when special occurs
        specialCharacters: '*',
        specialColors: [
            'red',
        ],

        // text shadows to randomly pick from when special occurs
        specialTextShadows: [
            '1px 1px 2px red',
            'none',
        ],

        specialFontSizes: [72, 96],

        // audio to randomly pick from when special occurs
        specialAudio: [],

        // body background color
        backgroundColor: 'black',
    };

    // settings
    settings = {};

    // draw cycle counter
    counter = 0;

    // internal intervals
    intervalDrawCycle;
    intervalStripeRecycle;

    // stripe coordinates
    stripeCoordinates = [];

    /**
     * class constructor
     * @param {*} options overwrite default settings
     */
    constructor(options) 
    {
        // merge options and defaults to settings
        this.settings = Object.assign({}, this.defaults, options);

        // if the container element does not exists
        if (!document.getElementById(this.settings.containerElementId)) {

            // create container element as overlay and append to body
            let element = document.createElement('div');
            element.setAttribute('id', this.settings.containerElementId);
            element.style.position = 'fixed';
            element.style.top = 0;
            element.style.left = 0;
            element.style.width = '100%';
            element.style.height = '100%';
            element.style.backgroundColor = this.settings.backgroundColor;
            element.style.opacity = this.settings.opacity;
            element.style.zIndex = 10000;
            element.style.overflow = 'hidden';
            document.body.prepend(element);
        }

        // generate stripe coordinates for stripe mode
        if (this.settings.type === 'stripe') {

            for (let i = 0; i < this.settings.stripeCount; i++) {
                this.stripeCoordinates.push(this.createStripeCoordinates());
            }

            // in stripe mode, max cycles is per stripe
            this.settings.maxCycles = (this.settings.maxCycles * this.settings.stripeCount) / 2;

            // set lifetime cycle of stripe coordinates in milliseconds
            this.intervalStripeRecycle = setInterval(this.cycleStripeCoordinates.bind(this), this.settings.stripeRecycleMilliseconds);
        }

        // draw cycle interval
        this.intervalDrawCycle = setInterval(this.drawCycle.bind(this), this.settings.sleepMilliseconds);
    };

    /**
     * destroy
     */
    destroy()
    {
        // clear internal intervals
        clearInterval(this.intervalDrawCycle);
        clearInterval(this.intervalStripeRecycle);

        // remove container element, if not already removed
        let containerElement = document.getElementById(this.settings.containerElementId);
        if (containerElement !== null)
            document.getElementById(this.settings.containerElementId).remove();
    }

    /**
     * create a set of stripe coordinates
     */
    createStripeCoordinates() 
    {
        return {
            left: Utilities.randomInteger(0, window.innerWidth),
            maxTop: Utilities.randomInteger(this.settings.stripeMinHeight, this.settings.stripeMaxHeight),
        }
    }

    /**
     * recycle stripe offsets
     */
    cycleStripeCoordinates() 
    {
        // remove oldest stripe coordinate and push a new one
        this.stripeCoordinates.shift();
        this.stripeCoordinates.push(this.createStripeCoordinates());
    };

    /**
     * one draw cycle
     */
    drawCycle() 
    {
        // create dom element
        let element = document.createElement('span');

        // element styles and content
        let elementContent;
        let fontSize;
        let top;
        let left;
        let fontFamily;
        let textShadow;
        let color;
        let opacity;
        let rotate;

        // values for new element
        // set element content
        if (this.settings.words.length) {
            elementContent = this.settings.words[Utilities.randomInteger(0, this.settings.words.length - 1)];
        } else {
            elementContent = Utilities.randomString(1, this.settings.characters);
        }
        fontSize = this.settings.fontSizes[Utilities.randomInteger(0, this.settings.fontSizes.length - 1)];
        fontFamily = this.settings.fontFamilies[Utilities.randomInteger(0, this.settings.fontFamilies.length - 1)];
        textShadow = this.settings.textShadows[Utilities.randomInteger(0, this.settings.textShadows.length - 1)];
        color = this.settings.colors[Utilities.randomInteger(0, this.settings.colors.length - 1)];

        // overwrite in special cases ...
        if (Utilities.randomInteger(0, this.settings.specialProbability) === 0 && !(this.settings.specialProbability < 0)) {
            
            // set element content
            if (this.settings.specialWords.length) {
                elementContent = this.settings.specialWords[Utilities.randomInteger(0, this.settings.specialWords.length - 1)];
            } else {
                elementContent = Utilities.randomString(1, this.settings.specialCharacters);
            }

            fontSize = this.settings.specialFontSizes[Utilities.randomInteger(0, this.settings.specialFontSizes.length - 1)];;
            textShadow = this.settings.specialTextShadows[Utilities.randomInteger(0, this.settings.specialTextShadows.length - 1)];
            color = this.settings.specialColors[Utilities.randomInteger(0, this.settings.specialColors.length - 1)];
            if (this.settings.enableAudio === true && this.settings.specialAudio.length > 0) {
                var sound = new Audio(this.settings.specialAudio[Utilities.randomInteger(0, this.settings.specialAudio.length - 1)]);
                sound.play();
            }
        }

        // depending on the mode, calculate coordinates of the next character
        switch (this.settings.type) {
            case 'screen':
                top = Utilities.randomInteger(0, window.innerHeight - fontSize);
                left = Utilities.randomInteger(0, window.innerWidth - fontSize);
                break;

            case 'stripe':
                let stripeCoordinateIndex = Utilities.randomInteger(0, this.stripeCoordinates.length - 1);
                top = Utilities.randomInteger(0, this.stripeCoordinates[stripeCoordinateIndex].maxTop) - fontSize;
                left = this.stripeCoordinates[stripeCoordinateIndex].left - fontSize;
                break;
        }

        // set dom element style
        element.style.top = '' + top + 'px';
        element.style.left = '' + left + 'px';
        element.style.fontSize = '' + fontSize + 'px';
        element.style.fontFamily = '' + fontFamily;
        element.style.color = '' + color;
        element.style.position = 'absolute';

        if (this.settings.enableShadows === true)
            element.style.textShadow = textShadow;

        if (this.settings.enableRotation === true) {
            rotate = Utilities.randomInteger(-180, 180);
            element.style.transform = 'rotate(' + rotate + 'deg)';
        }

        // set element content
        element.textContent = elementContent;

        // append element to the container
        document.getElementById(this.settings.containerElementId).append(element);

        // increment counter
        this.counter++;

        // begin cleaning up, when max cycles are reached
        if (this.counter > this.settings.maxCycles) {

            // remove oldest element
            if (document.getElementsByTagName('span')[0] !== 'undefined')
                document.getElementsByTagName('span')[0].remove();

            // decrement counter
            this.counter--;
        }

        // fadeout effect
        if (this.settings.enableFadeOut === true) {
            let elementCount = document.getElementById(this.settings.containerElementId).childNodes.length;
            let self = this;
            document.getElementById(this.settings.containerElementId).childNodes.forEach(function(currentElement, currentIndex, listObj) {
                opacity = 1 / elementCount * currentIndex;
                opacity = opacity.toPrecision(3);
                currentElement.style.opacity = opacity;
                if (self.settings.enableFadeOutRotation === true) {
                    currentElement.style.transform = 'rotate(' + Math.ceil(180 + (opacity * 100)) + 'deg)';
                }
            });
        }
    }
}
