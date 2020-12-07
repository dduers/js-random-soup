/**
 * RANDOM SOUP CLASS (STRIPE)
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class randomSoupStripe {

    /**
     * default values
     */
    defaults = {
        containerElementId: 'randomSoupContainer',
        sleepMilliseconds: 10,
        maxCycles: 100,
        enableAudio: true,
        enableFadeOut: false,
        enableFadeOutRotation: false,
        enableRotation: false,
        stripeTop: 0,
        stripeLeft: 50,
        stripeHeight: window.innerHeight / 2,
        fontFamilies: [
            'Courier',
        ],
        fontSizes: [
            16,
        ],
        characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-=()&\*ç+°§?^![]$£{}àéèüöä|¢¬#@¦',
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
        specialProbability: 100000,
        specialCharacters: '*',
        specialColors: [
            'red',
        ],
        specialTextShadows: [
            '1px 1px 2px red',
            'none',
        ],
        specialAudio: [
            'audio/1.mp3',
        ],
    };

    /**
     * utilites class
     */
    utilities = null;

    /**
     * final settings
     */
    settings = {};

    /**
     * container of the stripe
     */
    stripeContainerElementId;

    /**
     * stripe element counter
     */
    counter = 0;

    interval = null;

    /**
     * class constructor
     * @param {*} options overwrite default settings
     */
    constructor(options) {

        // merge options and defaults to settings
        this.settings = Object.assign({}, this.defaults, options);

        // utilities class
        this.utilities = new randomUtilities();

        // draw stripe container
        this.drawStripeContainer();

        // draw cycle 
        this.interval = setInterval(this.drawCycle.bind(this), this.settings.sleepMilliseconds);

        //myVar = setInterval(() => {console.log('bop'), 1000);
    };

    /**
     * create stripe container
     */
    drawStripeContainer() {
        let elementId = 'stripe-' + this.utilities.randomString(8);
        let element = document.createElement('div');
        element.style.width = '30px';
        element.style.left = this.settings.stripeLeft + 'px';
        element.style.position = 'absolute';
        element.setAttribute('id', elementId);
        this.stripeContainerElementId = elementId;

        // append stripe container to container
        document.getElementById(this.settings.containerElementId).append(element);
    };

    /**
     * destroy stripe
     */
    destroy() {

        // the stripe container element
        let element = document.getElementById(this.stripeContainerElementId);

        // clear interval on stripe container element
        clearInterval(this.interval);

        // remove child elements
        /*
        let self = this;
        document.getElementById(this.stripeContainerElementId).childNodes.forEach(function(currentElement, currentIndex, listObj) {

            
            let opacity = 1.00;
            
            while (opacity > 0) {
                opacity -= 0.01;
                currentElement.style.opacity = opacity;
                self.utilities.sleep(100);
            }
        });
        */

        // remove stripe container element
        element.remove();
    };

    /**
     * one draw cycle
     */
    drawCycle() {

        // create dom element
        let element = document.createElement('span');

        // element styles and content
        let char;
        let fontSize;
        let top;
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

        top = this.utilities.randomInteger(this.settings.stripeTop, this.settings.stripeHeight);

        // set element content
        element.textContent = char;

        // set dom element style
        element.style.top = '' + top + 'px';
        element.style.fontSize = '' + fontSize + 'px';
        element.style.fontFamily = '' + fontFamily;
        element.style.color = '' + color;
        element.style.position = 'absolute';
        element.style.textShadow = textShadow;

        if (this.settings.enableRotation === true) {
            rotate = this.utilities.randomInteger(-180, 180);
            element.style.transform = 'rotate(' + rotate + 'deg)';
        }

        // append element to container
        document.getElementById(this.stripeContainerElementId).append(element);

        // increment counter
        this.counter++;

        // begin cleaning up, when max cycles are reached
        if (this.counter > this.settings.maxCycles) {

            // remove oldest element
            element = document.getElementById(this.stripeContainerElementId).childNodes[0];
            element.remove();

            // decrement counter
            this.counter--;
        }

        // fadeout effect
        if (this.settings.enableFadeOut === true) {
            let elementCount = document.getElementById(this.stripeContainerElementId).childNodes.length;
            let self = this;
            document.getElementById(this.stripeContainerElementId).childNodes.forEach(function(currentElement, currentIndex, listObj) {
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
