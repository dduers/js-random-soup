/**
 * RANDOM SOUP CLASS (SCREEN)
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class randomSoupOne {

    /**
     * default values
     */
    defaults = {

        // soup type, currently supported "screen" or "stripe"
        type: 'stripe',

        // id of the container element
        containerElementId: 'randomSoupContainer',

        // sleep milliseconds between two drawing cycles
        sleepMilliseconds: 20,

        // max drawing cycles, before cleaning up kicks in
        maxCycles: 30,

        // enable sound fx
        enableAudio: true,

        // enable fade out effect on old characters when disappearing from the screen
        enableFadeOut: false,

        // enable rotation on fade out
        enableFadeOutRotation: false,

        // enable static character rotation
        enableRotation: false,

        // stripe count, when stripe type
        stripeCount: Math.ceil(window.innerWidth / 100),

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
        fontSizes: [
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
        ],

        // characters to randomly pick from
        characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-=()&\*ç+°§?^![]$£{}àéèüöä|¢¬#@¦',

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

        // audio to randomly pick from when special occurs
        specialAudio: [
            'audio/1.mp3',
        ],
    };

    /**
     * final settings, merged defaults and options
     */
    settings = {};

    /**
     * utilites class
     */
    utilities = null;

    /**
     * draw cycle counter
     */
    counter = 0;

    /**
     * draw cycle interval
     */
    intervalDrawCycle = null;

    /**
     * draw cycle interval
     */
    intervalStripeRecycle = null;

    /**
     * pixel count from the left for stripes
     * this array will be generated in the class contructor, depending on stripe count
     */
    stripeCoordinates = [];

    /**
     * class constructor
     * @param {*} options overwrite default settings
     */
    constructor(options) 
    {
        // merge options and defaults to settings
        this.settings = Object.assign({}, this.defaults, options);

        // utilites class
        this.utilities = new randomUtilities();

        // generate stripe left pixel offset for stripe mode
        if (this.settings.type === 'stripe') {
            for (let i = 0; i < this.settings.stripeCount; i++) {
                this.stripeCoordinates.push({
                    left: this.utilities.randomInteger(0, window.innerWidth),
                    maxTop: this.utilities.randomInteger(this.settings.stripeMinHeight, this.settings.stripeMaxHeight),
                });
            }

            this.settings.maxCycles = (this.settings.maxCycles * this.settings.stripeCount) / 2;

            this.intervalStripeRecycle = setInterval(this.stripeRecycle.bind(this), this.settings.stripeRecycleMilliseconds);
        }

        // draw cycle interval
        this.intervalDrawCycle = setInterval(this.drawCycle.bind(this), this.settings.sleepMilliseconds);
    };

    /**
     * destroy
     */
    destroy()
    {
        clearInterval(this.intervalDrawCycle);
        clearInterval(this.intervalStripeRecycle);
        document.getElementById(this.settings.containerElementId).innerHTML = '';
    }

    /**
     * recycle stripe offsets
     */
    stripeRecycle() 
    {
        // remove oldest stripe offset
        this.stripeCoordinates.shift();

        // create new stripe offset
        this.stripeCoordinates.push({
            left: this.utilities.randomInteger(0, window.innerWidth),
            maxTop: this.utilities.randomInteger(this.settings.stripeMinHeight, this.settings.stripeMaxHeight),
        });
    };

    /**
     * one draw cycle
     */
    drawCycle() 
    {
        // create dom element
        let element = document.createElement('span');

        // element styles and content
        let char;
        let fontSize;
        let top;
        let left;
        let fontFamily;
        let textShadow;
        let color;
        let opacity;
        let rotate;

        // values for new element
        char = this.utilities.randomString(1, this.settings.characters);
        fontSize = this.settings.fontSizes[this.utilities.randomInteger(0, this.settings.fontSizes.length - 1)];
        fontFamily = this.settings.fontFamilies[this.utilities.randomInteger(0, this.settings.fontFamilies.length - 1)];
        textShadow = this.settings.textShadows[this.utilities.randomInteger(0, this.settings.textShadows.length - 1)];
        color = this.settings.colors[this.utilities.randomInteger(0, this.settings.colors.length - 1)];

        // overwrite in special cases ...
        if (this.utilities.randomInteger(0, this.settings.specialProbability) === 0) {
            char = this.utilities.randomString(1, this.settings.specialCharacters);
            fontSize = 280;
            textShadow = this.settings.specialTextShadows[this.utilities.randomInteger(0, this.settings.specialTextShadows.length - 1)];
            color = this.settings.specialColors[this.utilities.randomInteger(0, this.settings.specialColors.length - 1)];
            if (this.settings.enableAudio === true && this.settings.specialAudio.length > 0) {
                var sound = new Audio(this.settings.specialAudio[this.utilities.randomInteger(0, this.settings.specialAudio.length - 1)]);
                sound.play();
            }
        }

        // depending on the mode, calculate coordinates of the next character
        switch (this.settings.type) {
            case 'screen':
                top = this.utilities.randomInteger(0, window.innerHeight - fontSize);
                left = this.utilities.randomInteger(0, window.innerWidth - fontSize);
                break;

            case 'stripe':
                let stripeCoordinateIndex = this.utilities.randomInteger(0, this.stripeCoordinates.length - 1);
                top = this.utilities.randomInteger(0, this.stripeCoordinates[stripeCoordinateIndex].maxTop) - fontSize;
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
        element.style.textShadow = textShadow;

        if (this.settings.enableRotation === true) {
            rotate = this.utilities.randomInteger(-180, 180);
            element.style.transform = 'rotate(' + rotate + 'deg)';
        }

        // set element content
        element.textContent = char;


        // append element to container
        document.getElementById(this.settings.containerElementId).append(element);

        // increment counter
        this.counter++;

        // begin cleaning up, when max cycles are reached
        if (this.counter > this.settings.maxCycles) {

            // remove oldest element
            element = document.getElementsByTagName('span')[0];
            //element = document.getElementById(this.stripeContainerElementId).childNodes[0];
            element.remove();

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
